import React, { useState } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';

interface Answer {
    id: number;
    text: string;
    isCorrect: boolean;
}

export default function MCQuestion({ answer, addAnswer, updateAnswer, deleteAnswer }: {
    answer: Answer;
    addAnswer: () => void;
    updateAnswer: (answer: Answer) => void;
    deleteAnswer: (id: number) => void;
}) {
    const markCorrect = () => {
        updateAnswer({ ...answer, isCorrect: answer.isCorrect });
    };

    return (
        <div className="mb-4">
            <div
                key={answer.id}
                className="d-flex align-items-center mb-2"
            >
                <span className={answer.isCorrect ? 'fw-bold text-success' : 'text-dark'}>
                    {answer.isCorrect ? 'Correct Answer:' : 'Possible Answer:'}
                </span>
                <div className="col-4">
                    <input
                        type="text"
                        value={answer.text}
                        onChange={(e) => updateAnswer(answer.id, e.target.value)}
                        className={`form-control mx-2 ${answer.isCorrect ? 'bg-success' : 'bg-white'}`}
                    />
                </div>
                <div className="ms-auto d-flex align-items-center">
                    {answer.isCorrect && <FaCheck className="text-success mx-2" />}
                    <input
                        type="radio"
                        name="correct-answer"
                        checked={answer.isCorrect}
                        onChange={() => markCorrect(answer.id)}
                        className="mx-2"
                    />
                    <FaTrash
                        className="mx-2 cursor-pointer"
                        onClick={() => deleteAnswer(answer.id)}
                    />
                </div>
            </div>
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
