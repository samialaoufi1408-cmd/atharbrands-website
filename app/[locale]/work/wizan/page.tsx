import { FullCaseStudyDocument } from '@/components/work/FullCaseStudyDocument';

type Props = { params: { locale: 'ar' | 'en' } };

export default function WizanCase({ params }: Props) {
  return (
    <FullCaseStudyDocument
      locale={params.locale}
      titleAr="وِزان"
      titleEn="WIZAN"
      fileName="WIZAN_Complete_Brand_Case_Study_AR.pdf"
      pdfSrc="/work-files/wizan.pdf"
      pageCount={59}
      accent="#6087a0"
    />
  );
}
