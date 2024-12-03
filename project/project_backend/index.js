import express from 'express';
import cors from 'cors';
import estimateRoutes from './routes/estimateroutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', estimateRoutes); // Routes prefixed with /api

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
