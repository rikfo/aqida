import { catchAsync } from '../utils/catchAsync.js';
import Level from '../models/levelModel.js';

// const getLevel = catchAsync(async (req, res) => {
//   const level = Level.findById({ id: req.user.level });

//   res.json({
//     level,
//   });
// });

const getAllLevels = catchAsync(async (req, res) => {
  const levels = await Level.find();

  res.json({
    results: levels.length,
    levels,
  });
});

const createLevel = catchAsync(async (req, res) => {
  const level = await Level.create(req.body);

  res.json({
    level,
  });
});

const getLevelById = catchAsync(async (req, res, next) => {
  const level = await Level.findById(req.params.id);
  if (level.level > req.user.level.level) {
    return next(
      new Error(
        'you should finish the your current level in order to reach this level'
      )
    );
  }

  res.json({
    level,
  });
});

export { getAllLevels, createLevel, getLevelById };
