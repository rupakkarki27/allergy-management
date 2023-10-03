export interface IAllergy {
  id: string;
  name: string;
  symptoms: string[];
  severity: AllergySeverity;
  isHighRisk: boolean;
  image?: string;
  notes?: string;
}

export enum AllergySeverity {
  MILD = "MILD",
  MODERATE = "MODERATE",
  SEVERE = "SEVERE",
  LIFE_THREATENING = "LIFE THREATENING",
  DEATH = "DEATH",
}
