import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
    default: 1,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  lesson: {
    type: mongoose.Schema.ObjectId,
    ref: 'Lesson',
  },
  questions: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Question',
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
  locked: {
    type: Boolean,
    default: true,
  },
});

// levelSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'questions',
//   });
//   next();
// });

const Level = mongoose.model('Level', levelSchema);

export default Level;
