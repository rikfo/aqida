import express from 'express';

import * as authController from '../controllers/authController.js';
import * as lessonsController from '../controllers/lessonsController.js';

const router = express.Router();

router.get('/', lessonsController.getAllLessons);
router.get('/:slug', lessonsController.getLessonBySlug);

router.post('/', lessonsController.createLesson);

// router.use(authController.protect);
// router.get('/:id', getLevelById);

export default router;
