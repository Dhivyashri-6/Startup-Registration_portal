export interface Startup {
  id?: string;
  name: string;
  description: string;
  founder: string;
  industry: string;
  foundedDate: Date;
  employees: number;
  website?: string;
  userId: string;
  status?: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}