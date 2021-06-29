import catchAsync from '../utils/catchAsync.js';
import Question from '../models/questionsModel.js';

const getAllQuestions = catchAsync(async (req, res) => {
  const questions = await Question.find();

  res.json({
    results: questions.length,
    questions,
  });
});

const createQuestion = catchAsync(async (req, res) => {
  const question = await Question.create(req.body);

  res.json({
    question,
  });
});

// const getQuestion()
export { getAllQuestions, createQuestion };
