import express from 'express';

import { getAllLevels, createLevel } from '../controllers/levelController.js';

const router = express.Router();

router.get('/', getAllLevels);

export default router;
