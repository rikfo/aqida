import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['insert', 'check', 'radioButton', 'dragdrop'],
  },
  chioces: [{ type: String }],
  correctAnswer: [
    {
      type: String,
      required: true,
    },
  ],
  numberOfTries: {
    type: Number,
    default: 2,
  },
  answered: {
    type: Boolean,
    default: false,
  },
});

questionSchema.methods.checkAnswer = function (userAnswer) {
  if (this.qtype === 'insert') {
    console.log('question type is ' + this.qtype);
    if (userAnswer === this.correctAnswer) {
      this.answered = true;
    } else {
      this.numberOfTries--;
    }
  } else {
    // checkAnswer method for Checkbox, radiobutton and draganddrop
  }
  return this.answered;
};

const Question = mongoose.model('Question', questionSchema);

export default Question;
