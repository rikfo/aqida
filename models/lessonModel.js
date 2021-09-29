import mongoose from 'mongoose';
import arabSlug from '../utils/arabSlug.js';
// import Question from './questionsModel.js';

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  questions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
      required: true,
      min: 1,
    },
  ],
  finished: {
    type: Boolean,
    default: false,
  },
  locked: {
    type: Boolean,
    default: true,
  },
  slug: String,
});

lessonSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'questions',
  });
  next();
});

lessonSchema.pre('save', function (next) {
  this.slug = arabSlug(this.title);
  next();
});

lessonSchema.methods.checkSuccess = function () {
  if (
    this.questions.every((qs) => {
      qs.answered === true;
    })
  )
    this.finished = true;
  return this.finished;
};

// lessonSchema.methods.getQuestionByIndex = function (index) {
//   return this.questions[index - 1];
// };

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
