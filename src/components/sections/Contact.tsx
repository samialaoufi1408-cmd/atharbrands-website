"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { BUDGET_OPTIONS, SERVICE_OPTIONS, SITE } from "@/lib/constants";
import { contactSchema } from "@/lib/validation/contact";
import { postJson } from "@/lib/forms";
import { contactWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { FormSuccess } from "../ui/FormSuccess";
import { Monogram } from "../ui/Logo";

type FieldErrors = Record<string, string[] | undefined>;
const EMPTY = {
  full_name: "",
  company_name: "",
  phone: "",
  email: "",
  service_type: "",
  budget_range: "",
  message: "",
};

const INFO: { icon: string; label: string; href?: string }[] = [
  { icon: "location", label: SITE.locationAr, href: undefined },
  { icon: "mail", label: SITE.email, href: `mailto:${SITE.email}` },
  { icon: "web", label: `www.${SITE.domain}`, href: SITE.url },
];

export function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [doneUrl, setDoneUrl] = useState<string | undefined>(undefined);

  const update =
    (key: keyof typeof EMPTY) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await postJson("/api/contact", parsed.data);
    setSubmitting(false);

    const url = whatsappUrl(contactWhatsApp(parsed.data));
    setDoneUrl(url);
    if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="bg-ivory py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionTitle
              align="start"
              eyebrow="Contact"
              title="تواصل معنا"
              description="أخبرنا عن مشروعك، وسنعود إليك بخطوة أولى واضحة نحو علامة لا تُنسى."
            />

            <ul className="mt-8 flex flex-col gap-3">
              {INFO.map((item) => {
                const content = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold/25 bg-gold/[0.06] text-gold-deep">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                    <span className="text-midnight/75">{item.label}</span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-4 transition-colors hover:text-gold-deep"
                      >
                        {content}
                      </a>
                    ) : (
                      <span className="flex items-center gap-4">{content}</span>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex items-center gap-4">
              <Button
                href={whatsappUrl("السلام عليكم، أرغب في الاستفسار عن خدمات أثر.")}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
              >
                <Icon name="whatsapp" className="size-5" />
                تواصل عبر واتساب
              </Button>
              <Monogram className="size-12 opacity-70" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-card border border-gold/20 bg-white p-6 shadow-soft sm:p-9">
              {doneUrl ? (
                <FormSuccess
                  title="تم استلام رسالتك"
                  message="شكرًا لتواصلك مع أثر. سنعود إليك في أقرب وقت. يمكنك متابعة الطلب عبر واتساب الآن."
                  waUrl={doneUrl}
                />
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      id="ct-name"
                      label="الاسم"
                      required
                      value={form.full_name}
                      onChange={update("full_name")}
                      error={errors.full_name?.[0]}
                      placeholder="اسمك الكامل"
                    />
                    <Input
                      id="ct-company"
                      label="اسم الشركة"
                      value={form.company_name}
                      onChange={update("company_name")}
                      error={errors.company_name?.[0]}
                      placeholder="اختياري"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      id="ct-phone"
                      label="رقم الجوال"
                      required
                      inputMode="tel"
                      value={form.phone}
                      onChange={update("phone")}
                      error={errors.phone?.[0]}
                      placeholder="05xxxxxxxx"
                    />
                    <Input
                      id="ct-email"
                      label="البريد الإلكتروني"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      error={errors.email?.[0]}
                      placeholder="اختياري"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Select
                      id="ct-service"
                      label="نوع الخدمة"
                      placeholder="اختر الخدمة"
                      options={SERVICE_OPTIONS}
                      value={form.service_type}
                      onChange={update("service_type")}
                      error={errors.service_type?.[0]}
                    />
                    <Select
                      id="ct-budget"
                      label="الميزانية التقريبية"
                      placeholder="اختر الميزانية"
                      options={BUDGET_OPTIONS}
                      value={form.budget_range}
                      onChange={update("budget_range")}
                      error={errors.budget_range?.[0]}
                    />
                  </div>
                  <Textarea
                    id="ct-message"
                    label="الرسالة"
                    value={form.message}
                    onChange={update("message")}
                    error={errors.message?.[0]}
                    placeholder="أخبرنا عن مشروعك وما تطمح إليه"
                  />
                  <Button type="submit" disabled={submitting} className="mt-1 w-full sm:w-auto">
                    {submitting ? "جارٍ الإرسال…" : "إرسال الطلب"}
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
