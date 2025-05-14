export interface RejectedStartup {
  id?: string;
  name: string;
  description: string;
  founder: string;
  industry: string;
  foundedDate: Date;
  employees: number;
  website?: string;
  userId: string;
  rejectionReason: string;
  originalStartupId?: string;
}