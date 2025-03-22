import React, { useState, useEffect } from "react";
import "./StudentQuiz.css";

function StudentQuiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Fetch questions from local storage (set in AdminQuiz)
    const storedQuestions = JSON.parse(localStorage.getItem("quizQuestions")) || [];
    setQuestions(storedQuestions);
  }, []);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    } else {
      alert(`Quiz completed! Your score: ${score}/${questions.length}`);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer before submitting.");
      return;
    }
    if (!isSubmitted) {
      const correctAnswer = questions[currentQuestionIndex].correctAnswer.trim().toLowerCase();
      const chosenAnswer = selectedAnswer.trim().toLowerCase();

      if (chosenAnswer === correctAnswer) {
        setScore(score + 1);
        alert("✅ Correct Answer!");
      } else {
        alert(`❌ Wrong Answer! The correct answer is: ${questions[currentQuestionIndex].correctAnswer}`);
      }
      setIsSubmitted(true);
    }
  };

  return (
    <div className="quiz-container">
      {questions.length > 0 ? (
        <>
          <h2>{questions[currentQuestionIndex].question}</h2>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedAnswer === option ? "selected" : ""}`}
                onClick={() => handleAnswerSelect(option)}
                disabled={isSubmitted} // Disable selecting after submission
              >
                {option}
              </button>
            ))}
          </div>
          <div className="button-container">
            <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button onClick={handleSkip}>Skip</button>
            <button onClick={handleSubmitAnswer} disabled={isSubmitted}>
              Submit Answer
            </button>
            <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
              Next
            </button>
          </div>
        </>
      ) : (
        <h2>No Questions Available</h2>
      )}
    </div>
  );
}

export default StudentQuiz;
