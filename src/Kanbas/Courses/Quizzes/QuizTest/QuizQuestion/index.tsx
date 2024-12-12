import * as Constants from "../../constants";
import FitBQuestion from "./FitBQuestion";
import MCQuestion from "./MCQuestion";
import TFQuestion from "./TFQuestion";

interface QuestionType {
    _id: string;
    qid: string;
    questionType: "Multiple Choice" | "True False" | "Fill in the Blank";
    title: string;
    points: number;
    question: string;
    properties: any;
}

interface QuizQuestionProps {
    question: QuestionType;
    currentAnswer: string;
    onAnswerChange: (answer: string) => void;
}

export default function QuizQuestion({ question, currentAnswer, onAnswerChange }: QuizQuestionProps) {
    // Renders the extra features depending on what the questionType is
    const renderQuizProperty = () => {
        let choices = question.properties?.choices || [];
        switch (question.questionType) {
            case Constants.MC:
                return (
                    <div>
                        {choices.map((choice: any) => {
                            const randomId = crypto.randomUUID();
                            return <div key={randomId} className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="mc-question"
                                    id={randomId}
                                    onChange={(_) => onAnswerChange(choice.text)}
                                    checked={choice.text === currentAnswer}
                                />
                                <label className="form-check-label" htmlFor={randomId}>
                                    {choice.text}
                                </label>
                            </div>
                        })}
                    </div>
                );
            case Constants.TF:
                return(
                    <div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="tf-question"
                                id="tf-true-answer"
                                onChange={(_) => onAnswerChange("true")}
                                checked={currentAnswer === "true"}
                            />
                            <label className="form-check-label" htmlFor={"tf-true-answer"}>
                                True
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="tf-question"
                                id="tf-false-answer"
                                onChange={(e) => onAnswerChange("false")}
                                checked={currentAnswer === "false"}
                            />
                            <label className="form-check-label" htmlFor="tf-false-answer">
                                False
                            </label>
                      </div>
                    </div>
                );
            case Constants.FITB:
                return (
                    <div>
                        <div className="form-check">
                            <input
                                className="form-control"
                                type="text"
                                onChange={(e) => onAnswerChange(e.target.value)}
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="card m-3">
                <div className="card-header">
                    <div className="row">
                        <div className="col-3">
                            <b>{question.title}</b>
                        </div>
                        <div className="col-3">
                            <b>{question.questionType}</b>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-2 d-flex">
                            <label htmlFor="wd-question-pts" className="form-label me-2 align-self-center">
                                <b>pts:</b>
                            </label>
                            <b>{question.points}</b>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
                <div className="card-body d-flex flex-column justify-content-start">
                    <b>Question:</b>
                    <p>{question.question}</p>
                    <b>Answer:</b>
                    {renderQuizProperty()}
                </div>
            </div>
        </div>
    );
}
