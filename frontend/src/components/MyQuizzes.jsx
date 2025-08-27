import React, { useEffect, useState } from "react";
import { BookOpen, Edit, Trash2 } from "lucide-react";

const mockMyQuizzes = [
  {
    id: 1,
    title: "JavaScript Basics",
    description: "A quiz for JS beginners.",
    attempts: 34,
    createdAt: "2024-06-01",
  },
  {
    id: 2,
    title: "React Fundamentals",
    description: "Test your React knowledge.",
    attempts: 21,
    createdAt: "2024-06-10",
  },
];

const MyQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Replace with API call in production
    setQuizzes(mockMyQuizzes);
  }, []);

  const handleEdit = (id) => {
    // Implement edit logic or navigation
    alert(`Edit quiz ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete logic or API call
    setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BookOpen className="h-7 w-7 text-blue-500" />
        My Quizzes
      </h2>
      {quizzes.length === 0 ? (
        <div className="text-gray-500">You have not created any quizzes yet.</div>
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
                  <span>Attempts: {quiz.attempts}</span>
                  <span>Created: {quiz.createdAt}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(quiz.id)}
                  className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-2 rounded hover:bg-yellow-500 transition"
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(quiz.id)}
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

};

export default MyQuizzes;
