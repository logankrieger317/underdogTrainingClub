import pool from './index.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function initializeDatabase() {
  const client = await pool.connect();
  
  try {
    // Read and execute schema
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await client.query(schema);
    console.log('✅ Database schema initialized');

    // Check if admin user exists
    const adminCheck = await client.query(
      'SELECT id FROM users WHERE email = $1',
      ['admin@underdogtrainingclub.com']
    );

    if (adminCheck.rows.length === 0) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await client.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, role) 
         VALUES ($1, $2, $3, $4, $5)`,
        ['admin@underdogtrainingclub.com', hashedPassword, 'Admin', 'User', 'admin']
      );
      
      console.log('✅ Default admin user created');
      console.log('   Email: admin@underdogtrainingclub.com');
      console.log('   Password: admin123');
    }

  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  } finally {
    client.release();
  }
}
