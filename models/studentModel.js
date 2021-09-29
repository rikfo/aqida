import mongoose from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import Level from './levelModel.js';

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
  image: {
    type: String,
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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpiration: Date,
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  motherLang: {
    type: String,
    required: true,
    default: 'arabic',
  },
  age: {
    type: Number,
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
  quranMemorizationQt: {
    type: Number,
    default: 0,
  },
  hobby: String,
  about: String,
  level: {
    type: mongoose.Schema.ObjectId,
    ref: 'Level',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  activated: {
    type: Boolean,
    default: false,
  },
});

studentSchema.methods.initializeStedentLevel = async () => {
  const level = await Level.find({ level: 1 });
  return level;
};

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConf = undefined;

  next();
});

studentSchema.pre('save', async function (next) {
  const level = await this.initializeStedentLevel();
  this.level = level[0]._id;
  next();
});

studentSchema.post('save', function () {
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
    select: 'level',
  });
  next();
});

studentSchema.methods.checkPassword = async function (candPw, usrPw) {
  return await bcrypt.compare(candPw, usrPw);
};

const Student = mongoose.model('Student', studentSchema);

export default Student;
