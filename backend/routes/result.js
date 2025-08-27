import express from 'express';
import Result from '../models/result.js';
import Quiz from '../models/quiz.js'; // <-- Add this line
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

router.post("/attempt", async (req, res) => {
  try {
    const { quizId, userId, score } = req.body;
    console.log("Attempt received:", req.body);

    // Save result
    const result = await Result.create({ quizId, userId, score });

    // Update quiz stats
    const quiz = await Quiz.findById(quizId);
    if (quiz) {
      quiz.attempts += 1;
      if (score > quiz.bestScore) {
        quiz.bestScore = score;
      }
      await quiz.save();
      console.log("Quiz updated:", quiz);
    } else {
      console.log("Quiz not found:", quizId);
    }

    res.json(result);
  } catch (err) {
    console.error("Error in /attempt:", err);
    res.status(500).json({ error: "Failed to save result" });
  }
});

// module.exports = router;
export default router;