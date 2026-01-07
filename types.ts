
export interface Clergy {
  id: string;
  name: string;
  accountLink: string;
  ministryLocation: string;
  mission: string;
  ordinationDate: string;
  timePeriod: string;
  code: string;
  // New Fields
  dateOfBirth?: string;
  patronSaint?: string;
  ministryHistory?: string;
}

export interface SearchFilters {
  searchTerm: string;
  category: string;
}
