import { z } from "zod";
import { optionalEmail, phoneSchema, requiredName } from "./common";

export const estimateSchema = z.object({
  selected_services: z
    .array(z.string().trim().min(1).max(120))
    .min(1, "اختر خدمة واحدة على الأقل")
    .max(20),
  min_estimate: z.coerce.number().nonnegative(),
  max_estimate: z.coerce.number().nonnegative(),
  full_name: requiredName,
  phone: phoneSchema,
  email: optionalEmail,
});

export type EstimateInput = z.infer<typeof estimateSchema>;
