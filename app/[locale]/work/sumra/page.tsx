import { FullCaseStudyDocument } from '@/components/work/FullCaseStudyDocument';

type Props = { params: { locale: 'ar' | 'en' } };

export default function SumraCase({ params }: Props) {
  return (
    <FullCaseStudyDocument
      locale={params.locale}
      titleAr="سُمرة"
      titleEn="SUMRA"
      fileName="SUMRA_Brand_Identity_Guidelines.pdf"
      pdfSrc="/work-files/sumra.pdf"
      pageCount={29}
      accent="#9a6843"
    />
  );
}
