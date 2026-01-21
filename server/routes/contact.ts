import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// In-memory storage reference (would be shared with leads in production via database)
let leads: any[] = [];

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
      interestedPrograms,
      concerns,
      goals,
      preferredContactMethod,
      bestTimeToContact,
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !phone || !dogName) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Please fill in all required fields.',
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email',
        message: 'Please provide a valid email address.',
      });
    }

    // Create new lead from contact form
    const newLead = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      phone,
      status: 'new',
      source: 'website_form',
      interestedPrograms: interestedPrograms || [],
      concerns,
      goals,
      preferredContactMethod: preferredContactMethod || 'email',
      bestTimeToContact,
      dogs: [{
        id: uuidv4(),
        name: dogName,
        breed: dogBreed || 'Unknown',
        age: dogAge ? parseInt(dogAge) || 0 : 0,
        size: 'medium',
      }],
      notes: concerns || goals ? [{
        id: uuidv4(),
        content: `Initial inquiry:\nConcerns: ${concerns || 'N/A'}\nGoals: ${goals || 'N/A'}`,
        createdAt: new Date().toISOString(),
        createdBy: 'system',
      }] : [],
      activities: [{
        id: uuidv4(),
        type: 'status_change',
        description: 'Lead created from website contact form',
        metadata: { source: 'contact_form' },
        createdAt: new Date().toISOString(),
        createdBy: 'system',
      }],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In production, save to database
    leads.unshift(newLead);

    // In production, you might want to:
    // 1. Send confirmation email to the user
    // 2. Send notification to staff
    // 3. Integrate with email marketing service
    
    console.log(`📧 New lead received: ${firstName} ${lastName} - ${email}`);

    res.status(201).json({
      success: true,
      data: { leadId: newLead.id },
      message: 'Thank you! We\'ve received your information and will be in touch within 24 hours.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: 'Something went wrong. Please try again or call us directly at 512.669.5796.',
    });
  }
});

export default router;
