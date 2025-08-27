import React, { useEffect, useState } from "react";
import { BookOpen, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch quizzes created by admin from backend
    fetch(`${API_URL}/quizzes`)
      .then((res) => res.json())
      .then((data) => {
        // Filter quizzes where createdBy.role === 'admin'
        const adminQuizzes = data.filter(
          (quiz) => quiz.createdBy && quiz.createdBy.role === "admin"
        );
        setQuizzes(adminQuizzes);
      })
      .catch(() => setQuizzes([]));
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
              key={quiz._id}
              className="border rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <div className="text-lg font-semibold">{quiz.title}</div>
                <div className="text-gray-600 mb-2">{quiz.description}</div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    <Trophy className="inline h-4 w-4 mr-1 text-yellow-500" />
                    {/* You can fetch and display bestScore if available */}
                    Best Score: {quiz.bestScore ?? "N/A"}%
                  </span>
                  <span>Attempts: {quiz.attempts ?? 0}</span>
                </div>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => navigate(`/start-quiz/${quiz._id}`)}
              >
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
