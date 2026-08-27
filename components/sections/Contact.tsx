'use client';
import { useRef, useState } from 'react';
import { Reveal } from '@/components/fx/Reveal';
import { Locale, tHtml } from '@/content/site';
import { Mixed } from '@/lib/Mixed';
import { sendEnquiry } from '@/app/actions';

const EMAIL = 'admin@atharbrands.com';
const PHONE = '+966599444486';

function whatsappHref(ar: boolean) {
  const message = ar
    ? 'السلام عليكم، أرغب في معرفة المزيد عن خدمات أثر وباقة إطلاق المنتج السعودي.'
    : 'Hello, I would like to know more about ATHR services and the Saudi Product Launch Package.';
  return `https://wa.me/966599444486?text=${encodeURIComponent(message)}`;
}

interface ContactProps {
  locale: Locale;
  ov?: Record<string, string>;
}

export function Contact({ locale, ov }: ContactProps) {
  const html = (k: any) => tHtml(locale, k, ov);
  const ar = locale === 'ar';
  const formRef = useRef<HTMLFormElement>(null);
  const [label, setLabel] = useState<'idle' | 'sent' | 'error'>('idle');

  const idle = ar ? 'أرسل الطلب' : 'Send Enquiry';
  const sent = ar ? 'تم الإرسال' : 'Message Sent';
  const err = ar ? 'حاول مجدداً' : 'Try Again';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const fd = new FormData(f);
    const res = await sendEnquiry({
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      organisation: String(fd.get('org') ?? ''),
      vision: String(fd.get('msg') ?? ''),
      locale,
    });
    if (res.ok) {
      setLabel('sent');
      f.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input,textarea').forEach(
        (el) => (el.value = ''),
      );
      setTimeout(() => setLabel('idle'), 3200);
    } else {
      setLabel('error');
      setTimeout(() => setLabel('idle'), 3200);
    }
  }

  return (
    <section className="contact" id="contact" data-screen-label="Contact">
      <div className="container contact-grid">
        <div className="contact-lead">
          <Reveal as="span" className="eyebrow" dangerouslySetInnerHTML={html('con_eyebrow')} />
          <Reveal as="h2" delay={1} dangerouslySetInnerHTML={html('con_title')} />
          <Reveal
            as="p"
            delay={1}
            className="contact-ar"
            dangerouslySetInnerHTML={html('con_ar')}
          />
          <Reveal
            as="p"
            delay={2}
            className="lede"
            dangerouslySetInnerHTML={html('con_lede')}
          />
          <Reveal delay={2} className="contact-detail">
            <div className="cd-item">
              <Mixed as="div" className="k" text={ar ? 'الاستوديو' : 'Studio'} />
              <div className="v" dangerouslySetInnerHTML={html('con_studio')} />
            </div>
            <div className="cd-item">
              <Mixed as="div" className="k" text={ar ? 'البريد' : 'Enquiries'} />
              <a className="v contact-link" href={`mailto:${EMAIL}`} dangerouslySetInnerHTML={html('con_email')} />
            </div>
            <div className="cd-item">
              <Mixed as="div" className="k" text={ar ? 'الهاتف' : 'Telephone'} />
              <a className="v contact-link" href={`tel:${PHONE}`} dangerouslySetInnerHTML={html('con_phone')} />
            </div>
          </Reveal>
          <Reveal delay={3} className="contact-direct">
            <a
              href={whatsappHref(ar)}
              className="btn"
              target="_blank"
              rel="noreferrer"
            >
              <span className="dot" />
              <span className="txt">
                <Mixed text={ar ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'} />
              </span>
            </a>
          </Reveal>
        </div>
        <Reveal delay={2}>
          <Mixed
            as="p"
            className="form-intro"
            text={ar ? 'أو أرسل تفاصيل مشروعك مباشرة' : 'Or send your project brief directly'}
          />
          <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
            <div className="form-row">
              <div className="field">
                <Mixed as="label" text={ar ? 'الاسم · Name' : 'Name · الاسم'} />
                <input type="text" name="name" required />
              </div>
              <div className="field">
                <Mixed as="label" text={ar ? 'البريد · Email' : 'Email · البريد'} />
                <input type="email" name="email" required />
              </div>
            </div>
            <div className="field">
              <Mixed as="label" text={ar ? 'الجهة · Organisation' : 'Organisation · الجهة'} />
              <input type="text" name="org" />
            </div>
            <div className="field">
              <Mixed as="label" text={ar ? 'رؤيتك · Your Vision' : 'Your Vision · رؤيتك'} />
              <textarea name="msg" rows={3} required />
            </div>
            <button type="submit" className="btn">
              <span className="dot" />
              <span className="txt">
                <Mixed text={label === 'sent' ? sent : label === 'error' ? err : idle} />
              </span>
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
