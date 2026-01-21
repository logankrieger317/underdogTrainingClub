import { create } from 'zustand';
import { Lead, LeadStatus, DashboardStats } from '../types';

interface LeadFilters {
  status?: LeadStatus;
  search?: string;
  dateRange?: { start: string; end: string };
}

interface LeadStore {
  leads: Lead[];
  selectedLead: Lead | null;
  filters: LeadFilters;
  isLoading: boolean;
  stats: DashboardStats | null;
  
  // Actions
  setLeads: (leads: Lead[]) => void;
  addLead: (lead: Lead) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  selectLead: (lead: Lead | null) => void;
  setFilters: (filters: LeadFilters) => void;
  setLoading: (loading: boolean) => void;
  setStats: (stats: DashboardStats) => void;
  
  // Computed
  getFilteredLeads: () => Lead[];
  getLeadsByStatus: (status: LeadStatus) => Lead[];
}

export const useLeadStore = create<LeadStore>((set, get) => ({
  leads: [],
  selectedLead: null,
  filters: {},
  isLoading: false,
  stats: null,
  
  setLeads: (leads) => set({ leads }),
  
  addLead: (lead) => set((state) => ({ 
    leads: [lead, ...state.leads] 
  })),
  
  updateLead: (id, updates) => set((state) => ({
    leads: state.leads.map((lead) =>
      lead.id === id ? { ...lead, ...updates, updatedAt: new Date().toISOString() } : lead
    ),
    selectedLead: state.selectedLead?.id === id 
      ? { ...state.selectedLead, ...updates, updatedAt: new Date().toISOString() }
      : state.selectedLead,
  })),
  
  deleteLead: (id) => set((state) => ({
    leads: state.leads.filter((lead) => lead.id !== id),
    selectedLead: state.selectedLead?.id === id ? null : state.selectedLead,
  })),
  
  selectLead: (lead) => set({ selectedLead: lead }),
  
  setFilters: (filters) => set({ filters }),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setStats: (stats) => set({ stats }),
  
  getFilteredLeads: () => {
    const { leads, filters } = get();
    let filtered = [...leads];
    
    if (filters.status) {
      filtered = filtered.filter((lead) => lead.status === filters.status);
    }
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.firstName.toLowerCase().includes(search) ||
          lead.lastName.toLowerCase().includes(search) ||
          lead.email.toLowerCase().includes(search) ||
          lead.phone.includes(search) ||
          lead.dogs.some((dog) => dog.name.toLowerCase().includes(search))
      );
    }
    
    return filtered;
  },
  
  getLeadsByStatus: (status) => {
    const { leads } = get();
    return leads.filter((lead) => lead.status === status);
  },
}));
