import mongoose from 'mongoose';

const levelSchema = new mongoose.Schema({
  level: {
    type: Number,
    required: true,
    default: 1,
    unique: true,
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

const Level = mongoose.model('Level', levelSchema);

export default Level;
