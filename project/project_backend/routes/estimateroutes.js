import express from 'express';
const router = express.Router();
import db from '../db/connection.js';

// API to fetch all estimates

router.get('/clients', (req, res) => {
    const sql = 'SELECT client_id, client_name FROM Clients';
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Failed to fetch clients' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  router.get('/departments', (req, res) => {
    const query = 'SELECT * FROM Departments';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching departments:', err);
        res.status(500).json({ error: 'Failed to fetch departments' });
      } else {
        res.json(results); // Send results to frontend
      }
    });
  });

  router.get('/contacts', (req, res) => {
    const query = 'SELECT contact_name FROM Contacts';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching contacts:', err);
            res.status(500).json({ error: 'Failed to fetch contacts' });
        } else {
            res.status(200).json(results);
        }
    });
});

router.get('/salespersons', (req, res) => {
    const query = 'SELECT sales_person_id, sales_person_name FROM SalesPersons';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching salespersons:', err);
            res.status(500).json({ error: 'Failed to fetch salespersons' });
        } else {
            res.json(results); // Send salesperson data to the frontend
        }
    });
});

router.get('/addresses', (req, res) => {
    const query = 'SELECT address_id, street, city, state, zip_code FROM Addresses';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching addresses:', err);
            res.status(500).json({ error: 'Failed to fetch addresses' });
        } else {
            res.json(results); // Send results to the frontend
        }
    });
});

router.get('/quotes', (req, res) => {
    const query = 'SELECT name FROM Quote';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching addresses:', err);
            res.status(500).json({ error: 'Failed to fetch addresses' });
        } else {
            res.json(results); // Send results to the frontend
        }
    });
});

  
    



export default router;