import { z } from "zod";
import { optionalEmail, optionalText, phoneSchema, requiredName } from "./common";

export const packageRequestSchema = z.object({
  package_name: z.string().trim().min(1, "اسم الباقة مطلوب").max(120),
  package_starting_price: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z.coerce.number().nonnegative().optional()
  ),
  full_name: requiredName,
  company_name: optionalText(150),
  phone: phoneSchema,
  email: optionalEmail,
  message: optionalText(2000),
});

export type PackageRequestInput = z.infer<typeof packageRequestSchema>;
