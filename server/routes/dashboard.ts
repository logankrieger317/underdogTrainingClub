import { Router, Request, Response } from 'express';

const router = Router();

// GET /api/dashboard/stats - Get dashboard statistics
router.get('/stats', (req: Request, res: Response) => {
  // In production, these would be calculated from the database
  const stats = {
    totalLeads: 127,
    newLeadsThisWeek: 12,
    activeTraining: 23,
    completedThisMonth: 8,
    conversionRate: 68,
    leadsByStatus: {
      new: 15,
      contacted: 8,
      consultation_scheduled: 12,
      consultation_completed: 7,
      proposal_sent: 5,
      enrolled: 18,
      in_training: 23,
      training_completed: 32,
      follow_up: 4,
      lost: 3,
    },
    leadsBySource: {
      website_form: 45,
      phone: 28,
      referral: 32,
      social_media: 15,
      walk_in: 5,
      other: 2,
    },
    recentActivity: [
      {
        id: '1',
        type: 'status_change',
        description: 'Sarah Johnson moved to "Enrolled"',
        createdAt: new Date().toISOString(),
        createdBy: 'John Smith',
      },
      {
        id: '2',
        type: 'note_added',
        description: 'Note added to Mike Davis',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        createdBy: 'Jane Doe',
      },
      {
        id: '3',
        type: 'session_completed',
        description: 'Training session completed for Emily Chen',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        createdBy: 'John Smith',
      },
    ],
  };

  res.json({ success: true, data: stats });
});

// GET /api/dashboard/pipeline - Get pipeline data
router.get('/pipeline', (req: Request, res: Response) => {
  const pipeline = {
    stages: [
      { id: 'new', label: 'New Leads', count: 15, value: 0 },
      { id: 'contacted', label: 'Contacted', count: 8, value: 0 },
      { id: 'consultation', label: 'Consultation', count: 12, value: 0 },
      { id: 'proposal', label: 'Proposal', count: 5, value: 7500 },
      { id: 'enrolled', label: 'Enrolled', count: 18, value: 27000 },
      { id: 'training', label: 'In Training', count: 23, value: 34500 },
    ],
    totalValue: 69000,
    avgDealSize: 1500,
  };

  res.json({ success: true, data: pipeline });
});

// GET /api/dashboard/activity - Get recent activity feed
router.get('/activity', (req: Request, res: Response) => {
  const { limit = 20 } = req.query;

  const activities = [
    {
      id: '1',
      leadId: '1',
      leadName: 'Sarah Johnson',
      type: 'status_change',
      description: 'Status changed to "Enrolled"',
      createdAt: new Date().toISOString(),
      createdBy: 'John Smith',
    },
    {
      id: '2',
      leadId: '2',
      leadName: 'Mike Davis',
      type: 'note_added',
      description: 'Follow-up note added',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      createdBy: 'Jane Doe',
    },
    {
      id: '3',
      leadId: '3',
      leadName: 'Emily Chen',
      type: 'session_completed',
      description: 'Session 4 of 12 completed',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      createdBy: 'John Smith',
    },
    {
      id: '4',
      leadId: '4',
      leadName: 'David Wilson',
      type: 'email_sent',
      description: 'Welcome email sent',
      createdAt: new Date(Date.now() - 10800000).toISOString(),
      createdBy: 'System',
    },
  ].slice(0, Number(limit));

  res.json({ success: true, data: activities });
});

export default router;
