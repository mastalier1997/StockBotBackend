export interface Stock {
  symbol: string;
  name: string;
  buydate?: string;
  shares_count?: number;
  price: number;
  dbTimestamp?: string;
  logoUrl?: string;
  companyUrl?: string;
  stockUrl?: string;
}
