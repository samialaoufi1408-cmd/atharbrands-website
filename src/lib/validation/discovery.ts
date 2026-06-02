import { z } from "zod";
import { optionalEmail, optionalText, phoneSchema, requiredChoice, requiredName } from "./common";

export const discoverySchema = z.object({
  project_type: requiredChoice("اختر نوع المشروع"),
  needed_service: requiredChoice("اختر الخدمة المطلوبة"),
  project_stage: requiredChoice("اختر مرحلة المشروع"),
  budget_range: requiredChoice("اختر الميزانية التقريبية"),
  launch_timeline: optionalText(80),
  recommended_package: requiredChoice("لم يتم احتساب الباقة المقترحة"),
  full_name: requiredName,
  phone: phoneSchema,
  email: optionalEmail,
});

export type DiscoveryInput = z.infer<typeof discoverySchema>;
