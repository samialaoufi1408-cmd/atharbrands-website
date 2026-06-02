import { SITE } from "./constants";
import { formatNumber } from "./utils";

/** Build a wa.me deep link for a prepared message. */
export function whatsappUrl(message: string): string {
  const number = SITE.whatsappNumber || "966500000000";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

type Field = [label: string, value: string | number | null | undefined];

function clean(value: string | number | null | undefined): string | null {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text === "" ? null : text;
}

function kv(fields: Field[]): string {
  return fields
    .map(([label, value]) => [label, clean(value)] as const)
    .filter(([, value]) => value !== null)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

function compose(intro: string, blocks: Array<string | undefined>): string {
  const tail = `المصدر:\n${SITE.domain}`;
  return [intro, ...blocks, tail].filter((part) => part && part.trim() !== "").join("\n\n");
}

export interface ContactWA {
  full_name?: string;
  company_name?: string;
  phone?: string;
  email?: string;
  service_type?: string;
  budget_range?: string;
  message?: string;
}

export function contactWhatsApp(d: ContactWA): string {
  return compose("السلام عليكم، لدي طلب جديد عبر موقع أثر.", [
    kv([
      ["الاسم", d.full_name],
      ["اسم الشركة", d.company_name],
      ["رقم الجوال", d.phone],
      ["البريد", d.email],
      ["نوع الخدمة", d.service_type],
      ["الميزانية", d.budget_range],
      ["الرسالة", d.message],
    ]),
  ]);
}

export interface DiscoveryWA {
  project_type?: string;
  needed_service?: string;
  project_stage?: string;
  budget_range?: string;
  launch_timeline?: string;
  recommended_package?: string;
  full_name?: string;
  phone?: string;
  email?: string;
}

export function discoveryWhatsApp(d: DiscoveryWA): string {
  return compose("السلام عليكم، أرغب في الحصول على تصور مبدئي لعلامتي عبر موقع أثر.", [
    kv([
      ["نوع المشروع", d.project_type],
      ["الخدمة المطلوبة", d.needed_service],
      ["مرحلة المشروع", d.project_stage],
      ["الميزانية", d.budget_range],
      ["موعد الإطلاق", d.launch_timeline],
      ["الباقة المقترحة", d.recommended_package],
    ]),
    kv([
      ["الاسم", d.full_name],
      ["رقم الجوال", d.phone],
      ["البريد", d.email],
    ]),
  ]);
}

export interface EstimateWA {
  selected_services: string[];
  min_estimate: number;
  max_estimate: number;
  full_name?: string;
  phone?: string;
  email?: string;
}

export function estimateWhatsApp(d: EstimateWA): string {
  const services = d.selected_services.map((s) => `• ${s}`).join("\n");
  return compose("السلام عليكم، حفظت تقديرًا مبدئيًا عبر موقع أثر وأرغب في عرض سعر.", [
    `الخدمات المختارة:\n${services}`,
    `السعر التقديري: من ${formatNumber(d.min_estimate)} إلى ${formatNumber(d.max_estimate)} ريال`,
    kv([
      ["الاسم", d.full_name],
      ["رقم الجوال", d.phone],
      ["البريد", d.email],
    ]),
  ]);
}

export interface PackageWA {
  package_name: string;
  package_starting_price?: number;
  full_name?: string;
  company_name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

export function packageWhatsApp(d: PackageWA): string {
  return compose(`السلام عليكم، أرغب في طلب «${d.package_name}» عبر موقع أثر.`, [
    kv([
      ["الباقة", d.package_name],
      [
        "السعر يبدأ من",
        d.package_starting_price ? `${formatNumber(d.package_starting_price)} ريال` : undefined,
      ],
      ["الاسم", d.full_name],
      ["اسم الشركة", d.company_name],
      ["رقم الجوال", d.phone],
      ["البريد", d.email],
      ["ملاحظات", d.message],
    ]),
  ]);
}
