import { NextResponse, type NextRequest } from "next/server";
import type { ZodType } from "zod";
import { getSupabaseAdmin, isSupabaseConfigured } from "./supabase/server";

/** Reject oversized payloads early (characters). */
const MAX_BODY = 12_000;

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export function methodNotAllowed() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

/**
 * Builds a POST handler that validates JSON against a zod schema and inserts a
 * row via the server-side Supabase client. Secrets are never logged or returned.
 * If Supabase isn't configured yet, the request is accepted (202) so the
 * client's WhatsApp fallback still completes — no lead is lost.
 */
export function leadHandler<T>(opts: {
  schema: ZodType<T>;
  table: string;
  buildRow: (data: T, ctx: { userAgent: string | null }) => Record<string, unknown>;
}) {
  return async function handler(request: NextRequest) {
    let raw: string;
    try {
      raw = await request.text();
    } catch {
      return fail("طلب غير صالح", 400);
    }

    if (!raw || raw.trim() === "") return fail("الطلب فارغ", 400);
    if (raw.length > MAX_BODY) return fail("حجم الطلب كبير جدًا", 413);

    let json: unknown;
    try {
      json = JSON.parse(raw);
    } catch {
      return fail("صيغة البيانات غير صحيحة", 400);
    }

    const parsed = opts.schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "تحقق من صحة البيانات المدخلة",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json({ ok: true, stored: false }, { status: 202 });
    }

    try {
      const supabase = getSupabaseAdmin();
      const userAgent = request.headers.get("user-agent")?.slice(0, 400) ?? null;
      const { error } = await supabase
        .from(opts.table)
        .insert(opts.buildRow(parsed.data, { userAgent }));

      if (error) {
        console.error(`[${opts.table}] insert failed:`, error.message);
        return fail("تعذّر حفظ الطلب، حاول لاحقًا", 500);
      }
      return NextResponse.json({ ok: true, stored: true }, { status: 201 });
    } catch (err) {
      console.error(`[${opts.table}] route error:`, err instanceof Error ? err.message : "unknown");
      return fail("تعذّر حفظ الطلب، حاول لاحقًا", 500);
    }
  };
}
