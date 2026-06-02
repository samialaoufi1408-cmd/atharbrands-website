import { z } from "zod";
import { optionalEmail, optionalText, phoneSchema, requiredName } from "./common";

export const contactSchema = z.object({
  full_name: requiredName,
  company_name: optionalText(150),
  phone: phoneSchema,
  email: optionalEmail,
  service_type: optionalText(80),
  budget_range: optionalText(80),
  message: optionalText(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
