import type { Bilingual, ModelConfig } from '@/lib/portfolio-feasibility-model';

export type StudyCard = { title: Bilingual; body: Bilingual };
export type StudySource = { title: Bilingual; url: string; purpose: Bilingual };
export type PortfolioFeasibilityStudy = {
  slug: string; name: Bilingual; sector: Bilingual; hero: string;
  theme: { ink: string; paper: string; soft: string };
  summary: Bilingual; scope: Bilingual; decision: Bilingual;
  market: StudyCard[]; validation: StudyCard[]; offer: StudyCard[];
  operations: StudyCard[]; capacityNote: Bilingual; collectionNote: Bilingual;
  assumptions: StudyCard[]; variableCosts: Bilingual; tax: Bilingual;
  risks: StudyCard[]; gates: StudyCard[]; brand: StudyCard[];
  sources: StudySource[]; model: ModelConfig;
};
