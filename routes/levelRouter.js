import express from 'express';

import * as authController from '../controllers/authController.js';
import {
  getAllLevels,
  createLevel,
  getLevelById,
} from '../controllers/levelController.js';

const router = express.Router();

router.get('/', getAllLevels);
router.post('/', createLevel);

router.use(authController.protect);
router.get('/:id', getLevelById);

export default router;
