import express from 'express';
import Result from '../models/result.js';
const router = express.Router();

// Submit a quiz result
router.post('/', async (req, res) => {
  const { user, quiz, score, answers } = req.body;
  const result = await Result.create({ user, quiz, score, answers });
  res.json(result);
});

// Get results for a user
router.get('/user/:userId', async (req, res) => {
  const results = await Result.find({ user: req.params.userId }).populate('quiz');
  res.json(results);
});

// Get results for a quiz
router.get('/quiz/:quizId', async (req, res) => {
  const results = await Result.find({ quiz: req.params.quizId }).populate('user');
  res.json(results);
});

// module.exports = router;
export default router;