import mongoose from 'mongoose';
import arabSlug from '../utils/arabSlug.js';

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

lessonSchema.methods.getQuestion = function () {
  return this.questions[0];
};

//method bayna ach tadir
lessonSchema.methods.checkSuccess = function () {
  this.finished = this.questions.every((qs) => {
    return qs.answered === true;
  });
  return this.finished;
};

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
