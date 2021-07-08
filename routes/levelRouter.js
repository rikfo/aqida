import express from 'express';

import { getAllLevels, createLevel } from '../controllers/levelController.js';

const router = express.Router();

router.get('/', getAllLevels);
router.post('/', createLevel);

export default router;
