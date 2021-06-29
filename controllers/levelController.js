import catchAsync from '../utils/catchAsync.js';
import Level from '../models/levelModel';

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

export { getAllLevels, createLevel };
