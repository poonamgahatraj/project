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
    const query = 'SELECT sales_person_name FROM SalesPersons';
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

router.post('/create-estimate', (req, res) => {
  console.log('Received POST request to /api/create-estimate');
  const { basicDetails, estimateDetails, quoteDetails } = req.body;

  if (!basicDetails || !basicDetails.client) {
    return res.status(400).send('Client name is required');
  }
  
  // Begin Transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Insert into Clients
    db.query(
      'INSERT INTO Clients (client_name) VALUES (?)',
      [basicDetails.client],
      (err, clientResult) => {
        if (err) {
          console.error('Error inserting into Clients:', err);
          return db.rollback(() => {
            res.status(500).send('Internal Server Error');
          });
        }

        const clientId = clientResult.insertId;

        // Insert into Departments
        db.query(
          'INSERT INTO Departments (department_name, client_id) VALUES (?, ?)',
          [basicDetails.department, clientId],
          (err, departmentResult) => {
            if (err) {
              console.error('Error inserting into Departments:', err);
              return db.rollback(() => {
                res.status(500).send('Internal Server Error');
              });
            }

            const departmentId = departmentResult.insertId;

            // Insert into Contacts
            db.query(
              'INSERT INTO Contacts (contact_name, department_id) VALUES (?, ?)',
              [basicDetails.contact, departmentId],
              (err) => {
                if (err) {
                  console.error('Error inserting into Contacts:', err);
                  return db.rollback(() => {
                    res.status(500).send('Internal Server Error');
                  });
                }

                // Insert into SalesPersons
                db.query(
                  'INSERT INTO SalesPersons (sales_person_name, department_id) VALUES (?, ?)',
                  [basicDetails.salesperson, departmentId],
                  (err) => {
                    if (err) {
                      console.error('Error inserting into SalesPersons:', err);
                      return db.rollback(() => {
                        res.status(500).send('Internal Server Error');
                      });
                    }

                    // Insert into Addresses
                    db.query(
                      'INSERT INTO Addresses (city, client_id) VALUES (?, ?)',
                      [basicDetails.address, clientId],
                      (err) => {
                        if (err) {
                          console.error('Error inserting into Addresses:', err);
                          return db.rollback(() => {
                            res.status(500).send('Internal Server Error');
                          });
                        }

                        // Insert estimate-related details into existing tables
                        db.query(
                          'UPDATE Clients SET estimate_title = ?, customer_order_number = ?, estimated_date = ? WHERE client_id = ?',
                          [
                            estimateDetails.estimateTitle,
                            estimateDetails.orderNumber,
                            estimateDetails.date,
                            clientId,
                          ],
                          (err) => {
                            if (err) {
                              console.error('Error updating Clients with estimate details:', err);
                              return db.rollback(() => {
                                res.status(500).send('Internal Server Error');
                              });
                            }

                            // Insert quote-specific details into Quotes table
                            db.query(
                              'INSERT INTO Quotes (name) VALUES (?)',
                              [quoteDetails.quoteDescription],
                              (err) => {
                                if (err) {
                                  console.error('Error inserting into Quotes:', err);
                                  return db.rollback(() => {
                                    res.status(500).send('Internal Server Error');
                                  });
                                }

                                // Commit transaction if all queries are successful
                                db.commit((err) => {
                                  if (err) {
                                    console.error('Error committing transaction:', err);
                                    return db.rollback(() => {
                                      res.status(500).send('Internal Server Error');
                                    });
                                  }

                                  console.log('Estimate created successfully');
                                  res.status(201).send('Estimate created successfully!');
                                });
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});
    



export default router;