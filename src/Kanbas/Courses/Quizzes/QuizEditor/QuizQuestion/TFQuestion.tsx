import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export default function TFQuestion({ answers, setAnswers }: {
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
}) {
  const markCorrect = (id: string, value: boolean) => {
    const updatedAnswers = answers.map((answer) => {
      if (answer.id === id) {
        return { ...answer, isCorrect: value };
      }
      return { ...answer, isCorrect: !value };
    });
    setAnswers(updatedAnswers);
  };

  return (
    <div className="mb-4">
      {answers.map((answer) => (
        <div
          key={answer.id}
          className="d-flex align-items-center mb-2"
        >
          <span className={answer.isCorrect ? 'fw-bold text-success' : 'text-dark'}>
            {answer.isCorrect ? 'Correct Answer:' : 'Incorrect Answer:'}
          </span>

          <div className="col-3">
            <input
              type="text"
              value={answer.text}
              readOnly
              className={`form-control mx-2 ${answer.isCorrect ? 'bg-success' : 'bg-white'}`}
            />
          </div>

          <div className="ms-auto d-flex align-items-center">
            <FaCheck
              className={`mx-2 cursor-pointer ${answer.isCorrect ? 'text-success' : ''}`}
              onClick={() => markCorrect(answer.id, true)}
            />
            <FaTimes
              className={`mx-2 cursor-pointer ${!answer.isCorrect ? 'text-danger' : ''}`}
              onClick={() => markCorrect(answer.id, false)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
