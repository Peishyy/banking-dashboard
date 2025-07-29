import { Request, Response } from 'express';
import { pool } from '../db';

// ✅ Get all transactions (for dashboard)
export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query('SELECT * FROM transactions ORDER BY timestamp DESC');
    res.json(rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get user-specific transactions (for detail pages)
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM transactions WHERE sender_id = ? OR receiver_id = ? ORDER BY timestamp DESC',
      [req.params.userId, req.params.userId]
    );
    res.json(rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Transfer money
export const transferMoney = async (req: Request, res: Response) => {
  const { from, to, amount, note } = req.body;

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Check balance
    const [[sender]]: any = await connection.query(
      'SELECT balance FROM users WHERE id = ?',
      [from]
    );

    if (!sender || sender.balance < amount) {
      throw new Error('Insufficient funds or invalid sender');
    }

    // Deduct from sender
    await connection.query(
      'UPDATE users SET balance = balance - ? WHERE id = ?',
      [amount, from]
    );

    await connection.query(
      `INSERT INTO transactions 
       (sender_id, receiver_id, amount, type, note, timestamp) 
       VALUES (?, ?, ?, 'debit', ?, NOW())`,
      [from, to, amount, note]
    );

    // Add to receiver
    await connection.query(
      'UPDATE users SET balance = balance + ? WHERE id = ?',
      [amount, to]
    );

    await connection.query(
      `INSERT INTO transactions 
       (sender_id, receiver_id, amount, type, note, timestamp) 
       VALUES (?, ?, ?, 'credit', ?, NOW())`,
      [from, to, amount, note]
    );

    await connection.commit();
    res.json({ message: 'Transfer successful' });
  } catch (error: any) {
    await connection.rollback();
    res.status(400).json({ error: error.message });
  } finally {
    connection.release();
  }
};
