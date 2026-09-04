import { FullCaseStudyDocument } from '@/components/work/FullCaseStudyDocument';

type Props = { params: { locale: 'ar' | 'en' } };

export default function AthrBrandsCase({ params }: Props) {
  return (
    <FullCaseStudyDocument
      locale={params.locale}
      titleAr="أثر"
      titleEn="ATHR BRANDS"
      fileName="ATHRBRANDS_Complete_Brand_Strategy_Identity_Study_AR_v1.2.pdf"
      pdfSrc="/work-files/athrbrands.pdf"
      pageCount={40}
      accent="#9f7448"
    />
  );
}
