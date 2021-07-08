import mongoose from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  passwordConf: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "the password didn't match!",
    },
  },
  motherLang: {
    type: String,
    required: true,
    default: 'arabic',
  },
  birthday: {
    type: Date,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  joinedAt: {
    type: Date,
    default: Date.now(),
  },
  quranMemorizitionQt: {
    type: Number,
    default: 0,
  },
  hobby: String,
  about: String,
  level: {
    type: mongoose.Schema.ObjectId,
    ref: 'Level',
    default: '60e71c242ddb18684759a780',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConf = undefined;
  next();
});

studentSchema.post('save', async function (next) {
  this.populate({
    path: 'level',
    select: 'level',
  });
});

// studentSchema.pre('save',)
studentSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  this.populate({
    path: 'level',
    select: 'level completed questions',
  });
  next();
});

studentSchema.methods.checkPassword = async function (candPw, usrPw) {
  return await bcrypt.compare(candPw, usrPw);
};

const Student = mongoose.model('Student', studentSchema);

export default Student;
