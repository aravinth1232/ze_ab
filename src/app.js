import express from 'express';
import cors from 'cors';
import companyRoutes from './routes/CompanyRoutes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running successfully');
});

app.get('/api', (req, res) => {
  res.send('api works');
});


app.use('/api', companyRoutes);






export default app;