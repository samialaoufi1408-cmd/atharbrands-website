import { discoverySchema } from "@/lib/validation/discovery";
import { leadHandler, methodNotAllowed } from "@/lib/api";

export const POST = leadHandler({
  schema: discoverySchema,
  table: "discovery_submissions",
  buildRow: (data) => ({ ...data }),
});

export const GET = methodNotAllowed;
