import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app.js';

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DB.replace('<password>', process.env.DB_PASSWORD), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to the database successfully!'))
  .catch((err) => console.log(err));

const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
  console.log('app running on :' + PORT);
});
