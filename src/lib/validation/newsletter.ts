import { z } from "zod";
import { optionalPhone, optionalText, requiredEmail } from "./common";

export const newsletterSchema = z.object({
  full_name: optionalText(100),
  email: requiredEmail,
  phone: optionalPhone,
  lead_magnet: z.string().trim().max(80).optional().default("brand_guide"),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
