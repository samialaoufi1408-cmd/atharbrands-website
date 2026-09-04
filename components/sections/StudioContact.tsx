'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Locale } from '@/content/site';
import { sendEnquiry } from '@/app/actions';
import { CONTACT_EMAIL, CONTACT_PHONE, whatsappUrl } from '@/lib/contact';
import styles from './StudioSections.module.css';

export function StudioContact({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const [status, setStatus] = useState<'idle' | 'pending' | 'sent' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'pending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get('website') ?? '').trim()) return;
    setStatus('pending');
    try {
      const result = await sendEnquiry({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        organisation: String(data.get('organisation') ?? ''),
        vision: `${ar ? 'الخدمة المطلوبة' : 'Requested service'}: ${data.get('service')}\n${data.get('brief') ?? ''}`,
        locale,
      });
      if (result.ok) {
        form.reset();
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div>
        <p className={styles.eyebrow}>{ar ? 'ابدأ مشروعك' : 'Start a project'}</p>
        <h2 id="contact-title">{ar ? 'خلّنا نتعرّف على فكرتك.' : 'Tell us about your idea.'}</h2>
        <p className={styles.intro}>{ar ? 'أرسل نبذة عن نشاطك وما تحتاجه، لنتواصل معك ونحدد الخطوة التالية.' : 'Share your business and what you need. We will get in touch to discuss the next step.'}</p>
        <a className={styles.button} href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer" data-cta="contact-whatsapp">{ar ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</a>
        <div className={styles.contactDetails}>
          <a href={`mailto:${CONTACT_EMAIL}`} dir="ltr">{CONTACT_EMAIL}</a>
          <a href={`tel:${CONTACT_PHONE}`} dir="ltr">{CONTACT_PHONE}</a>
        </div>
      </div>
      <form onSubmit={submit} className={styles.form} aria-label={ar ? 'طلب مشروع' : 'Project enquiry'}>
        <div className={styles.formRow}>
          <label htmlFor="enquiry-name">{ar ? 'الاسم' : 'Name'}<input id="enquiry-name" name="name" autoComplete="name" required maxLength={100} /></label>
          <label htmlFor="enquiry-email">{ar ? 'البريد الإلكتروني' : 'Email'}<input id="enquiry-email" name="email" type="email" dir="ltr" autoComplete="email" required maxLength={254} /></label>
        </div>
        <label htmlFor="enquiry-organisation">{ar ? 'اسم المشروع أو النشاط' : 'Business or project name'}<input id="enquiry-organisation" name="organisation" autoComplete="organization" required maxLength={200} /></label>
        <label htmlFor="enquiry-service">{ar ? 'الخدمة المطلوبة' : 'Service needed'}
          <select id="enquiry-service" name="service" defaultValue="" required>
            <option value="" disabled>{ar ? 'اختر الخدمة' : 'Select a service'}</option>
            <option>{ar ? 'استراتيجية العلامة' : 'Brand strategy'}</option>
            <option>{ar ? 'الهوية البصرية' : 'Visual identity'}</option>
            <option>{ar ? 'تطبيقات الهوية' : 'Brand applications'}</option>
            <option>{ar ? 'أحتاج مساعدتكم في تحديد النطاق' : 'Help me define the scope'}</option>
          </select>
        </label>
        <label htmlFor="enquiry-brief">{ar ? 'تفاصيل إضافية — اختياري' : 'Additional details — optional'}<textarea id="enquiry-brief" name="brief" rows={3} maxLength={3000} /></label>
        <div className={styles.honeypot} aria-hidden="true"><label htmlFor="enquiry-website">Website<input id="enquiry-website" name="website" autoComplete="off" tabIndex={-1} /></label></div>
        <p className={styles.formNote}>{ar ? 'نستخدم بياناتك للتواصل بشأن هذا الطلب. لا ترفق معلومات سرية.' : 'We use these details to contact you about this enquiry. Please do not include confidential information.'}</p>
        <button type="submit" className={styles.button} disabled={status === 'pending'}>{status === 'pending' ? (ar ? 'جارٍ إرسال الطلب…' : 'Sending…') : (ar ? 'أرسل طلب المشروع' : 'Send project enquiry')}</button>
        <div aria-live="polite" aria-atomic="true" className={styles.formStatus}>
          {status === 'sent' && <p>{ar ? 'وصل طلبك بنجاح. سنتواصل معك عبر البريد الإلكتروني.' : 'Your enquiry has been received. We will contact you by email.'}</p>}
          {status === 'error' && <p role="alert">{ar ? 'تعذّر إرسال الطلب. احتفظنا بالتفاصيل هنا؛ حاول مجددًا أو تواصل معنا عبر واتساب.' : 'Your enquiry could not be sent. Your details are still here; try again or contact us on WhatsApp.'}</p>}
        </div>
      </form>
    </section>
  );
}
