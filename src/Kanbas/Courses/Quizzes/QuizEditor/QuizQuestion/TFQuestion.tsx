import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

export default function TFQuestion() {
  const [answers, setAnswers] = useState<Answer[]>([
    { id: 1, text: 'True', isCorrect: true },
    { id: 2, text: 'False', isCorrect: false },
  ]);

  const markCorrect = (id: number, value: boolean) => {
    setAnswers(
      answers.map((answer) => 
        answer.id === id
          ? { ...answer, isCorrect: value } 
          : { ...answer, isCorrect: !value } 
      )
    );
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
