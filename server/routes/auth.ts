import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Mock users (replace with database in production)
const users = [
  {
    id: '1',
    email: 'admin@underdogtrainingclub.com',
    password: 'password123', // In production, use bcrypt!
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'trainer@underdogtrainingclub.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Smith',
    role: 'trainer',
    createdAt: new Date().toISOString(),
  },
];

// Mock sessions (replace with proper session/JWT management in production)
const sessions: Record<string, string> = {};

// POST /api/auth/login
router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Missing credentials',
      message: 'Email and password are required.',
    });
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Invalid credentials',
      message: 'Invalid email or password.',
    });
  }

  // Generate mock token
  const token = uuidv4();
  sessions[token] = user.id;

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    data: {
      token,
      user: userWithoutPassword,
    },
    message: 'Login successful',
  });
});

// POST /api/auth/logout
router.post('/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    delete sessions[token];
  }

  res.json({
    success: true,
    message: 'Logout successful',
  });
});

// GET /api/auth/me
router.get('/me', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'No token provided.',
    });
  }

  const token = authHeader.substring(7);
  const userId = sessions[token];

  if (!userId) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or expired token.',
    });
  }

  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'User not found.',
    });
  }

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    data: userWithoutPassword,
  });
});

export default router;
