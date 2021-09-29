import { catchAsync } from '../utils/catchAsync.js';
import Lesson from '../models/lessonModel.js';

const getAllLessons = catchAsync(async (req, res) => {
  const lessons = await Lesson.find();

  res.json({
    results: lessons.length,
    lessons: lessons,
  });
});

const getLessonBySlug = catchAsync(async (req, res) => {
  const lesson = await Lesson.find({ slug: req.params.slug });

  const vr = lesson.checkSuccess();
  console.log(vr);

  res.json({
    lesson,
  });
});

const createLesson = catchAsync(async (req, res) => {
  const lesson = await Lesson.create(req.body);

  res.json({
    lesson,
  });
});

// const getLesson()
export { getAllLessons, createLesson, getLessonBySlug };
