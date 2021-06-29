import express from 'express';

import studentRoute from './routes/studentRouter.js';

const app = express();

app.use(express.json());

app.use('/api/v1/users', studentRoute);
app.use('/api/v1/questions');
// app.use('/api/v1/levels', levelRoute);

export default app;
