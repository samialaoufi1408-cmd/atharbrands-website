"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ESTIMATE_SERVICES, ESTIMATE_MAX_MULTIPLIER } from "@/data/pricing";
import { cn } from "@/lib/utils";
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
  // Computed for the saved lead only — never shown to the visitor.
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
    <section id="estimate" className="bg-charcoal py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Proposal"
            title="اطلب تصورًا مبدئيًا"
            description="اختر الخدمات التي تحتاجها، ونعدّ لك تصورًا مبدئيًا وعرضًا مناسبًا لمشروعك."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-5 lg:items-start">
          <Reveal className="lg:col-span-3">
            <div className="rounded-card border border-ivory/10 bg-ivory/[0.03] p-6 sm:p-7">
              <p className="label-latin mb-4 text-[0.6rem] text-gold">اختر الخدمات</p>
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
                          ? "border-gold bg-gold/10 text-ivory"
                          : "border-ivory/15 bg-ivory/[0.03] text-ivory/75 hover:border-gold/50"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-4 shrink-0 place-items-center rounded border",
                          on ? "border-gold bg-gold text-charcoal" : "border-ivory/25"
                        )}
                      >
                        {on && <Icon name="check" className="size-3" />}
                      </span>
                      {service.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-card border border-ivory/10 bg-charcoal-700 p-6 shadow-soft sm:p-7 lg:sticky lg:top-24">
              <Pattern className="pointer-events-none absolute inset-0 h-full w-full text-gold/[0.04]" id="estimate-geo" />
              {phase === "done" ? (
                <FormSuccess
                  title="تم استلام طلبك"
                  message="سنراجع طلبك ونعود إليك بتصور مبدئي وعرض مناسب لمشروعك."
                  waUrl={doneUrl}
                />
              ) : (
                <div className="relative">
                  <p className="label-latin text-[0.6rem] text-gold">ملخص طلبك</p>
                  <div className="mt-3 rounded-xl bg-charcoal p-5 text-center">
                    {hasSelection ? (
                      <div>
                        <p className="font-kufi text-lg text-ivory">
                          اخترت{" "}
                          <span className="font-latin font-semibold text-gold">
                            {selectedServices.length}
                          </span>{" "}
                          {selectedServices.length === 1 ? "خدمة" : "خدمات"}
                        </p>
                        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                          {labels.map((label) => (
                            <span
                              key={label}
                              className="rounded-button border border-ivory/12 bg-ivory/[0.04] px-2.5 py-1 text-xs text-ivory/70"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-ivory/55">اختر خدمة للبدء</p>
                    )}
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-ivory/55">
                    نعدّ لك التصور المبدئي والعرض المناسب بعد فهم مشروعك في جلسة الاكتشاف.
                  </p>

                  {!showForm ? (
                    <Button
                      onClick={() => setShowForm(true)}
                      disabled={!hasSelection}
                      className="mt-5 w-full"
                    >
                      اطلب التصور المبدئي
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
