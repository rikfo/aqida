import express from 'express';
import Student from '../models/studentModel.js';
import { catchAsync } from '../utils/catchAsync.js';

const getAllStudents = catchAsync(async (req, res) => {
  const students = await Student.find();

  res.json({
    results: students.length,
    students,
  });
});

const getStudentById = catchAsync(async (req, res) => {
  //1) checking if the user exists
  const student = await Student.findOne(req.params._id);

  if (!student) {
    res.json({
      message: 'this user does not exist',
    });
  } else {
    res.json({
      student,
    });
  }
});

const updateStudentById = catchAsync(async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.user._id, req.body);

  //1) check if the user still exists
  if (!student) {
    res.json({
      message: 'the user no longer exists',
    });
  } else {
    res.json({
      student,
    });
  }
});

export { getAllStudents, getStudentById, updateStudentById };
