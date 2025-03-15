import React, { useState, useEffect } from "react";
import "./AdminQuiz.css";

function AdminQuiz() {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [editIndex, setEditIndex] = useState(null); // Track editing question index

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    setQuestions(storedQuestions);
  }, []);

  const handleInputChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOrUpdateQuestion = () => {
    if (!question || options.some((opt) => !opt) || !correctAnswer) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const newQuestion = { question, options, correctAnswer };

    if (editIndex !== null) {
      // Update existing question
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = newQuestion;
      setQuestions(updatedQuestions);
      setEditIndex(null);
    } else {
      // Add new question
      setQuestions([...questions, newQuestion]);
    }

    localStorage.setItem("quizQuestions", JSON.stringify([...questions, newQuestion]));

    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  const handleEditQuestion = (index) => {
    const selectedQuestion = questions[index];
    setQuestion(selectedQuestion.question);
    setOptions([...selectedQuestion.options]);
    setCorrectAnswer(selectedQuestion.correctAnswer);
    setEditIndex(index);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    localStorage.setItem("quizQuestions", JSON.stringify(updatedQuestions));
  };

  const handleClearQuiz = () => {
    localStorage.removeItem("quizQuestions");
    setQuestions([]);
  };

  return (
    <div className="admin-quiz-container">
      <h2>Admin Quiz</h2>
      <input type="text" placeholder="Enter Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
      {options.map((opt, index) => (
        <input key={index} type="text" placeholder={`Option ${index + 1}`} value={opt} onChange={(e) => handleInputChange(index, e.target.value)} />
      ))}
      <input type="text" placeholder="Correct Answer" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} />
      
      <button onClick={handleAddOrUpdateQuestion}>{editIndex !== null ? "Update Question" : "Add Question"}</button>
      <button onClick={handleClearQuiz}>Clear Quiz</button>

      <h3>Existing Questions</h3>
      {questions.length > 0 ? (
        <ul>
          {questions.map((q, index) => (
            <li key={index}>
              <strong>{q.question}</strong>
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              <p>✅ Correct Answer: {q.correctAnswer}</p>
              <button onClick={() => handleEditQuestion(index)}>Edit</button>
              <button onClick={() => handleDeleteQuestion(index)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No questions added yet.</p>
      )}
    </div>
  );
}

export default AdminQuiz;
