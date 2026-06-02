"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { newsletterSchema } from "@/lib/validation/newsletter";
import { postJson } from "@/lib/forms";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { LogoMark } from "../ui/Logo";
import { FormSuccess } from "../ui/FormSuccess";

type FieldErrors = Record<string, string[] | undefined>;
const EMPTY = { full_name: "", email: "", phone: "" };

export function LeadMagnet() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (key: keyof typeof EMPTY) => (e: ChangeEvent<HTMLInputElement>) =>
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
    <section id="guide" className="bg-sand py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionTitle
              align="start"
              eyebrow="Free Guide"
              title="حمّل دليل بناء علامة تجارية قوية"
              description="دليل مختصر يساعدك على فهم الأخطاء التي تضعف هوية مشروعك، وكيف تبدأ ببناء علامة واضحة وقابلة للتذكر."
            />
            <div className="relative mt-10 h-44 w-36">
              <div className="bg-midnight/15 absolute inset-0 rotate-[-6deg] rounded-xl" />
              <div className="bg-midnight text-ivory absolute inset-0 flex flex-col justify-between rounded-xl p-4 shadow-xl">
                <LogoMark className="text-gold h-8 w-8" />
                <div>
                  <span className="font-kufi text-lg">دليل الهوية</span>
                  <span className="bg-gold mt-1.5 block h-px w-10" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="border-midnight/10 rounded-3xl border bg-white p-6 shadow-[0_40px_90px_-60px_rgba(13,27,42,0.35)] sm:p-9">
              {done ? (
                <FormSuccess
                  title="تم تسجيل طلبك"
                  message="سنرسل لك الدليل قريبًا على بريدك الإلكتروني."
                />
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
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
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
