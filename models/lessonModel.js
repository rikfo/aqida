import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    images: {
      type: String,
      required: true,
    },
  },
});

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;
