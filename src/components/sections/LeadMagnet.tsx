"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { newsletterSchema } from "@/lib/validation/newsletter";
import { postJson } from "@/lib/forms";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { LogoMark, Monogram } from "../ui/Logo";
import { Pattern } from "../ui/Pattern";
import { FormSuccess } from "../ui/FormSuccess";

type FieldErrors = Record<string, string[] | undefined>;
const EMPTY = { full_name: "", email: "", phone: "" };

export function LeadMagnet() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update =
    (key: keyof typeof EMPTY) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ ...form, lead_magnet: "brand_guide" });
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await postJson("/api/newsletter", parsed.data);
    setSubmitting(false);
    setDone(true);
  }

  return (
    <section id="guide" className="bg-sand py-24 lg:py-32">
      <Container>
        <Reveal>
          <div className="grid overflow-hidden rounded-card border border-gold/25 shadow-soft lg:grid-cols-2">
            {/* PDF / book cover */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-midnight p-8 text-ivory sm:p-10">
              <Pattern className="absolute inset-0 h-full w-full text-gold/[0.05]" id="guide-geo" />
              <div className="relative flex items-center justify-between">
                <Monogram className="size-14" />
                <span className="label-latin text-[0.55rem] text-gold/70">Free Guide · PDF</span>
              </div>
              <div className="relative mt-10">
                <p className="label-latin text-[0.6rem] text-gold/80">ATHAR Brands</p>
                <h3 className="mt-3 font-kufi text-3xl leading-tight text-ivory">
                  دليل بناء
                  <br />
                  علامة تجارية قوية
                </h3>
                <div className="rule-gold mt-5 max-w-[10rem] opacity-70" />
                <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/60">
                  الأخطاء التي تضعف هوية مشروعك، وكيف تبدأ ببناء علامة واضحة وقابلة للتذكر.
                </p>
              </div>
              <div className="relative mt-10 flex items-center gap-2 text-ivory/45">
                <LogoMark className="h-5 w-5 text-gold" />
                <span className="font-latin text-xs">atharbrands.com</span>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 sm:p-10">
              {done ? (
                <FormSuccess
                  title="تم تسجيل طلبك"
                  message="سنرسل لك الدليل قريبًا على بريدك الإلكتروني."
                />
              ) : (
                <>
                  <p className="label-latin text-[0.6rem] text-gold-deep">Get the guide</p>
                  <h3 className="mt-3 font-kufi text-2xl text-midnight">حمّل الدليل مجانًا</h3>
                  <p className="mt-2 text-sm leading-relaxed text-midnight/60">
                    اترك بياناتك ونرسل لك الدليل مباشرة على بريدك.
                  </p>
                  <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
                    <Input
                      id="lm-name"
                      label="الاسم"
                      value={form.full_name}
                      onChange={update("full_name")}
                      error={errors.full_name?.[0]}
                      placeholder="اسمك الكامل"
                    />
                    <Input
                      id="lm-email"
                      label="البريد الإلكتروني"
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      error={errors.email?.[0]}
                      placeholder="you@example.com"
                    />
                    <Input
                      id="lm-phone"
                      label="رقم الجوال"
                      inputMode="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      error={errors.phone?.[0]}
                      placeholder="اختياري"
                    />
                    <Button type="submit" disabled={submitting} className="mt-1 w-full">
                      {submitting ? "جارٍ الإرسال…" : "أرسل لي الدليل"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
