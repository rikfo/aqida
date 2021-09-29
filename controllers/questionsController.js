import { catchAsync } from '../utils/catchAsync.js';
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

// const answerQuestion = catchAsync(async (req, res) => {
//   const question = await Question.findById(req.params.q_id);

//   do {
//     if (!question.checkAnswer(req.body.answer)) {
//       res.json({
//         status: 'failure',
//         message: 'ما زالت لديك محاولة واحدة',
//       });
//     } else {
//       break;
//     }
//   } while (question.numberOfTries > 0);
//   res.json({
//     status: 'success',
//     message: 'اخسنت',
//   });
// });

// const getQuestion()
export { getAllQuestions, createQuestion };
