import { useEffect, useState } from "react";
import * as Constants from "./constants";
import FitBQuestion from "./FitBQuestion";
import MCQuestion from "./MCQuestion";
import TFQuestion from "./TFQuestion";
import { useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { deleteQuestion } from "../../client";

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
    const [answers, setAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        // Any time answers updates, update the question object
        updateQuestion({ ...question, properties: { choices: answers } });
    }, [answers]);

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
        if (question.questionType === Constants.TF) {
            setAnswers([{
                id: crypto.randomUUID(),
                text: "True",
                isCorrect: false
            }, {
                id: crypto.randomUUID(),
                text: "False",
                isCorrect: false
            }]);
        } else {
            const newAnswer: Answer = { id: crypto.randomUUID(), text: "", isCorrect: false };
            setAnswers([...answers, newAnswer]);
        }
    };

    // Updates the answer object
    const updateAnswer = (answer: Answer) => {
        setAnswers(
            answers.map((a) =>
                a.id === answer.id ? answer : a
            )
        );
    };

    // Delete answer from the question
    const deleteAnswer = (id: string) => {
        setAnswers(answers.filter((answer) => answer.id !== id));
    }

    // Renders the extra features depending on what the questionType is
    const renderQuizProperty = () => {
        switch (question.questionType) {
            case Constants.MC:
                return <MCQuestion answers={answers} setAnswers={setAnswers} addAnswer={addAnswer} updateAnswer={updateAnswer} deleteAnswer={deleteAnswer}/>
            case Constants.TF:
                return <TFQuestion answers={answers} setAnswers={setAnswers}/>;
            // case Constants.FITB:
            //     return <FitBQuestion />;
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
                            <input
                                className="form-control"
                                id="wd-name"
                                value={question.title}
                                onChange={(e) => updateQuestion({ ...question, title: e.target.value })}
                            />
                        </div>
                        <div className="col-3">
                            <select
                                className="form-select"
                                id="wd-group"
                                value={question.questionType}
                                onChange={(e) => changeQuestionType(e.target.value)}>
                                <option selected value={Constants.MC}>
                                    Multiple Choice
                                </option>
                                <option value={Constants.TF}>True/False</option>
                                <option value={Constants.FITB}>Fill in the Blank</option>
                            </select>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-2 d-flex">
                            <label htmlFor="wd-question-pts" className="form-label me-2 align-self-center">
                                <b>pts:</b>
                            </label>
                            <input
                                className="form-control"
                                id="wd-question-pts"
                                value={question.points}
                                onChange={(e) => updateQuestion({ ...question, points: Number(e.target.value) })}
                            />
                        </div>
                        <div className="col-1">
                            <button className="btn btn-danger ms-3 float-end" onClick={() => deleteQuestion(question._id)}>
                                <FaTrash/>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    {renderPrompt()}
                    <br />
                    <b>Question:</b>
                    <textarea
                        className="form-control"
                        id="wd-description"
                        rows={4}
                        value={question.question}
                        onChange={(e) => updateQuestion({ ...question, question: e.target.value })}></textarea>
                    <b>Answers:</b>
                    {renderQuizProperty()}
                </div>
            </div>
        </div>
    );
}
