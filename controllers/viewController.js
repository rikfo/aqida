import express from 'express';
// import Student from '../models/studentModel.js';
import Lesson from '../models/lessonModel.js';
import Level from '../models/levelModel.js';
import Question from '../models/questionsModel.js';
import { catchAsync } from '../utils/catchAsync.js';

// global variables :
let numberOfTries = 2;

const getLevels = catchAsync(async (req, res) => {
  const levels = await Level.find({});

  res.json({
    levels,
  });
});

const getLevelById = catchAsync(async (req, res) => {
  const level = await Level.findById(req.params.id).populate({
    path: 'lessons',
  });

  res.json({
    level,
  });
});

// const getLessonsOfLevel = catchaAsync(async (req, res) => {
//   const lessons = await Lesson.find();
// });

const getLessonBySlug = catchAsync(async (req, res) => {
  const lesson = await Lesson.findOne({ slug: req.params.slug }).populate({
    path: 'questions',
  });

  console.log(lesson.checkSuccess());

  res.json({
    lesson,
  });
});

const getQuestionById = catchAsync(async (req, res) => {
  // const question = await Question.find({ _id: req.params.q_id });
  // const lesson = await Lesson.findOne({ slug: req.params.slug }).populate({
  //   path: 'questions',
  // });
  const question = await Question.findOne({ _id: req.params.index });

  res.json({
    question,
  });
});

const answerQuestion = catchAsync(async (req, res) => {
  const question = await Question.findOne({ _id: req.params.index });

  console.log(question.numberOfTries);
  console.log(numberOfTries);

  if (numberOfTries > 0) {
    if (!question.checkAnswer(req.body.answer)) {
      res.json({
        status: 'failure',
        message: 'ما زالت لديك محاولة واحدة',
      });
      numberOfTries--;
    } else {
      res.json({
        status: 'success',
        message: 'اخسنت',
      });
    }
  } else {
    res.json({
      status: 'failure',
      message: 'نفد عدد المحاولات المسموح بها',
    });
  }
});

export {
  getLessonBySlug,
  getQuestionById,
  //getLessonsOfLevel,
  getLevels,
  getLevelById,
  answerQuestion,
};
