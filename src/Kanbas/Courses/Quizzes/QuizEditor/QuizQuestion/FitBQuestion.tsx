import React, { useState } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export default function FitBQuestion() {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const addAnswer = () => {
    const newAnswer: Answer = { id: Date.now(), text: '', isCorrect: false };
    setAnswers([...answers, newAnswer]);
  };
  const updateAnswer = (id: number, text: string) => {
    setAnswers(
      answers.map((answer) => 
        answer.id === id ? { ...answer, text } : answer
      )
    );
  };
  const markCorrect = (id: number) => {
    setAnswers(
      answers.map((answer) => 
        answer.id === id ? { ...answer, isCorrect: true } : answer
      )
    );
  };

  const deleteAnswer = (id: number) => {
    setAnswers(answers.filter((answer) => answer.id !== id));
  };

  return (
    <div className="mb-4">
      {answers.map((answer) => (
        <div 
          key={answer.id} 
          className="d-flex align-items-center mb-2"
        >
          <span className={answer.isCorrect ? 'fw-bold text-success' : 'text-dark'}>
            {answer.isCorrect ? 'Correct Answer:' : 'Possible Answer:'}
          </span>
          
          <div className="col-3">
            <input
              type="text"
              value={answer.text}
              onChange={(e) => updateAnswer(answer.id, e.target.value)}
              className={`form-control mx-2 ${answer.isCorrect ? 'bg-success' : 'bg-white'}`}
            />
          </div>
          
          <div className="ms-auto d-flex align-items-center">
            <FaTrash
              className="mx-2 cursor-pointer"
              onClick={() => deleteAnswer(answer.id)}
            />
            <FaCheck
              className="mx-2 text-success cursor-pointer"
              onClick={() => markCorrect(answer.id)}
            />
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center">
        <button
          onClick={addAnswer}
          className="btn btn-outline-danger mt-3"
        >
          + Add Another Answer
        </button>
      </div>
    </div>
  );
}