import express from 'express';

import * as authController from '../controllers/authController.js';
import * as questionController from '../controllers/questionsController.js';

const router = express.Router();

router.post('/all', questionController.getAllQuestions);
router.post('/add-question', questionController.createQuestion);

export default router;
