import { Router, Request, Response } from 'express';
import pool from '../db/index.js';

const router = Router();

// GET /api/leads - Get all leads with filtering
router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, search, page = '1', limit = '20' } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    let query = `
      SELECT l.*, 
        COALESCE(json_agg(
          json_build_object('id', d.id, 'name', d.name, 'breed', d.breed, 'age', d.age, 'issues', d.issues)
        ) FILTER (WHERE d.id IS NOT NULL), '[]') as dogs
      FROM leads l
      LEFT JOIN dogs d ON l.id = d.lead_id
    `;
    
    const conditions: string[] = [];
    const params: (string | number)[] = [];
    let paramIndex = 1;

    if (status && status !== 'all') {
      conditions.push(`l.status = $${paramIndex}`);
      params.push(status as string);
      paramIndex++;
    }

    if (search) {
      conditions.push(`(
        l.first_name ILIKE $${paramIndex} OR 
        l.last_name ILIKE $${paramIndex} OR 
        l.email ILIKE $${paramIndex} OR
        d.name ILIKE $${paramIndex}
      )`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' GROUP BY l.id ORDER BY l.created_at DESC';
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(parseInt(limit as string), offset);

    const result = await pool.query(query, params);

    // Get total count
    let countQuery = 'SELECT COUNT(DISTINCT l.id) FROM leads l LEFT JOIN dogs d ON l.id = d.lead_id';
    if (conditions.length > 0) {
      countQuery += ' WHERE ' + conditions.join(' AND ');
    }
    const countResult = await pool.query(countQuery, params.slice(0, -2));
    const total = parseInt(countResult.rows[0].count);

    // Transform data
    const leads = result.rows.map(row => ({
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
      status: row.status,
      source: row.source,
      program: row.program,
      notes: row.notes,
      dogs: row.dogs,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    res.json({
      success: true,
      data: leads,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'Failed to fetch leads.',
    });
  }
});

// GET /api/leads/:id - Get single lead with details
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const leadResult = await pool.query(
      'SELECT * FROM leads WHERE id = $1',
      [id]
    );

    if (leadResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Lead not found.',
      });
    }

    const lead = leadResult.rows[0];

    // Get dogs
    const dogsResult = await pool.query(
      'SELECT * FROM dogs WHERE lead_id = $1',
      [id]
    );

    // Get activities
    const activitiesResult = await pool.query(
      `SELECT a.*, u.first_name as created_by_first_name, u.last_name as created_by_last_name
       FROM activities a
       LEFT JOIN users u ON a.created_by = u.id
       WHERE a.lead_id = $1
       ORDER BY a.created_at DESC`,
      [id]
    );

    res.json({
      success: true,
      data: {
        id: lead.id,
        firstName: lead.first_name,
        lastName: lead.last_name,
        email: lead.email,
        phone: lead.phone,
        status: lead.status,
        source: lead.source,
        program: lead.program,
        notes: lead.notes,
        createdAt: lead.created_at,
        updatedAt: lead.updated_at,
        dogs: dogsResult.rows.map(d => ({
          id: d.id,
          name: d.name,
          breed: d.breed,
          age: d.age,
          issues: d.issues,
        })),
        activities: activitiesResult.rows.map(a => ({
          id: a.id,
          type: a.type,
          description: a.description,
          createdBy: a.created_by_first_name ? `${a.created_by_first_name} ${a.created_by_last_name}` : null,
          createdAt: a.created_at,
        })),
      },
    });
  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'Failed to fetch lead.',
    });
  }
});

// PATCH /api/leads/:id - Update lead
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes, phone, program } = req.body;

    const updates: string[] = [];
    const params: (string | null)[] = [];
    let paramIndex = 1;

    if (status !== undefined) {
      updates.push(`status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }
    if (notes !== undefined) {
      updates.push(`notes = $${paramIndex}`);
      params.push(notes);
      paramIndex++;
    }
    if (phone !== undefined) {
      updates.push(`phone = $${paramIndex}`);
      params.push(phone);
      paramIndex++;
    }
    if (program !== undefined) {
      updates.push(`program = $${paramIndex}`);
      params.push(program);
      paramIndex++;
    }

    if (updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No updates provided',
        message: 'Please provide fields to update.',
      });
    }

    updates.push(`updated_at = NOW()`);
    params.push(id as string);

    const result = await pool.query(
      `UPDATE leads SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      params
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Lead not found.',
      });
    }

    const lead = result.rows[0];

    res.json({
      success: true,
      data: {
        id: lead.id,
        firstName: lead.first_name,
        lastName: lead.last_name,
        email: lead.email,
        phone: lead.phone,
        status: lead.status,
        source: lead.source,
        program: lead.program,
        notes: lead.notes,
        createdAt: lead.created_at,
        updatedAt: lead.updated_at,
      },
      message: 'Lead updated successfully.',
    });
  } catch (error) {
    console.error('Update lead error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'Failed to update lead.',
    });
  }
});

// DELETE /api/leads/:id - Delete lead
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM leads WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Not found',
        message: 'Lead not found.',
      });
    }

    res.json({
      success: true,
      message: 'Lead deleted successfully.',
    });
  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'Failed to delete lead.',
    });
  }
});

export default router;
