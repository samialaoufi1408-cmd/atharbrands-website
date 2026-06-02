"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ESTIMATE_SERVICES, ESTIMATE_MAX_MULTIPLIER } from "@/data/pricing";
import { cn, formatNumber } from "@/lib/utils";
import { estimateSchema } from "@/lib/validation/estimate";
import { postJson } from "@/lib/forms";
import { estimateWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { FormSuccess } from "../ui/FormSuccess";

type FieldErrors = Record<string, string[] | undefined>;
const EMPTY_LEAD = { full_name: "", phone: "", email: "" };

export function EstimateCalculator() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [lead, setLead] = useState(EMPTY_LEAD);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [phase, setPhase] = useState<"calc" | "done">("calc");
  const [doneUrl, setDoneUrl] = useState<string | undefined>(undefined);

  const selectedServices = ESTIMATE_SERVICES.filter((s) => selectedIds.includes(s.id));
  const labels = selectedServices.map((s) => s.label);
  const min = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const max = Math.round(min * ESTIMATE_MAX_MULTIPLIER);
  const hasSelection = selectedServices.length > 0;

  function toggle(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const updateLead = (key: keyof typeof EMPTY_LEAD) => (e: ChangeEvent<HTMLInputElement>) =>
    setLead((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = estimateSchema.safeParse({
      selected_services: labels,
      min_estimate: min,
      max_estimate: max,
      ...lead,
    });
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await postJson("/api/estimate", parsed.data);
    setSubmitting(false);

    const url = whatsappUrl(estimateWhatsApp(parsed.data));
    setDoneUrl(url);
    if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
    setPhase("done");
  }

  return (
    <section id="estimate" className="bg-ivory-deep py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Estimate"
            title="حاسبة تقدير مبدئية"
            description="اختر الخدمات التي تحتاجها لتحصل على نطاق سعري تقريبي فوري."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-5 lg:items-start">
          <Reveal className="lg:col-span-3">
            <div className="grid gap-3 sm:grid-cols-2">
              {ESTIMATE_SERVICES.map((service) => {
                const on = selectedIds.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggle(service.id)}
                    aria-pressed={on}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-xl border px-4 py-4 text-right transition-all",
                      on
                        ? "border-gold bg-white shadow-sm"
                        : "border-midnight/12 hover:border-gold/50 bg-white/60 hover:bg-white"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-md border",
                          on ? "border-gold bg-gold text-midnight" : "border-midnight/25"
                        )}
                      >
                        {on && <Icon name="check" className="size-3.5" />}
                      </span>
                      <span className="text-midnight">{service.label}</span>
                    </span>
                    <span className="text-midnight/50 text-sm">{formatNumber(service.price)}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-2">
            <div className="border-midnight/10 rounded-2xl border bg-white p-6 sm:p-7 lg:sticky lg:top-24">
              {phase === "done" ? (
                <FormSuccess
                  title="تم حفظ تقديرك"
                  message="سنراجع طلبك ونعود إليك بعرض سعر مفصّل."
                  waUrl={doneUrl}
                />
              ) : (
                <>
                  <span className="text-midnight/55 text-sm">السعر المتوقع</span>
                  <div className="bg-midnight text-ivory mt-3 rounded-xl p-5 text-center">
                    {hasSelection ? (
                      <p className="font-kufi text-xl sm:text-2xl">
                        من <span className="text-gold">{formatNumber(min)}</span> إلى{" "}
                        <span className="text-gold">{formatNumber(max)}</span> ريال
                      </p>
                    ) : (
                      <p className="text-ivory/55">اختر خدمة للبدء</p>
                    )}
                  </div>
                  <p className="text-midnight/55 mt-3 text-xs leading-relaxed">
                    هذا التقدير مبدئي، ويتم تحديد السعر النهائي بعد جلسة الاكتشاف.
                  </p>

                  {!showForm ? (
                    <Button
                      onClick={() => setShowForm(true)}
                      disabled={!hasSelection}
                      className="mt-5 w-full"
                    >
                      احفظ التقدير واطلب عرض سعر
                    </Button>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">
                      <Input
                        id="est-name"
                        label="الاسم"
                        required
                        value={lead.full_name}
                        onChange={updateLead("full_name")}
                        error={errors.full_name?.[0]}
                        placeholder="اسمك الكامل"
                      />
                      <Input
                        id="est-phone"
                        label="رقم الجوال"
                        required
                        inputMode="tel"
                        value={lead.phone}
                        onChange={updateLead("phone")}
                        error={errors.phone?.[0]}
                        placeholder="05xxxxxxxx"
                      />
                      <Input
                        id="est-email"
                        label="البريد الإلكتروني"
                        type="email"
                        value={lead.email}
                        onChange={updateLead("email")}
                        error={errors.email?.[0]}
                        placeholder="اختياري"
                      />
                      <Button type="submit" disabled={submitting} className="w-full">
                        {submitting ? "جارٍ الإرسال…" : "أرسل الطلب"}
                      </Button>
                    </form>
                  )}
                </>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
