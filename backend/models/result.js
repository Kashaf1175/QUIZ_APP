// const mongoose = require('mongoose');
import mongoose from 'mongoose';


const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  score: Number,
  answers: [Number], // user's selected option indices
  attemptedAt: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', resultSchema);
export default Result;