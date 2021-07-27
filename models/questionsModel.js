import mongoose from 'mongoose';

const question_tp = ['qcm', 'arrange', 'select'];

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  qtype: {
    type: String,
    default: function () {
      return question_tp[Math.round(Math.random * 3)];
    },
    enum: question_tp,
  },
  answer: {
    type: String,
    required: true,
  },
  answered: {
    type: Boolean,
    default: false,
  },
});

const Question = mongoose.model('Question', questionSchema);

export default Question;
