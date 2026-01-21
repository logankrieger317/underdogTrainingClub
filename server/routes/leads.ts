import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// In-memory storage (replace with database in production)
let leads: any[] = [
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
];

// GET /api/leads - List all leads
router.get('/', (req: Request, res: Response) => {
  const { page = 1, pageSize = 20, status, search } = req.query;
  
  let filtered = [...leads];
  
  if (status && status !== 'all') {
    filtered = filtered.filter(lead => lead.status === status);
  }
  
  if (search) {
    const searchLower = (search as string).toLowerCase();
    filtered = filtered.filter(lead =>
      lead.firstName.toLowerCase().includes(searchLower) ||
      lead.lastName.toLowerCase().includes(searchLower) ||
      lead.email.toLowerCase().includes(searchLower) ||
      lead.dogs.some((dog: any) => dog.name.toLowerCase().includes(searchLower))
    );
  }
  
  const start = (Number(page) - 1) * Number(pageSize);
  const paginated = filtered.slice(start, start + Number(pageSize));
  
  res.json({
    success: true,
    data: {
      data: paginated,
      total: filtered.length,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPages: Math.ceil(filtered.length / Number(pageSize)),
    },
  });
});

// GET /api/leads/:id - Get single lead
router.get('/:id', (req: Request, res: Response) => {
  const lead = leads.find(l => l.id === req.params.id);
  
  if (!lead) {
    return res.status(404).json({
      success: false,
      error: 'Lead not found',
    });
  }
  
  res.json({ success: true, data: lead });
});

// POST /api/leads - Create new lead
router.post('/', (req: Request, res: Response) => {
  const newLead = {
    id: uuidv4(),
    ...req.body,
    notes: [],
    activities: [{
      id: uuidv4(),
      type: 'status_change',
      description: 'Lead created',
      createdAt: new Date().toISOString(),
      createdBy: 'system',
    }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  leads.unshift(newLead);
  
  res.status(201).json({
    success: true,
    data: newLead,
    message: 'Lead created successfully',
  });
});

// PATCH /api/leads/:id - Update lead
router.patch('/:id', (req: Request, res: Response) => {
  const index = leads.findIndex(l => l.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Lead not found',
    });
  }
  
  leads[index] = {
    ...leads[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  
  res.json({
    success: true,
    data: leads[index],
    message: 'Lead updated successfully',
  });
});

// PATCH /api/leads/:id/status - Update lead status
router.patch('/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  const index = leads.findIndex(l => l.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Lead not found',
    });
  }
  
  const oldStatus = leads[index].status;
  leads[index] = {
    ...leads[index],
    status,
    updatedAt: new Date().toISOString(),
    activities: [
      {
        id: uuidv4(),
        type: 'status_change',
        description: `Status changed from ${oldStatus} to ${status}`,
        createdAt: new Date().toISOString(),
        createdBy: 'user',
      },
      ...leads[index].activities,
    ],
  };
  
  res.json({
    success: true,
    data: leads[index],
    message: 'Status updated successfully',
  });
});

// POST /api/leads/:id/notes - Add note to lead
router.post('/:id/notes', (req: Request, res: Response) => {
  const { content } = req.body;
  const index = leads.findIndex(l => l.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Lead not found',
    });
  }
  
  const note = {
    id: uuidv4(),
    leadId: req.params.id,
    content,
    createdAt: new Date().toISOString(),
    createdBy: 'user',
  };
  
  leads[index] = {
    ...leads[index],
    notes: [note, ...leads[index].notes],
    activities: [
      {
        id: uuidv4(),
        type: 'note_added',
        description: 'Note added',
        createdAt: new Date().toISOString(),
        createdBy: 'user',
      },
      ...leads[index].activities,
    ],
    updatedAt: new Date().toISOString(),
  };
  
  res.json({
    success: true,
    data: leads[index],
    message: 'Note added successfully',
  });
});

// DELETE /api/leads/:id - Delete lead
router.delete('/:id', (req: Request, res: Response) => {
  const index = leads.findIndex(l => l.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Lead not found',
    });
  }
  
  leads.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Lead deleted successfully',
  });
});

export default router;
