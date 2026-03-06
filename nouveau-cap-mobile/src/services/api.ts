import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { User, Task, JobApplication, Alert } from '../types';

// API Base URL - configurable for development/production
const API_BASE_URL = 'https://preview-chat-39e878c5-e9c2-41e9-ba8e-a97f58e2aadb.space.z.ai';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('auth_token');
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },

  async register(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<{ user: User; token: string }> {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/api/auth/logout');
    await SecureStore.deleteItemAsync('auth_token');
  },
};

// Onboarding API
export const onboardingAPI = {
  async save(data: Partial<User>): Promise<User> {
    const response = await api.post('/api/onboarding', data);
    return response.data;
  },

  async get(): Promise<Partial<User>> {
    const response = await api.get('/api/onboarding');
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  async getAll(): Promise<Task[]> {
    const response = await api.get('/api/tasks');
    return response.data;
  },

  async refresh(): Promise<Task[]> {
    const response = await api.post('/api/tasks/refresh');
    return response.data;
  },

  async update(id: string, updates: Partial<Task>): Promise<Task> {
    const response = await api.put(`/api/tasks/${id}`, updates);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/tasks/${id}`);
  },
};

// Applications API
export const applicationsAPI = {
  async getAll(): Promise<JobApplication[]> {
    const response = await api.get('/api/applications');
    return response.data;
  },

  async create(data: Omit<JobApplication, 'id' | 'createdAt'>): Promise<JobApplication> {
    const response = await api.post('/api/applications', data);
    return response.data;
  },

  async update(id: string, updates: Partial<JobApplication>): Promise<JobApplication> {
    const response = await api.put(`/api/applications/${id}`, updates);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/api/applications/${id}`);
  },
};

// Alerts API
export const alertsAPI = {
  async getAll(): Promise<Alert[]> {
    const response = await api.get('/api/alerts');
    return response.data;
  },

  async markRead(id: string): Promise<void> {
    await api.put(`/api/alerts/${id}/read`);
  },
};

// Chatbot API
export const chatbotAPI = {
  async sendMessage(message: string, context?: string): Promise<{ response: string }> {
    const response = await api.post('/api/chatbot', { message, context });
    return response.data;
  },
};

// AI CV API
export const cvAPI = {
  async optimize(cvContent: string, targetJob: string, keywords?: string[]): Promise<{
    optimizedCv: string;
    suggestions: string[];
    keywords: string[];
  }> {
    const response = await api.post('/api/ai/cv', {
      cvContent,
      targetJob,
      keywords,
    });
    return response.data;
  },

  async extractKeywords(jobUrl: string): Promise<string[]> {
    const response = await api.post('/api/extract-job-keywords', { url: jobUrl });
    return response.data.keywords;
  },
};

// Token management
export const tokenManager = {
  async save(token: string): Promise<void> {
    await SecureStore.setItemAsync('auth_token', token);
  },

  async get(): Promise<string | null> {
    return await SecureStore.getItemAsync('auth_token');
  },

  async remove(): Promise<void> {
    await SecureStore.deleteItemAsync('auth_token');
  },
};

// Language preference
export const languageManager = {
  async save(lang: 'fr' | 'en'): Promise<void> {
    await SecureStore.setItemAsync('language', lang);
  },

  async get(): Promise<'fr' | 'en'> {
    const lang = await SecureStore.getItemAsync('language');
    return (lang as 'fr' | 'en') || 'fr';
  },
};

export default api;
