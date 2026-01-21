import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, UserPlus, GraduationCap, TrendingUp, 
  ArrowRight, Phone, Mail, Calendar 
} from 'lucide-react';
import { useLeadStore } from '../../store/leadStore';
import { LeadStatus } from '../../types';

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

// Mock data for demonstration
const mockStats = {
  totalLeads: 127,
  newLeadsThisWeek: 12,
  activeTraining: 23,
  completedThisMonth: 8,
  conversionRate: 68,
};

const mockRecentLeads = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@example.com',
    phone: '512-555-1234',
    status: 'new' as LeadStatus,
    dogs: [{ name: 'Max', breed: 'Golden Retriever', age: 6 }],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    firstName: 'Mike',
    lastName: 'Davis',
    email: 'mike@example.com',
    phone: '512-555-5678',
    status: 'consultation_scheduled' as LeadStatus,
    dogs: [{ name: 'Bella', breed: 'German Shepherd', age: 18 }],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Chen',
    email: 'emily@example.com',
    phone: '512-555-9012',
    status: 'in_training' as LeadStatus,
    dogs: [{ name: 'Charlie', breed: 'Labrador', age: 24 }],
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export function DashboardPage() {
  const { stats, setStats } = useLeadStore();

  useEffect(() => {
    // In production, this would fetch from the API
    setStats({
      totalLeads: mockStats.totalLeads,
      newLeadsThisWeek: mockStats.newLeadsThisWeek,
      activeTraining: mockStats.activeTraining,
      completedThisMonth: mockStats.completedThisMonth,
      conversionRate: mockStats.conversionRate,
      leadsByStatus: {} as Record<LeadStatus, number>,
      leadsBySource: {} as Record<string, number>,
      recentActivity: [],
    });
  }, [setStats]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CRM Dashboard</h1>
              <p className="text-sm text-gray-500">
                Manage your leads and track training progress
              </p>
            </div>
            <Link
              to="/admin/leads/new"
              className="btn-primary inline-flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Add Lead
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockStats.totalLeads}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">New This Week</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockStats.newLeadsThisWeek}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Training</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockStats.activeTraining}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900">
                  {mockStats.conversionRate}%
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Leads */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Leads
                  </h2>
                  <Link
                    to="/admin/leads"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {mockRecentLeads.map((lead) => (
                  <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {lead.firstName[0]}{lead.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {lead.firstName} {lead.lastName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {lead.dogs[0]?.name} • {lead.dogs[0]?.breed}
                          </p>
                          <div className="flex items-center gap-4 mt-2">
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-sm text-gray-500 hover:text-primary-600 inline-flex items-center gap-1"
                            >
                              <Mail className="w-4 h-4" />
                              {lead.email}
                            </a>
                            <a
                              href={`tel:${lead.phone}`}
                              className="text-sm text-gray-500 hover:text-primary-600 inline-flex items-center gap-1"
                            >
                              <Phone className="w-4 h-4" />
                              {lead.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
                        {statusLabels[lead.status]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Pipeline */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/admin/leads?status=new"
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <span className="font-medium text-blue-900">New Leads</span>
                  <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-sm font-semibold">
                    5
                  </span>
                </Link>
                <Link
                  to="/admin/leads?status=follow_up"
                  className="flex items-center justify-between p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  <span className="font-medium text-amber-900">Follow Ups Due</span>
                  <span className="bg-amber-200 text-amber-800 px-2 py-1 rounded-full text-sm font-semibold">
                    3
                  </span>
                </Link>
                <Link
                  to="/admin/calendar"
                  className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <span className="font-medium text-purple-900">Today's Sessions</span>
                  <span className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold">
                    4
                  </span>
                </Link>
              </div>
            </div>

            {/* Pipeline Overview */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Pipeline Overview
              </h2>
              <div className="space-y-4">
                {[
                  { status: 'new', count: 12, label: 'New Leads' },
                  { status: 'consultation_scheduled', count: 8, label: 'Consults Scheduled' },
                  { status: 'enrolled', count: 15, label: 'Enrolled' },
                  { status: 'in_training', count: 23, label: 'In Training' },
                ].map((item) => (
                  <div key={item.status}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-900">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-primary-500 rounded-full h-2"
                        style={{ width: `${(item.count / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Upcoming Consultations
              </h2>
              <div className="space-y-3">
                {[
                  { name: 'Sarah J.', time: 'Today, 2:00 PM' },
                  { name: 'Mike D.', time: 'Tomorrow, 10:00 AM' },
                  { name: 'Lisa M.', time: 'Wed, 3:30 PM' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
