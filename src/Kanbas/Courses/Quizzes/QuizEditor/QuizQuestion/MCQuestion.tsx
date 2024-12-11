import React, { useState } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';

interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

export default function MCQuestion({ answers, updateAnswers, addAnswer, updateAnswer, deleteAnswer }: {
    answers: Answer[];
    updateAnswers: (answers: Answer[]) => void;
    addAnswer: () => void;
    updateAnswer: (answer: Answer) => void;
    deleteAnswer: (id: string) => void;
}) {
    const markCorrect = (id: string) => {
        const updatedAnswers = answers.map((answer) => {
            if (answer.id === id) {
                return { ...answer, isCorrect: true };
            }
            return { ...answer, isCorrect: false };
        });
        updateAnswers(updatedAnswers);
    };

    return (
        <div className="mb-4">
            {
                answers.map((answer) => {
                    return (
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
                                    onChange={(e) => updateAnswer({ ...answer, text: e.target.value }) }
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
                    );
                })
            }
            
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
