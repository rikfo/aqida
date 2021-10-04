import express from 'express';
import Lesson from '../models/lessonModel.js';
import Level from '../models/levelModel.js';
import Question from '../models/questionsModel.js';
import { catchAsync } from '../utils/catchAsync.js';

// global variables :
let numberOfTries = 1;

const getLevels = catchAsync(async (req, res) => {
  const levels = await Level.find({});

  res.json({
    levels,
  });
});

const getLevelById = catchAsync(async (req, res) => {
  const level = await Level.findOne({ level: req.params.lvl }).populate({
    path: 'lessons',
  });

  res.json({
    level,
  });
});

const getLessonBySlug = catchAsync(async (req, res) => {
  const lesson = await Lesson.findOne({ slug: req.params.slug }).populate({
    path: 'questions',
  });

  console.log(lesson.checkSuccess());

  res.json({
    lesson,
  });
});

const getQuestion = catchAsync(async (req, res) => {
  // const question = await Question.findOne({ _id: req.params.index });
  const lesson = await Lesson.findOne({ slug: req.params.slug });
  const question = lesson.getQuestion();

  res.json({
    question,
  });
});

const answerQuestion = catchAsync(async (req, res) => {
  const lesson = await Lesson.findOne({ slug: req.params.slug });
  const question = lesson.getQuestion();
  // hadchi bayn hhhhh
  if (numberOfTries > 0) {
    if (!question.checkAnswer(req.body.answer)) {
      res.json({
        status: 'failure',
        message: 'ما زالت لديك محاولة واحدة',
      });
      numberOfTries--;
    } else {
      // hna dakchi li glt lik drtha b updateOne for now
      await question.updateOne({ answered: true });
      if (lesson.checkSuccess()) await lesson.updateOne({ finished: true });

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
  getQuestion,
  //getLessonsOfLevel,
  getLevels,
  getLevelById,
  answerQuestion,
};
