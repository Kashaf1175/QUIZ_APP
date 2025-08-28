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
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/quizzes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setTimerActive(true);
      });
  }, [id]);

  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNext();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const handleOptionSelect = (optionIdx) => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = optionIdx;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    setTimerActive(false);
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
      setTimeLeft(30);
      setTimerActive(true);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
          <p className="text-lg text-gray-600 font-medium">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const isExcellent = percentage >= 90;
    const isGood = percentage >= 70;
    const isAverage = percentage >= 50;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="mb-4">
            {isExcellent && (
              <div className="text-4xl mb-3">🎉</div>
            )}
            {isGood && !isExcellent && (
              <div className="text-4xl mb-3">👏</div>
            )}
            {isAverage && !isGood && (
              <div className="text-4xl mb-3">👍</div>
            )}
            {!isAverage && (
              <div className="text-4xl mb-3">📚</div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Quiz Completed!
          </h2>
          
          <div className="mb-6">
            <div className="text-3xl font-bold mb-2 text-gray-800">
              {score} / {quiz.questions.length}
            </div>
            <div className="text-lg text-gray-600 mb-3">
              {percentage}% Correct
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                  isExcellent ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  isGood ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                  isAverage ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  'bg-gradient-to-r from-red-400 to-red-600'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-gray-600">
              {isExcellent && "Outstanding performance! 🌟"}
              {isGood && !isExcellent && "Great job! Well done! 💪"}
              {isAverage && !isGood && "Good effort! Keep practicing! 📖"}
              {!isAverage && "Don't give up! Try again! 💪"}
            </p>
          </div>
          
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={() => navigate("/quizzes")}
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  const q = quiz.questions[current];
  const progress = ((current + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto pt-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {quiz.title}
          </h1>
          <p className="text-gray-600 text-sm">
            Question {current + 1} of {quiz.questions.length}
          </p>
        </div>

        {/* Timer */}
        <div className="mb-6">
          <div className="flex items-center justify-center mb-2">
            <div className={`text-lg font-bold px-3 py-1 rounded-full ${
              timeLeft <= 10 ? 'bg-red-100 text-red-600' : 
              timeLeft <= 20 ? 'bg-yellow-100 text-yellow-600' : 
              'bg-green-100 text-green-600'
            }`}>
              ⏰ {timeLeft}s
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
            <div 
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center mt-2 text-xs text-gray-500 font-medium">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3">
                {current + 1}
              </div>
              <h2 className="text-lg font-bold text-gray-800">Question</h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed pl-9">
              {q.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2 mb-6">
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                className={`block w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                  answers[current] === idx
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-500 shadow-md"
                    : "bg-gray-50 hover:bg-blue-50 border-gray-200 hover:border-blue-300 text-gray-700"
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                    answers[current] === idx
                      ? "border-white bg-white"
                      : "border-gray-300"
                  }`}>
                    {answers[current] === idx && (
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{opt}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {answers[current] !== undefined ? "Answer selected ✓" : "Please select an answer"}
            </div>
            <button
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                answers[current] === undefined
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-md hover:shadow-lg"
              }`}
              onClick={handleNext}
              disabled={answers[current] === undefined}
            >
              {current === quiz.questions.length - 1 ? "Finish Quiz" : "Next Question"}
              <span className="ml-1 text-xs">
                {current === quiz.questions.length - 1 ? "🏁" : "→"}
              </span>
            </button>
          </div>
        </div>

        {/* Question Navigation Dots */}
        <div className="flex justify-center space-x-1 mb-6">
          {quiz.questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                idx === current
                  ? "bg-blue-600 scale-125 ring-1 ring-blue-200"
                  : answers[idx] !== undefined
                  ? "bg-green-400"
                  : "bg-gray-300"
              }`}
              title={
                idx === current 
                  ? "Current question" 
                  : answers[idx] !== undefined 
                  ? "Answered" 
                  : "Not answered"
              }
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartQuiz;