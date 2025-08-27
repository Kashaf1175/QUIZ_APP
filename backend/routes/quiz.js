import express from 'express';
import Quiz from '../models/quiz.js';
import Result from '../models/result.js'; // Make sure this path is correct

const router = express.Router();

// Create a quiz
router.post('/', async (req, res) => {
  try {
    const { title, description, questions, createdBy } = req.body;
    const quiz = await Quiz.create({ title, description, questions, createdBy });
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'name role');
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Get quizzes by user
router.get('/my/:userId', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.params.userId });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Update (edit) a quiz by ID
router.put('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update quiz' });
  }
});

// Get a single quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// Delete a quiz by ID
router.delete('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

// Save quiz attempt and update stats
// router.post("/attempt", async (req, res) => {
//   try {
//     const { quizId, userId, score } = req.body;
//     console.log("Attempt received:", req.body);

//     // Save result
//     const result = await Result.create({ quizId, userId, score });

//     // Update quiz stats
//     const quiz = await Quiz.findById(quizId);
//     if (quiz) {
//       quiz.attempts += 1;
//       if (score > quiz.bestScore) {
//         quiz.bestScore = score;
//       }
//       await quiz.save();
//       console.log("Quiz updated:", quiz);
//     } else {
//       console.log("Quiz not found:", quizId);
//     }

//     res.json(result);
//   } catch (err) {
//     console.error("Error in /attempt:", err);
//     res.status(500).json({ error: "Failed to save result" });
//   }
// });

export default router;