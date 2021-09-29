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
  lessons: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Lesson',
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
levelSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'lessons',
  });
  next();
});

const Level = mongoose.model('Level', levelSchema);

// levelSchema.methods.checkSuccess(){
//   if(this.lessons.every((qs) => {

//   }))
// }

export default Level;
