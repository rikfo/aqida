import express from 'express';

import * as authController from '../controllers/authController.js';
import {
  getAllStudents,
  getStudentById,
  updateStudentById,
} from '../controllers/usersController.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);

router.get('/all-students', getAllStudents);

export default router;
