import express from 'express';

import studentRoute from './routes/studentRouter.js';
import levelRoute from './routes/levelRouter.js';
import lessonRoute from './routes/lessonRouter.js';
import questionRoute from './routes/questionRouter.js';
import viewRoute from './routes/viewRouter.js';
import errorController from './controllers/errorController.js';

const app = express();

app.use(express.json());

app.use('/levels', viewRoute);
app.use('/api/v1/users', studentRoute);
app.use('/api/v1/questions', questionRoute);
app.use('/api/v1/levels', levelRoute);
app.use('/api/v1/lessons', lessonRoute);

app.use(errorController);

export default app;
