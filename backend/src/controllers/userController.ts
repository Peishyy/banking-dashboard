import { Request, Response } from 'express';
import { pool } from '../db';

export const getUsers = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM users') as any[];
    res.json(rows);
  };
  
  export const getUserById = async (req: Request, res: Response) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]) as any[];
    res.json(rows[0]);
  };
  
