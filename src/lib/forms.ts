export interface SubmitResult {
  ok: boolean;
  status: number;
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

/**
 * POST a JSON payload to one of our API routes. Never throws — always resolves
 * to a SubmitResult so forms can render a clear message either way.
 */
export async function postJson(endpoint: string, payload: unknown): Promise<SubmitResult> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      /* response had no JSON body */
    }
    const data = (body ?? {}) as {
      error?: string;
      fieldErrors?: Record<string, string[] | undefined>;
    };

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: data.error ?? "حدث خطأ غير متوقع، حاول مرة أخرى.",
        fieldErrors: data.fieldErrors,
      };
    }
    return { ok: true, status: res.status };
  } catch {
    return {
      ok: false,
      status: 0,
      error: "تعذّر الاتصال بالخادم. تحقق من اتصالك وحاول مجددًا.",
    };
  }
}
