import { contactSchema } from "@/lib/validation/contact";
import { leadHandler, methodNotAllowed } from "@/lib/api";

export const POST = leadHandler({
  schema: contactSchema,
  table: "contact_messages",
  buildRow: (data, { userAgent }) => ({
    ...data,
    source: "website_contact",
    user_agent: userAgent,
  }),
});

export const GET = methodNotAllowed;
