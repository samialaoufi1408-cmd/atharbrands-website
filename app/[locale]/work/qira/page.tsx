import { FullCaseStudyDocument } from '@/components/work/FullCaseStudyDocument';

type Props = { params: { locale: 'ar' | 'en' } };

export default function QiraCase({ params }: Props) {
  return (
    <FullCaseStudyDocument
      locale={params.locale}
      titleAr="قِرَى"
      titleEn="QIRA"
      fileName="QIRA_Heritage_Stays_Complete_Brand_Case_Study_AR_v1.3.pdf"
      pdfSrc="/work-files/qira.pdf"
      pageCount={40}
      accent="#8a4b38"
    />
  );
}
