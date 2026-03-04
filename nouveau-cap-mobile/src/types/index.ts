// NouveauCap Mobile - Types

export type Language = 'fr' | 'en';

export type ImmigrationStatus =
  | 'PERMANENT_RESIDENT'
  | 'FOREIGN_STUDENT'
  | 'OPEN_WORK_PERMIT'
  | 'CLOSED_WORK_PERMIT';

export type Province =
  | 'ON' | 'QC' | 'BC' | 'AB' | 'MB' | 'SK'
  | 'NS' | 'NB' | 'PE' | 'NL' | 'NT' | 'YT' | 'NU';

export type FamilyStatus = 'SINGLE' | 'COUPLE' | 'FAMILY_WITH_CHILDREN';

export interface User {
  id: string;
  email: string;
  name?: string;
  immigrationStatus?: ImmigrationStatus;
  province?: Province;
  city?: string;
  postalCode?: string;
  arrivalDate?: string;
  familyStatus?: FamilyStatus;
  countryOfOrigin?: string;
  preferredLanguage: Language;
  onboardingCompleted: boolean;
  subscriptionTier: 'FREE' | 'ESSENTIEL' | 'PREMIUM' | 'FAMILLE';
}

export interface Task {
  id: string;
  title: string;
  titleEn?: string;
  description?: string;
  category: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED';
  dueDate?: string;
  isRequired: boolean;
}

export interface Clinic {
  name: string;
  type: 'WALK_IN' | 'CLSC' | 'PRIVATE' | 'HOSPITAL' | 'COMMUNITY';
  address: string;
  phone: string;
  hours?: string;
  postalCode: string;
  city: string;
  distance?: number;
  services?: string[];
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: 'APPLIED' | 'INTERVIEW' | 'OFFER' | 'REJECTED' | 'WITHDRAWN';
  appliedDate?: string;
  notes?: string;
  createdAt: string;
}

export interface Alert {
  id: string;
  type: string;
  title: string;
  message: string;
  dueDate: string;
  isRead: boolean;
}

export interface AppState {
  // Auth
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Language
  language: Language;

  // Data
  tasks: Task[];
  applications: JobApplication[];
  alerts: Alert[];

  // UI State
  activeModule: string;

  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLanguage: (lang: Language) => void;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  addApplication: (app: JobApplication) => void;
  updateApplication: (id: string, updates: Partial<JobApplication>) => void;
  setAlerts: (alerts: Alert[]) => void;
  markAlertRead: (id: string) => void;
  setActiveModule: (module: string) => void;
  logout: () => void;
}
