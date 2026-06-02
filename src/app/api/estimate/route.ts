import { estimateSchema } from "@/lib/validation/estimate";
import { leadHandler, methodNotAllowed } from "@/lib/api";

export const POST = leadHandler({
  schema: estimateSchema,
  table: "estimate_requests",
  buildRow: (data) => ({ ...data }),
});

export const GET = methodNotAllowed;
