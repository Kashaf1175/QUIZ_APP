// const mongoose = require('mongoose');
import mongoose from 'mongoose';


const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: Number, required: true } // index of correct option
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [questionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bestScore: { type: Number, default: 0 },  // Highest score any user got
  attempts: { type: Number, default: 0 },   // Number of attempts
}, { timestamps: true });


const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;