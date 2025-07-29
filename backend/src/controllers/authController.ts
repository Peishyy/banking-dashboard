import { Request, Response } from 'express';
import { pool } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// ✅ Register User
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, accountType } = req.body;

  // Basic validation
  if (!name || !email || !password || !accountType) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // 1. Check if user already exists
    const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if ((existing as any[]).length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insert user into DB
    await pool.query(
      'INSERT INTO users (name, email, password, accountType, balance) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, accountType, 0]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err: any) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Login User
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const [[user]]: any = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '2h' });

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
