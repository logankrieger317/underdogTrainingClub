// Lead/Contact Types
export type LeadStatus = 
  | 'new'
  | 'contacted'
  | 'consultation_scheduled'
  | 'consultation_completed'
  | 'proposal_sent'
  | 'enrolled'
  | 'in_training'
  | 'training_completed'
  | 'follow_up'
  | 'lost';

export type LeadSource = 
  | 'website_form'
  | 'phone'
  | 'referral'
  | 'social_media'
  | 'walk_in'
  | 'other';

export type ProgramType = 
  | 'puppy_power'
  | 'foundations'
  | 'private_training'
  | 'stay_and_train'
  | 'pack_life_community';

export type DogSize = 'small' | 'medium' | 'large' | 'giant';

export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number; // in months
  size: DogSize;
  notes?: string;
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  
  // Dog Information
  dogs: Dog[];
  
  // Lead Details
  status: LeadStatus;
  source: LeadSource;
  interestedPrograms: ProgramType[];
  concerns?: string;
  goals?: string;
  
  // Training Progress
  assignedTrainer?: string;
  enrollmentDate?: string;
  trainingStartDate?: string;
  trainingEndDate?: string;
  sessionsCompleted?: number;
  totalSessions?: number;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  lastContactedAt?: string;
  nextFollowUpDate?: string;
  
  // Notes & Activity
  notes: Note[];
  activities: Activity[];
}

export interface Note {
  id: string;
  leadId: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface Activity {
  id: string;
  leadId: string;
  type: 'status_change' | 'note_added' | 'email_sent' | 'call_made' | 'consultation' | 'session_completed';
  description: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  createdBy: string;
}

// Contact Form Types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dogName: string;
  dogBreed: string;
  dogAge: string;
  interestedPrograms: ProgramType[];
  concerns: string;
  goals: string;
  preferredContactMethod: 'email' | 'phone' | 'text';
  bestTimeToContact?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Dashboard Stats Types
export interface DashboardStats {
  totalLeads: number;
  newLeadsThisWeek: number;
  activeTraining: number;
  completedThisMonth: number;
  conversionRate: number;
  leadsByStatus: Record<LeadStatus, number>;
  leadsBySource: Record<LeadSource, number>;
  recentActivity: Activity[];
}

// User/Trainer Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'trainer' | 'staff';
  avatar?: string;
  createdAt: string;
}
