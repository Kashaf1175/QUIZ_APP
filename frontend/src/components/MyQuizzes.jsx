import React, { useEffect, useState } from "react";
import { BookOpen, Edit, Trash2 } from "lucide-react";
import { useAuth } from "./AuthContext";
import { getMyQuizzes } from "../services/api";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

const MyQuizzes = () => {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getMyQuizzes(user._id || user.id).then(setQuizzes);
    }
  }, [user]);

  const handleEdit = (id) => {
    navigate(`/edit-quiz/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/quizzes/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete quiz");
      setQuizzes((prev) => prev.filter((quiz) => quiz._id !== id));
    } catch (err) {
      alert(err.message);
    }
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
              key={quiz._id}
              className="border rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <div className="text-lg font-semibold">{quiz.title}</div>
                <div className="text-gray-600 mb-2">{quiz.description}</div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>
                    Attempts: {quiz.attempts ?? 0}
                  </span>
                  <span>
                    Created: {quiz.createdAt ? new Date(quiz.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(quiz._id)}
                  className="flex items-center gap-1 bg-yellow-400 text-white px-3 py-2 rounded hover:bg-yellow-500 transition"
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(quiz._id)}
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
