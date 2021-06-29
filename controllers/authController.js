import { promisify } from 'util';

import crypro from 'crypto';
import jwt from 'jsonwebtoken';

import Student from '../models/studentModel.js';
import { catchAsync } from '../utils/catchAsync.js';

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  });
};

const signUp = catchAsync(async (req, res) => {
  const newStudent = await Student.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConf: req.body.passwordConf,
    motherLang: req.body.motherLang,
    birthday: req.body.birthday,
    from: req.body.from,
    quranMemorizitionQt: req.body.quranMemorizitionQt,
    hobby: req.body.hobby,
    about: req.body.about,
  });

  createSendToken(newStudent, 201, res);
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error('please provide an email and password!'));
  }

  const student = await Student.findOne({ eamil }).select('password');

  if (!student || !(await student.checkPassword(password, student.password))) {
    return next(new Error('email or password is incorrect!'));
  }

  createSendToken(student, 200, res);
});

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];
  else if (req.cookies.jwt) token = req.cookie.jwt;

  if (!token) {
    return next(new Error('you are not logger in'));
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await Student.findById(decoded.id);
  if (!freshUser) return next(new Error('the user no longer exists'));
  ///////////
  req.user = freashUser;
  res.locals.user = freshUser;
  next();
});

const restrictTo = (level) => {
  return (req, res, next) => {
    if (level < req.user.level)
      return next(
        new Error(
          'you should finish the your current level in order to reach this level'
        )
      );
    next();
  };
};

export { login, signUp, protect };
