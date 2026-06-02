import { newsletterSchema } from "@/lib/validation/newsletter";
import { leadHandler, methodNotAllowed } from "@/lib/api";

export const POST = leadHandler({
  schema: newsletterSchema,
  table: "newsletter_leads",
  buildRow: (data) => ({ ...data }),
});

export const GET = methodNotAllowed;
