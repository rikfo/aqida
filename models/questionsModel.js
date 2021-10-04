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
  // mab9inach an7tajo hadi
  // numberOfTries: {
  //   type: Number,
  //   default: 2,
  // },
  answered: {
    type: Boolean,
    default: false,
  },
});

questionSchema.methods.checkAnswer = function (userAnswer) {
  //hadi method dyal verification
  if (this.type === 'insert') {
    if (userAnswer == this.correctAnswer[0]) {
      this.answered = true;
    } else {
      this.numberOfTries--;
    }
  } else {
    // hna atkon dik lmethod dyal dakchi lakhor
    // checkAnswer method for Checkbox, radiobutton and draganddrop
  }
  return this.answered;
};

const Question = mongoose.model('Question', questionSchema);

export default Question;
