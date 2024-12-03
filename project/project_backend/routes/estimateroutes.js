import express from 'express';
const router = express.Router();
import db from '../db/connection.js';

// API to fetch all estimates
router.get('/estimates', (req, res) => {
  const sql = 'SELECT * FROM estimatesss';
  db.query(sql, (err, results) => {
    if (err) {
        console.error('Database query error:', err);
      res.status(500).json({ error: 'Database query failed' });
    } else {
        console.log('Query results:', results);
      res.json(results);
    }
  });
});

// API to add a new estimate
router.post('/submit-estimate', (req, res) => {
    console.log('Request body:', req.body); 
    const { client_name, estimate_title, customer_order_number, estimate_type, sales_person, estimated_date } = req.body;
  
    const query = `
      INSERT INTO estimatesss (client_name, estimate_title, customer_order_number, estimate_type, sales_person, estimated_date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    db.query(query, [client_name, estimate_title, customer_order_number, estimate_type, sales_person, estimated_date], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ message: 'Error inserting data' });
      } else {
        res.status(200).json({ message: 'Estimate created successfully' });
      }
    });
  });
export default router;