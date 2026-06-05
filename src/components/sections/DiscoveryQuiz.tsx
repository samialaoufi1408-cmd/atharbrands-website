"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { PACKAGES, type BrandPackage } from "@/data/packages";
import { cn } from "@/lib/utils";
import { discoverySchema } from "@/lib/validation/discovery";
import { postJson } from "@/lib/forms";
import { discoveryWhatsApp, whatsappUrl } from "@/lib/whatsapp";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { RippleMark } from "../ui/RippleMark";
import { FormSuccess } from "../ui/FormSuccess";

const QUESTIONS = [
  {
    id: "project_type",
    title: "ما نوع مشروعك؟",
    options: [
      "شركة ناشئة",
      "مطعم أو مقهى",
      "عيادة أو مركز طبي",
      "عقار أو مقاولات",
      "متجر أو منتج",
      "تطبيق أو منصة تقنية",
      "مشروع فاخر",
    ],
  },
  {
    id: "needed_service",
    title: "ما الخدمة التي تحتاجها؟",
    options: [
      "اسم تجاري",
      "شعار",
      "هوية بصرية",
      "موقع تعريفي",
      "بروفايل شركة",
      "سوشال ميديا",
      "إطلاق كامل",
    ],
  },
  {
    id: "project_stage",
    title: "ما مرحلة المشروع؟",
    options: ["فكرة", "تحت التأسيس", "قائم ويحتاج تطوير", "إعادة بناء براند"],
  },
  {
    id: "budget_range",
    title: "الميزانية التقريبية؟",
    options: ["أقل من 5,000", "5,000 إلى 10,000", "10,000 إلى 25,000", "أكثر من 25,000"],
  },
  {
    id: "launch_timeline",
    title: "متى تريد الإطلاق؟",
    options: ["خلال أسبوعين", "خلال شهر", "خلال 3 أشهر", "غير مستعجل"],
  },
] as const;

type Answers = Record<string, string>;
type FieldErrors = Record<string, string[] | undefined>;
const EMPTY_LEAD = { full_name: "", phone: "", email: "" };

function packageByName(name: string): BrandPackage {
  return PACKAGES.find((p) => p.name === name) ?? PACKAGES[0];
}

function recommend(budget?: string): BrandPackage {
  if (budget === "أكثر من 25,000") return packageByName("باقة الأثر");
  if (budget === "10,000 إلى 25,000") return packageByName("باقة النمو");
  return packageByName("باقة الانطلاق");
}

export function DiscoveryQuiz() {
  const [phase, setPhase] = useState<"quiz" | "result" | "done">("quiz");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [lead, setLead] = useState(EMPTY_LEAD);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [doneUrl, setDoneUrl] = useState<string | undefined>(undefined);

  const current = QUESTIONS[step];
  const recommended = recommend(answers.budget_range);

  function select(value: string) {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    if (step < QUESTIONS.length - 1) setStep(step + 1);
    else setPhase("result");
  }

  const updateLead =
    (key: keyof typeof EMPTY_LEAD) => (e: ChangeEvent<HTMLInputElement>) =>
      setLead((prev) => ({ ...prev, [key]: e.target.value }));

  function restart() {
    setPhase("quiz");
    setStep(0);
    setAnswers({});
    setLead(EMPTY_LEAD);
    setErrors({});
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = discoverySchema.safeParse({
      project_type: answers.project_type,
      needed_service: answers.needed_service,
      project_stage: answers.project_stage,
      budget_range: answers.budget_range,
      launch_timeline: answers.launch_timeline,
      recommended_package: recommended.name,
      ...lead,
    });
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await postJson("/api/discovery", parsed.data);
    setSubmitting(false);

    const url = whatsappUrl(discoveryWhatsApp(parsed.data));
    setDoneUrl(url);
    if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
    setPhase("done");
  }

  return (
    <section id="discovery" className="bg-charcoal-700 py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionTitle
            tone="light"
            eyebrow="Discovery"
            title="اكتشف احتياج علامتك"
            description="أجب عن خمسة أسئلة سريعة لنقترح عليك نقطة انطلاق مناسبة."
          />
        </Reveal>

        <Reveal>
          <div className="mx-auto mt-12 max-w-2xl rounded-card border border-ivory/10 bg-charcoal p-6 shadow-soft sm:p-9">
            {phase === "quiz" && (
              <div>
                <div className="flex items-center justify-between text-sm text-ivory/55">
                  <span>
                    سؤال {step + 1} من {QUESTIONS.length}
                  </span>
                  <span className="label-latin text-[0.6rem] text-gold">
                    {String(step + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-ivory/10">
                  <div
                    className="h-full rounded-full bg-gold transition-all duration-500"
                    style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                  />
                </div>

                <h3 className="mt-7 font-kufi text-2xl text-ivory">{current.title}</h3>
                <div className="mt-5 flex flex-col gap-2.5">
                  {current.options.map((option) => {
                    const selected = answers[current.id] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => select(option)}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-right transition-all",
                          selected
                            ? "border-gold bg-gold/10 text-ivory"
                            : "border-ivory/12 text-ivory/80 hover:border-gold/50 hover:bg-gold/5"
                        )}
                      >
                        <span>{option}</span>
                        <span
                          className={cn(
                            "grid size-5 shrink-0 place-items-center rounded-full border",
                            selected ? "border-gold bg-gold text-charcoal" : "border-ivory/25"
                          )}
                        >
                          {selected && <Icon name="check" className="size-3.5" />}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm text-ivory/55 transition-colors hover:text-gold"
                  >
                    <Icon name="arrow" className="size-4 rotate-180" />
                    السؤال السابق
                  </button>
                )}
              </div>
            )}

            {phase === "result" && (
              <div>
                <div className="rounded-card border border-gold/30 bg-gold/[0.06] p-6">
                  <div className="flex items-center justify-between">
                    <span className="label-latin text-[0.6rem] text-gold">Recommended</span>
                    <RippleMark className="h-8 w-auto text-gold" />
                  </div>
                  <h3 className="mt-3 font-kufi text-2xl text-ivory">{recommended.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ivory/65">{recommended.tagline}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm text-gold/80">
                    <Icon name="check" className="size-4" />
                    نوضّح لك التفاصيل والتصور المبدئي في جلسة الاكتشاف.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
                  <p className="text-sm text-ivory/65">
                    اترك بياناتك ونرسل لك تصورًا مبدئيًا مناسبًا لمشروعك.
                  </p>
                  <Input
                    id="dq-name"
                    label="الاسم"
                    required
                    value={lead.full_name}
                    onChange={updateLead("full_name")}
                    error={errors.full_name?.[0]}
                    placeholder="اسمك الكامل"
                  />
                  <Input
                    id="dq-phone"
                    label="رقم الجوال"
                    required
                    inputMode="tel"
                    value={lead.phone}
                    onChange={updateLead("phone")}
                    error={errors.phone?.[0]}
                    placeholder="05xxxxxxxx"
                  />
                  <Input
                    id="dq-email"
                    label="البريد الإلكتروني"
                    type="email"
                    value={lead.email}
                    onChange={updateLead("email")}
                    error={errors.email?.[0]}
                    placeholder="اختياري"
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? "جارٍ الإرسال…" : "احصل على تصور مبدئي"}
                    </Button>
                    <button
                      type="button"
                      onClick={restart}
                      className="text-sm text-ivory/55 transition-colors hover:text-gold"
                    >
                      تعديل الإجابات
                    </button>
                  </div>
                </form>
              </div>
            )}

            {phase === "done" && (
              <FormSuccess
                title="تم استلام طلبك"
                message="شكرًا لك. سنراجع إجاباتك ونتواصل معك بتصور مبدئي مناسب لمشروعك."
                waUrl={doneUrl}
              />
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
