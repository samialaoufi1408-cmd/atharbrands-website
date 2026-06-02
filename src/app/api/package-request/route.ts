import { packageRequestSchema } from "@/lib/validation/packageRequest";
import { leadHandler, methodNotAllowed } from "@/lib/api";

export const POST = leadHandler({
  schema: packageRequestSchema,
  table: "package_requests",
  buildRow: (data) => ({ ...data }),
});

export const GET = methodNotAllowed;
