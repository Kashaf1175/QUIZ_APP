import React, { useEffect, useState } from "react";
import { BookOpen, Trophy } from "lucide-react";

const mockQuizzes = [
  {
    id: 1,
    title: "General Knowledge",
    description: "Test your general knowledge skills.",
    attempts: 5,
    bestScore: 90,
  },
  {
    id: 2,
    title: "Mathematics Basics",
    description: "A quiz on basic math concepts.",
    attempts: 3,
    bestScore: 80,
  },
  {
    id: 3,
    title: "Science Facts",
    description: "How much do you know about science?",
    attempts: 2,
    bestScore: 70,
  },
];

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Replace this with an API call in production
    setQuizzes(mockQuizzes);
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="h-7 w-7 text-blue-500" />
        Available Quizzes
      </h2>
      {quizzes.length === 0 ? (
        <div className="text-gray-500">No quizzes available.</div>
      ) : (
        <ul className="space-y-6">
          {quizzes.map((quiz) => (
            <li
              key={quiz.id}
              className="border rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <div className="text-lg font-semibold">{quiz.title}</div>
                <div className="text-gray-600 mb-2">{quiz.description}</div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    <Trophy className="inline h-4 w-4 mr-1 text-yellow-500" />
                    Best Score: {quiz.bestScore}%
                  </span>
                  <span>
                    Attempts: {quiz.attempts}
                  </span>
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Start Quiz
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizList;
