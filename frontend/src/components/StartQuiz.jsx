import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const StartQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/quizzes/${id}`)
      .then((res) => res.json())
      .then((data) => setQuiz(data));
  }, [id]);

  const handleOptionSelect = (optionIdx) => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = optionIdx;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    } else {
      // Calculate score
      let correct = 0;
      quiz.questions.forEach((q, idx) => {
        if (answers[idx] === q.answer) correct++;
      });
      setScore(correct);
      setShowResult(true);
    }
  };

  if (!quiz) {
    return (
      <div className="max-w-xl mx-auto mt-10 text-center text-gray-500">
        Loading quiz...
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg mb-4">
          Your Score: {score} / {quiz.questions.length}
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/quizzes")}
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  const q = quiz.questions[current];

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
      <h2 className="text-xl font-bold mb-4">{quiz.title}</h2>
      <div className="mb-6">
        <div className="font-semibold mb-2">
          Question {current + 1} of {quiz.questions.length}
        </div>
        <div className="mb-4">{q.question}</div>
        <div className="space-y-2">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(idx)}
              className={`block w-full text-left px-4 py-2 rounded border ${
                answers[current] === idx
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 hover:bg-blue-100"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        onClick={handleNext}
        disabled={answers[current] === undefined}
      >
        {current === quiz.questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default StartQuiz;