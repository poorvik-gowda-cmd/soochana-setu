export interface Citizen {
  id: string;
  name: string;
  aadhaar: string;
  phone: string;
}

export interface DepartmentRecord {
  id: string;
  citizen_id: string;
  department: string;
  income: number;
  category: "Poor" | "Middle" | "Rich";
  scheme: string;
}

export interface Policy {
  id: string;
  department: string;
  scheme: string;
  type: string;
  eligibility_rules: string;
  min_income?: number;
  max_income?: number;
  required_category?: string;
}

export interface UnifiedProfile {
  citizen: Citizen;
  records: DepartmentRecord[];
  policies: Policy[];
  conflicts: string[];
  truth_score: number;
}

export interface EligibilityResult {
  department: string;
  scheme: string;
  percentage: number;
  reason: string;
}

export interface AIEvaluationResponse {
  eligibility: EligibilityResult[];
  overall_confidence: number;
  summary: string;
}

export interface CitizenPortalPolicy {
  policy_name: string;
  department: string;
  eligibility_percentage: number;
  status: "Eligible" | "Partial" | "Not Eligible";
  reason: string;
}

export interface DistrictEntry {
  district: string;
  conflict_rate: number;
  risk: "High" | "Medium" | "Low";
  trend: "up" | "down" | "stable";
}

export type DepartmentType = "Food" | "Health" | "Tax" | "Education";

export interface HeatmapData {
  department: DepartmentType;
  stats: {
    total_districts: number;
    high_risk: number;
    avg_conflict: number;
  };
  districts: DistrictEntry[];
}

export interface CitizenPortalResult {
  eligible_policies: CitizenPortalPolicy[];
  summary: string;
}
