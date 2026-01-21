import { Router, Request, Response } from 'express';
import pool from '../db/index.js';

const router = Router();

// GET /api/dashboard/stats - Get dashboard statistics
router.get('/stats', async (req: Request, res: Response) => {
  try {
    // Get total leads
    const totalResult = await pool.query('SELECT COUNT(*) FROM leads');
    const totalLeads = parseInt(totalResult.rows[0].count);

    // Get leads by status
    const statusResult = await pool.query(`
      SELECT status, COUNT(*) as count 
      FROM leads 
      GROUP BY status
    `);

    const statusCounts: Record<string, number> = {};
    statusResult.rows.forEach(row => {
      statusCounts[row.status] = parseInt(row.count);
    });

    // Get new leads this week
    const weekResult = await pool.query(`
      SELECT COUNT(*) FROM leads 
      WHERE created_at >= NOW() - INTERVAL '7 days'
    `);
    const newThisWeek = parseInt(weekResult.rows[0].count);

    // Get new leads this month
    const monthResult = await pool.query(`
      SELECT COUNT(*) FROM leads 
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `);
    const newThisMonth = parseInt(monthResult.rows[0].count);

    // Calculate conversion rate (leads that became active_client)
    const activeClients = statusCounts['active_client'] || 0;
    const conversionRate = totalLeads > 0 ? Math.round((activeClients / totalLeads) * 100) : 0;

    res.json({
      success: true,
      data: {
        totalLeads,
        newThisWeek,
        newThisMonth,
        conversionRate,
        byStatus: {
          new: statusCounts['new'] || 0,
          contacted: statusCounts['contacted'] || 0,
          consultationScheduled: statusCounts['consultation_scheduled'] || 0,
          consultationCompleted: statusCounts['consultation_completed'] || 0,
          proposalSent: statusCounts['proposal_sent'] || 0,
          enrolled: statusCounts['enrolled'] || 0,
          activeClient: statusCounts['active_client'] || 0,
          completed: statusCounts['completed'] || 0,
          lost: statusCounts['lost'] || 0,
        },
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'Failed to fetch dashboard stats.',
    });
  }
});

// GET /api/dashboard/recent - Get recent leads
router.get('/recent', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT l.*, 
        COALESCE(json_agg(
          json_build_object('id', d.id, 'name', d.name, 'breed', d.breed)
        ) FILTER (WHERE d.id IS NOT NULL), '[]') as dogs
      FROM leads l
      LEFT JOIN dogs d ON l.id = d.lead_id
      GROUP BY l.id
      ORDER BY l.created_at DESC
      LIMIT 10
    `);

    const leads = result.rows.map(row => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
      status: row.status,
      program: row.program,
      dogs: row.dogs,
      createdAt: row.created_at,
    }));

    res.json({
      success: true,
      data: leads,
    });
  } catch (error) {
    console.error('Recent leads error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'Failed to fetch recent leads.',
    });
  }
});

export default router;
