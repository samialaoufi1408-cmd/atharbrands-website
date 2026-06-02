/**
 * Service price list powering the estimate calculator.
 * Edit prices here. The max estimate is min + (ESTIMATE_MAX_MULTIPLIER - 1).
 */

export interface EstimateService {
  id: string;
  label: string;
  price: number;
}

export const ESTIMATE_SERVICES: EstimateService[] = [
  { id: "strategy", label: "استراتيجية براند", price: 5000 },
  { id: "logo", label: "تصميم شعار", price: 3500 },
  { id: "identity", label: "هوية بصرية", price: 7000 },
  { id: "profile", label: "بروفايل شركة", price: 4500 },
  { id: "website", label: "موقع تعريفي", price: 9000 },
  { id: "social", label: "قوالب سوشال", price: 2500 },
  { id: "packaging", label: "تغليف منتج", price: 6000 },
  { id: "launch", label: "حملة إطلاق", price: 8000 },
];

/** Upper bound = base total × this multiplier (i.e. +30%). */
export const ESTIMATE_MAX_MULTIPLIER = 1.3;
