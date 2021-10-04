import express from 'express';

import * as auth from '../controllers/authController.js';
import * as viewController from '../controllers/viewController.js';

const router = express.Router();

// router.use(auth.protect);
router.get('/', viewController.getLevels);
router.get('/:lvl', viewController.getLevelById);
router.get('/:lvl/lessons/:slug', viewController.getLessonBySlug);
router.get('/:lvl/lessons/:slug/test', viewController.getQuestion);
router.post('/:lvl/lessons/:slug/test', viewController.answerQuestion);

export default router;
