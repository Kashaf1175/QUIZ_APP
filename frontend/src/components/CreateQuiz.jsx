import React, { useState } from "react";
import { PlusCircle } from "lucide-react";

const CreateQuiz = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [
      { question: "", options: ["", "", "", ""], answer: 0 }
    ],
  });
  const [success, setSuccess] = useState(false);

  const handleQuizChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (idx, field, value) => {
    const updatedQuestions = quiz.questions.map((q, i) =>
      i === idx ? { ...q, [field]: value } : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIdx, oIdx, value) => {
    const updatedQuestions = quiz.questions.map((q, i) =>
      i === qIdx
        ? { ...q, options: q.options.map((opt, j) => (j === oIdx ? value : opt)) }
        : q
    );
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        { question: "", options: ["", "", "", ""], answer: 0 },
      ],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the quiz to your backend API
    setSuccess(true);
    setQuiz({
      title: "",
      description: "",
      questions: [{ question: "", options: ["", "", "", ""], answer: 0 }],
    });
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <PlusCircle className="h-7 w-7 text-blue-500" />
        Create New Quiz
      </h2>
      {success && (
        <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center">
          Quiz created successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Quiz Title</label>
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleQuizChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleQuizChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">Questions</h3>
        {quiz.questions.map((q, idx) => (
          <div key={idx} className="mb-6 border rounded p-4">
            <div className="mb-2">
              <label className="block font-semibold mb-1">Question {idx + 1}</label>
              <input
                type="text"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(idx, "question", e.target.value)
                }
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              {q.options.map((opt, oIdx) => (
                <div key={oIdx}>
                  <label className="block text-sm mb-1">Option {oIdx + 1}</label>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(idx, oIdx, e.target.value)
                    }
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Correct Answer
              </label>
              <select
                value={q.answer}
                onChange={(e) =>
                  handleQuestionChange(idx, "answer", Number(e.target.value))
                }
                className="border rounded px-3 py-2"
              >
                {q.options.map((_, oIdx) => (
                  <option key={oIdx} value={oIdx}>
                    Option {oIdx + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 mb-6"
        >
          + Add Question
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 font-semibold"
        >
          Create Quiz
        </button>
      </form>
    </div>
    );
};

export default CreateQuiz;