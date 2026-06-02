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
import { Pattern } from "../ui/Pattern";
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

  const updateLead =
    (key: keyof typeof EMPTY_LEAD) => (e: ChangeEvent<HTMLInputElement>) =>
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
    <section id="estimate" className="bg-ivory-deep py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Estimate"
            title="حاسبة تقدير مبدئية"
            description="اختر الخدمات التي تحتاجها لتحصل على نطاق سعري تقريبي فوري."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-5 lg:items-start">
          <Reveal className="lg:col-span-3">
            <div className="rounded-card border border-midnight/10 bg-white/60 p-6 sm:p-7">
              <p className="label-latin mb-4 text-[0.6rem] text-gold-deep">Select services</p>
              <div className="flex flex-wrap gap-2.5">
                {ESTIMATE_SERVICES.map((service) => {
                  const on = selectedIds.includes(service.id);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => toggle(service.id)}
                      aria-pressed={on}
                      className={cn(
                        "inline-flex items-center gap-2.5 rounded-button border px-4 py-2.5 text-sm transition-all",
                        on
                          ? "border-gold bg-gold/10 text-midnight shadow-sm"
                          : "border-midnight/15 bg-white text-midnight/75 hover:border-gold/50"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-4 shrink-0 place-items-center rounded border",
                          on ? "border-gold bg-gold text-midnight" : "border-midnight/25"
                        )}
                      >
                        {on && <Icon name="check" className="size-3" />}
                      </span>
                      {service.label}
                      <span className="font-latin text-xs text-midnight/40">
                        {formatNumber(service.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-card border border-gold/25 bg-white p-6 shadow-soft sm:p-7 lg:sticky lg:top-24">
              <Pattern className="pointer-events-none absolute inset-0 h-full w-full text-gold/[0.04]" id="estimate-geo" />
              {phase === "done" ? (
                <FormSuccess
                  title="تم حفظ تقديرك"
                  message="سنراجع طلبك ونعود إليك بعرض سعر مفصّل."
                  waUrl={doneUrl}
                />
              ) : (
                <div className="relative">
                  <p className="label-latin text-[0.6rem] text-gold-deep">Estimated range</p>
                  <div className="mt-3 rounded-xl bg-midnight p-5 text-center text-ivory">
                    {hasSelection ? (
                      <p className="font-kufi text-xl sm:text-2xl">
                        من <span className="font-latin font-semibold text-gold">{formatNumber(min)}</span>{" "}
                        إلى <span className="font-latin font-semibold text-gold">{formatNumber(max)}</span> ريال
                      </p>
                    ) : (
                      <p className="text-ivory/55">اختر خدمة للبدء</p>
                    )}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-midnight/55">
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
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
