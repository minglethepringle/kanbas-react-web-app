import { useEffect, useState } from "react";
import * as Constants from "../../constants";
import FitBQuestion from "./FitBQuestion";
import MCQuestion from "./MCQuestion";
import TFQuestion from "./TFQuestion";
import { useDispatch } from "react-redux";
import { FaCheck, FaTrash } from "react-icons/fa";
import { deleteQuestion } from "../../client";
import { FaPencil } from "react-icons/fa6";

interface QuestionType {
    _id: string,
    qid: string,
    questionType: "Multiple Choice" | "True False" | "Fill in the Blank",
    title: string,
    points: number,
    question: string,
    properties: any
}

interface QuizQuestionProps {
    question: QuestionType,
    updateQuestion: (q: any) => void,
    deleteQuestion: (qid: any) => void
}

interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

export default function QuizQuestion({ question, updateQuestion, deleteQuestion }: QuizQuestionProps) {
    const [answers, setAnswers] = useState<Answer[]>(question.properties?.choices || []);
    const [editing, setEditing] = useState(false);

    // Renders the prompt of the current question
    const renderPrompt = () => {
        switch (question.questionType) {
            case Constants.MC:
                return Constants.MC_PROMPT;
            case Constants.TF:
                return Constants.TF_PROMPT;
            case Constants.FITB:
                return Constants.FITB_PROMPT;
            default:
                return null;
        }
    };

    // Adds a new answer to the question
    const addAnswer = () => {
        let newAnswers;
        if (question.questionType === Constants.TF) {
            newAnswers = [{
                id: crypto.randomUUID(),
                text: "True",
                isCorrect: false
            }, {
                id: crypto.randomUUID(),
                text: "False",
                isCorrect: false
            }];
        } else {
            const newAnswer: Answer = { id: crypto.randomUUID(), text: "", isCorrect: false };
            newAnswers = [...answers, newAnswer];
        }
        setAnswers(newAnswers);
        updateQuestion({ ...question, properties: { choices: newAnswers } });
    };

    // Updates the answer object
    const updateAnswer = (answer: Answer) => {
        const newAnswers = answers.map((a) =>
            a.id === answer.id ? answer : a
        );
        
        setAnswers(newAnswers);
        updateQuestion({ ...question, properties: { choices: newAnswers } });
    };

    // Update the answers array
    const updateAnswers = (answers: Answer[]) => {
        setAnswers(answers);
        updateQuestion({ ...question, properties: { choices: answers } });
    };

    // Delete answer from the question
    const deleteAnswer = (id: string) => {
        const newAnswers = answers.filter((answer) => answer.id !== id);
        setAnswers(newAnswers);

        updateQuestion({ ...question, properties: { choices: newAnswers } });
    }

    // Renders the extra features depending on what the questionType is
    const renderQuizProperty = () => {
        switch (question.questionType) {
            case Constants.MC:
                return <MCQuestion editing={editing} answers={answers} updateAnswers={updateAnswers} addAnswer={addAnswer} updateAnswer={updateAnswer} deleteAnswer={deleteAnswer}/>
            case Constants.TF:
                return <TFQuestion editing={editing} answers={answers} updateAnswers={updateAnswers} />;
            case Constants.FITB:
                return <FitBQuestion editing={editing} answers={answers} updateAnswers={updateAnswers} addAnswer={addAnswer} updateAnswer={updateAnswer} deleteAnswer={deleteAnswer} />;
            default:
                return null;
        }
    };

    const changeQuestionType = (type: string) => {
        updateQuestion({ ...question, questionType: type });
        // Clear the answers when changing the question type
        if (type === Constants.TF) {
            setAnswers([
                { id: crypto.randomUUID(), text: "True", isCorrect: false },
                { id: crypto.randomUUID(), text: "False", isCorrect: false }
            ]);
        } else {
            setAnswers([]);
        }
    }
    
    return (
        <div>
            <div className="card m-3">
                <div className="card-header">
                    <div className="row">
                        <div className="col-3">
                            {editing ?
                                <input
                                    className="form-control"
                                    value={question.title}
                                    onChange={(e) => updateQuestion({ ...question, title: e.target.value })}
                                />
                                :
                                <b>{question.title}</b>
                            }
                        </div>
                        <div className="col-3">
                            {editing ?
                                <select
                                    className="form-select"
                                    value={question.questionType}
                                    onChange={(e) => changeQuestionType(e.target.value)}>
                                    <option selected value={Constants.MC}>
                                        Multiple Choice
                                    </option>
                                    <option value={Constants.TF}>True/False</option>
                                    <option value={Constants.FITB}>Fill in the Blank</option>
                                </select>
                                :
                                <b>Question Type: {question.questionType}</b>
                            }
                            
                        </div>
                        <div className="col-2"></div>
                        <div className="col-2 d-flex">
                            <label htmlFor="wd-question-pts" className="form-label me-2 align-self-center">
                                <b>pts:</b>
                            </label>
                            {
                                editing ?
                                    <input
                                        className="form-control"
                                        value={question.points}
                                        onChange={(e) => updateQuestion({ ...question, points: Number(e.target.value) })}
                                    />
                                    : <b>{question.points}</b>
                            }
                            
                        </div>
                        <div className="col-2">
                            <button className="btn btn-danger ms-3 float-end" onClick={() => deleteQuestion(question._id)}>
                                <FaTrash/>
                            </button>

                            {
                                !editing
                                ?
                                    <button className="btn btn-warning ms-3 float-end" onClick={() => setEditing(!editing)}>
                                        <FaPencil />
                                    </button>
                                    : <button className="btn btn-success ms-3 float-end" onClick={() => setEditing(!editing)}>
                                        <FaCheck />
                                    </button>
                            }
                            
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    {editing ? renderPrompt() : <></>}
                    <br />
                    <b>Question:</b>
                    {
                        editing
                        ? <textarea
                        className="form-control"
                        id="wd-description"
                        rows={4}
                        value={question.question}
                        onChange={(e) => updateQuestion({ ...question, question: e.target.value })}></textarea>
                        : <p>{question.question}</p>
                    }
                    
                    <b>Answers:</b>
                    {renderQuizProperty()}
                </div>
            </div>
        </div>
    );
}
