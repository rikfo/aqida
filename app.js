import express from 'express';

import studentRoute from './routes/studentRouter.js';
import levelRoute from './routes/levelRouter.js';
import questionRoute from './routes/questionRouter.js';
import errorController from './controllers/errorController.js';

const app = express();

app.use(express.json());

app.use('/api/v1/users', studentRoute);
app.use('/api/v1/questions', questionRoute);
app.use('/api/v1/levels', levelRoute);

app.use(errorController);

export default app;
