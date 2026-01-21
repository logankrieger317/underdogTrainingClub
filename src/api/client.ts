import axios from 'axios';
import { ApiResponse, Lead, ContactFormData, DashboardStats, PaginatedResponse, LeadStatus } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth tokens
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Lead API
export const leadApi = {
  getAll: async (params?: {
    page?: number;
    pageSize?: number;
    status?: LeadStatus;
    search?: string;
  }): Promise<PaginatedResponse<Lead>> => {
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Lead>>>('/leads', { params });
    return response.data.data!;
  },

  getById: async (id: string): Promise<Lead> => {
    const response = await apiClient.get<ApiResponse<Lead>>(`/leads/${id}`);
    return response.data.data!;
  },

  create: async (data: Partial<Lead>): Promise<Lead> => {
    const response = await apiClient.post<ApiResponse<Lead>>('/leads', data);
    return response.data.data!;
  },

  update: async (id: string, data: Partial<Lead>): Promise<Lead> => {
    const response = await apiClient.patch<ApiResponse<Lead>>(`/leads/${id}`, data);
    return response.data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/leads/${id}`);
  },

  updateStatus: async (id: string, status: LeadStatus): Promise<Lead> => {
    const response = await apiClient.patch<ApiResponse<Lead>>(`/leads/${id}/status`, { status });
    return response.data.data!;
  },

  addNote: async (id: string, content: string): Promise<Lead> => {
    const response = await apiClient.post<ApiResponse<Lead>>(`/leads/${id}/notes`, { content });
    return response.data.data!;
  },
};

// Contact Form API (public)
export const contactApi = {
  submit: async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post<ApiResponse<{ leadId: string }>>('/contact', data);
    return { success: true, message: response.data.message || 'Form submitted successfully!' };
  },
};

// Dashboard API
export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data.data!;
  },
};

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<{ token: string; user: unknown }> => {
    const response = await apiClient.post<ApiResponse<{ token: string; user: unknown }>>('/auth/login', {
      email,
      password,
    });
    return response.data.data!;
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
    localStorage.removeItem('auth_token');
  },

  me: async (): Promise<unknown> => {
    const response = await apiClient.get<ApiResponse<unknown>>('/auth/me');
    return response.data.data!;
  },
};

export default apiClient;
