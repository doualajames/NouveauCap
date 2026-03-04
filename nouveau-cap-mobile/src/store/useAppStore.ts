import { create } from 'zustand';
import { AppState, User, Task, JobApplication, Alert, Language } from '../types';

export const useAppStore = create<AppState>((set, get) => ({
  // Auth
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  // Language
  language: 'fr' as Language,

  // Data
  tasks: [],
  applications: [],
  alerts: [],

  // UI State
  activeModule: 'home',

  // Actions
  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),

  setToken: (token: string | null) => set({ token }),

  setLanguage: (language: Language) => set({ language }),

  setTasks: (tasks: Task[]) => set({ tasks }),

  addTask: (task: Task) => set((state) => ({
    tasks: [...state.tasks, task]
  })),

  updateTask: (id: string, updates: Partial<Task>) => set((state) => ({
    tasks: state.tasks.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    )
  })),

  addApplication: (app: JobApplication) => set((state) => ({
    applications: [...state.applications, app]
  })),

  updateApplication: (id: string, updates: Partial<JobApplication>) => set((state) => ({
    applications: state.applications.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    )
  })),

  setAlerts: (alerts: Alert[]) => set({ alerts }),

  markAlertRead: (id: string) => set((state) => ({
    alerts: state.alerts.map((a) =>
      a.id === id ? { ...a, isRead: true } : a
    )
  })),

  setActiveModule: (module: string) => set({ activeModule: module }),

  logout: () => set({
    user: null,
    token: null,
    isAuthenticated: false,
    tasks: [],
    applications: [],
    alerts: []
  })
}));
