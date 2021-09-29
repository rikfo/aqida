import express from 'express';

import * as auth from '../controllers/authController.js';
import * as viewController from '../controllers/viewController.js';

const router = express.Router();

// router.use(auth.protect);
router.get('/', viewController.getLevels);
router.get('/:id', viewController.getLevelById);
router.get('/:id/lessons/:slug', viewController.getLessonBySlug);
router.get('/:id/lessons/:slug/:index', viewController.getQuestionById);
router.post('/:id/lessons/:slug/:index', viewController.answerQuestion);

export default router;
