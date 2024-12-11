import express from 'express';
import cors from 'cors';
import estimateRoutes from './routes/estimateroutes.js';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', methods: ['GET', 'POST'] }));
app.use(express.json());

// Routes
app.use('/api', estimateRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the API server');
});

// Start Server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
