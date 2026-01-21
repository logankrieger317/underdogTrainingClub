import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, Plus, Phone, Mail, 
  ChevronDown, Eye, Edit, Trash2, ArrowUpDown
} from 'lucide-react';
import { Lead, LeadStatus } from '../../types';
import { useLeadStore } from '../../store/leadStore';

const statusColors: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-purple-100 text-purple-800',
  consultation_scheduled: 'bg-indigo-100 text-indigo-800',
  consultation_completed: 'bg-cyan-100 text-cyan-800',
  proposal_sent: 'bg-amber-100 text-amber-800',
  enrolled: 'bg-green-100 text-green-800',
  in_training: 'bg-emerald-100 text-emerald-800',
  training_completed: 'bg-teal-100 text-teal-800',
  follow_up: 'bg-orange-100 text-orange-800',
  lost: 'bg-gray-100 text-gray-800',
};

const statusLabels: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  consultation_scheduled: 'Consult Scheduled',
  consultation_completed: 'Consult Completed',
  proposal_sent: 'Proposal Sent',
  enrolled: 'Enrolled',
  in_training: 'In Training',
  training_completed: 'Completed',
  follow_up: 'Follow Up',
  lost: 'Lost',
};

// Mock data
const mockLeads: Lead[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '512-555-1234',
    status: 'new',
    source: 'website_form',
    interestedPrograms: ['puppy_power'],
    dogs: [{ id: '1', name: 'Max', breed: 'Golden Retriever', age: 6, size: 'large' }],
    notes: [],
    activities: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Davis',
    email: 'mike.davis@example.com',
    phone: '512-555-5678',
    status: 'consultation_scheduled',
    source: 'referral',
    interestedPrograms: ['foundations', 'private_training'],
    dogs: [{ id: '2', name: 'Bella', breed: 'German Shepherd', age: 18, size: 'large' }],
    notes: [],
    activities: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily.chen@example.com',
    phone: '512-555-9012',
    status: 'in_training',
    source: 'social_media',
    interestedPrograms: ['stay_and_train'],
    dogs: [{ id: '3', name: 'Charlie', breed: 'Labrador', age: 24, size: 'large' }],
    assignedTrainer: 'John Smith',
    trainingStartDate: new Date(Date.now() - 604800000).toISOString(),
    sessionsCompleted: 4,
    totalSessions: 12,
    notes: [],
    activities: [],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.w@example.com',
    phone: '512-555-3456',
    status: 'enrolled',
    source: 'phone',
    interestedPrograms: ['pack_life_community'],
    dogs: [{ id: '4', name: 'Luna', breed: 'Australian Shepherd', age: 12, size: 'medium' }],
    notes: [],
    activities: [],
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    updatedAt: new Date(Date.now() - 259200000).toISOString(),
  },
];

export function LeadsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | 'all'>(
    (searchParams.get('status') as LeadStatus) || 'all'
  );
  
  const { setLeads, setFilters, getFilteredLeads } = useLeadStore();

  useEffect(() => {
    // In production, fetch from API
    setLeads(mockLeads);
  }, [setLeads]);

  useEffect(() => {
    setFilters({
      status: selectedStatus === 'all' ? undefined : selectedStatus,
      search: searchQuery || undefined,
    });
  }, [selectedStatus, searchQuery, setFilters]);

  const filteredLeads = getFilteredLeads();

  const handleStatusChange = (status: LeadStatus | 'all') => {
    setSelectedStatus(status);
    if (status === 'all') {
      searchParams.delete('status');
    } else {
      searchParams.set('status', status);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
              <p className="text-sm text-gray-500">
                {filteredLeads.length} leads found
              </p>
            </div>
            <Link
              to="/admin/leads/new"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Lead
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search leads by name, email, or dog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusChange(e.target.value as LeadStatus | 'all')}
                className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="all">All Statuses</option>
                {Object.entries(statusLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <button className="inline-flex items-center gap-1 hover:text-gray-700">
                      Client & Dog
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Programs
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <button className="inline-flex items-center gap-1 hover:text-gray-700">
                      Created
                      <ArrowUpDown className="w-4 h-4" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold text-sm">
                            {lead.firstName[0]}{lead.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {lead.firstName} {lead.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {lead.dogs[0]?.name} • {lead.dogs[0]?.breed}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <a
                          href={`mailto:${lead.email}`}
                          className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600"
                        >
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </a>
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600"
                        >
                          <Phone className="w-4 h-4" />
                          {lead.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                        {statusLabels[lead.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {lead.interestedPrograms.slice(0, 2).map((program) => (
                          <span
                            key={program}
                            className="inline-flex px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {program.replace(/_/g, ' ')}
                          </span>
                        ))}
                        {lead.interestedPrograms.length > 2 && (
                          <span className="text-xs text-gray-500">
                            +{lead.interestedPrograms.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/leads/${lead.id}`}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/leads/${lead.id}/edit`}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No leads found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
