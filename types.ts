
export type UserRole = 'CLIENT' | 'PROFESSIONAL' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  balance?: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  baseLeadPrice: number;
}

export interface ServiceRequest {
  id: string;
  clientId: string;
  clientName: string;
  category: string;
  subcategory: string;
  description: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  budget?: number;
  createdAt: number;
  unlockedBy: string[];
}

export type AppView = 'home' | 'request' | 'pro-dashboard' | 'admin' | 'lead-detail' | 'pro-signup' | 'login' | 'add-credits' | 'info';
