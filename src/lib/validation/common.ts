import { z } from "zod";

const PHONE_RE = /^[0-9+\-\s()]{7,20}$/;

/** Required phone (most forms). Accepts +, spaces, dashes, parentheses. */
export const phoneSchema = z
  .string({ required_error: "رقم الجوال مطلوب" })
  .trim()
  .min(7, "رقم الجوال غير صحيح")
  .max(20, "رقم الجوال غير صحيح")
  .regex(PHONE_RE, "رقم الجوال غير صحيح");

/** Optional phone — empty string becomes undefined before validation. */
export const optionalPhone = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().trim().regex(PHONE_RE, "رقم الجوال غير صحيح").optional()
);

/** Required full name. */
export const requiredName = z
  .string({ required_error: "الاسم مطلوب" })
  .trim()
  .min(2, "الاسم مطلوب")
  .max(100, "الاسم طويل جدًا");

/** Optional email — empty string becomes undefined, otherwise must be valid. */
export const optionalEmail = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.string().trim().email("البريد الإلكتروني غير صحيح").max(160).optional()
);

/** Required email. */
export const requiredEmail = z
  .string({ required_error: "البريد الإلكتروني مطلوب" })
  .trim()
  .min(1, "البريد الإلكتروني مطلوب")
  .email("البريد الإلكتروني غير صحيح")
  .max(160);

/** Optional free text with a max length; empty string becomes undefined. */
export const optionalText = (max: number) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    z.string().trim().max(max, `النص يتجاوز الحد المسموح (${max} حرف)`).optional()
  );

/** Required single-choice value (e.g. a quiz answer). */
export const requiredChoice = (message: string) => z.string().trim().min(1, message).max(120);
