"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { PACKAGES, type BrandPackage } from "@/data/packages";
import { cn, formatNumber } from "@/lib/utils";
import { packageRequestSchema } from "@/lib/validation/packageRequest";
import { postJson } from "@/lib/forms";
import { packageWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Pattern } from "../ui/Pattern";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import { FormSuccess } from "../ui/FormSuccess";

type FieldErrors = Record<string, string[] | undefined>;
const EMPTY = { full_name: "", company_name: "", phone: "", email: "", message: "" };

export function Packages() {
  const [active, setActive] = useState<BrandPackage | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [doneUrl, setDoneUrl] = useState<string | null>(null);

  function openModal(pkg: BrandPackage) {
    setActive(pkg);
    setForm(EMPTY);
    setErrors({});
    setDoneUrl(null);
  }

  const update =
    (key: keyof typeof EMPTY) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!active) return;

    const parsed = packageRequestSchema.safeParse({
      package_name: active.name,
      package_starting_price: active.startingPrice,
      ...form,
    });
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    await postJson("/api/package-request", parsed.data);
    setSubmitting(false);

    const url = whatsappUrl(packageWhatsApp(parsed.data));
    setDoneUrl(url);
    if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="packages" className="relative overflow-hidden bg-midnight py-24 text-ivory lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Pattern className="h-full w-full text-gold/[0.05]" id="packages-geo" />
      </div>

      <Container className="relative">
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Packages"
            title="باقات بناء العلامة"
            description="ثلاث باقات تناسب مرحلة مشروعك وطموحك."
          />
        </Reveal>

        <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 80} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-card border p-7 transition-all duration-500 sm:p-8",
                  pkg.recommended
                    ? "border-gold/50 bg-ivory/[0.06] shadow-gold lg:-translate-y-3"
                    : "border-ivory/10 bg-ivory/[0.03] hover:border-gold/30"
                )}
              >
                {pkg.recommended && (
                  <span className="label-latin absolute -top-3 right-7 rounded-full bg-gold px-3 py-1 text-[0.55rem] text-midnight">
                    الأكثر طلبًا
                  </span>
                )}
                <p className="label-latin text-[0.58rem] text-gold/70">
                  Package {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-kufi text-2xl text-ivory">{pkg.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/60">{pkg.tagline}</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="label-latin text-[0.55rem] text-ivory/45">From</span>
                  <span className="font-latin text-3xl font-semibold text-gold">
                    {formatNumber(pkg.startingPrice)}
                  </span>
                  <span className="text-sm text-ivory/60">ريال</span>
                </div>

                <div className="rule-gold my-6 opacity-70" />

                <ul className="flex flex-1 flex-col gap-2.5">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-ivory/80">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => openModal(pkg)}
                  variant={pkg.recommended ? "primary" : "outlineLight"}
                  className="mt-7 w-full"
                >
                  اطلب هذه الباقة
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ivory/50">
          الأسعار تقديرية وتختلف حسب نطاق المشروع ومتطلبات العلامة.
        </p>
      </Container>

      <Modal
        open={active !== null}
        onClose={() => setActive(null)}
        title={active ? `طلب ${active.name}` : ""}
      >
        {doneUrl ? (
          <FormSuccess
            title="تم استلام طلبك"
            message="سنتواصل معك قريبًا لمناقشة تفاصيل الباقة. يمكنك متابعة الطلب عبر واتساب الآن."
            waUrl={doneUrl}
          />
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            {active && (
              <div className="flex items-baseline justify-between rounded-xl bg-midnight/5 px-4 py-3 text-sm">
                <span className="text-midnight/70">{active.name}</span>
                <span className="text-midnight/60">
                  تبدأ من{" "}
                  <span className="font-latin font-semibold text-gold-deep">
                    {formatNumber(active.startingPrice)}
                  </span>{" "}
                  ريال
                </span>
              </div>
            )}
            <Input
              id="pkg-name"
              label="الاسم"
              required
              value={form.full_name}
              onChange={update("full_name")}
              error={errors.full_name?.[0]}
              placeholder="اسمك الكامل"
            />
            <Input
              id="pkg-company"
              label="اسم الشركة"
              value={form.company_name}
              onChange={update("company_name")}
              error={errors.company_name?.[0]}
              placeholder="اختياري"
            />
            <Input
              id="pkg-phone"
              label="رقم الجوال"
              required
              inputMode="tel"
              value={form.phone}
              onChange={update("phone")}
              error={errors.phone?.[0]}
              placeholder="05xxxxxxxx"
            />
            <Input
              id="pkg-email"
              label="البريد الإلكتروني"
              type="email"
              value={form.email}
              onChange={update("email")}
              error={errors.email?.[0]}
              placeholder="اختياري"
            />
            <Textarea
              id="pkg-message"
              label="ملاحظات"
              value={form.message}
              onChange={update("message")}
              error={errors.message?.[0]}
              placeholder="أخبرنا بأي تفاصيل تهمك (اختياري)"
            />
            <Button type="submit" disabled={submitting} className="mt-1 w-full">
              {submitting ? "جارٍ الإرسال…" : "إرسال الطلب"}
            </Button>
          </form>
        )}
      </Modal>
    </section>
  );
}
