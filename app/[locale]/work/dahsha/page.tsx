import { FullCaseStudyDocument } from '@/components/work/FullCaseStudyDocument';

type Props = { params: { locale: 'ar' | 'en' } };

export default function DahshaCase({ params }: Props) {
  return (
    <FullCaseStudyDocument
      locale={params.locale}
      titleAr="دهشة"
      titleEn="DAHSHA"
      fileName="DAHSHA_Athr_Conceptual_Identity_2026.pdf"
      pdfSrc="/work-files/dahsha.pdf"
      pageCount={22}
      accent="#2d5be7"
    />
  );
}
