import { Router, Request, Response } from 'express';
import pool from '../db/index.js';

const router = Router();

// POST /api/contact - Submit contact form (public endpoint)
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      dogName,
      dogBreed,
      dogAge,
      issues,
      program,
      message,
    } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'First name, last name, and email are required.',
      });
    }

    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');

      // Create lead
      const leadResult = await client.query(
        `INSERT INTO leads (first_name, last_name, email, phone, program, notes, source, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [firstName, lastName, email, phone || null, program || null, message || null, 'website_form', 'new']
      );

      const leadId = leadResult.rows[0].id;

      // Create dog if provided
      if (dogName) {
        const issuesArray = issues ? (Array.isArray(issues) ? issues : [issues]) : [];
        await client.query(
          `INSERT INTO dogs (lead_id, name, breed, age, issues)
           VALUES ($1, $2, $3, $4, $5)`,
          [leadId, dogName, dogBreed || null, dogAge || null, issuesArray]
        );
      }

      // Create activity log
      await client.query(
        `INSERT INTO activities (lead_id, type, description)
         VALUES ($1, $2, $3)`,
        [leadId, 'form_submission', `Contact form submitted via website. Program interest: ${program || 'Not specified'}`]
      );

      await client.query('COMMIT');

      res.status(201).json({
        success: true,
        data: { id: leadId },
        message: 'Thank you! We\'ll be in touch within 24 hours.',
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'Something went wrong. Please try again or call us directly.',
    });
  }
});

export default router;
