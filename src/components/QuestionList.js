import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const response = await fetch("http://localhost:4000/questions");
    if (response.ok) {
      const data = await response.json();
      setQuestions(data);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDeleteQuestion = async (questionId) => {
    const response = await fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== questionId)
      );
    }
  };

  const handleUpdateCorrectAnswer = async (questionId, correctIndex) => {
    const response = await fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: correctIndex,
      }),
    });
    if (response.ok) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === questionId ? { ...question, correctIndex } : question
        )
      );
    }
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDeleteQuestion={handleDeleteQuestion}
            onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
