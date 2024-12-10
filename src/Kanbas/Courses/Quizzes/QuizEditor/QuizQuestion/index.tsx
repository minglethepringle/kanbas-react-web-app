import { useState } from "react";
import * as Constants from "./constants";
import FitBQuestion from "./FitBQuestion";
import MCQuestion from "./MCQuestion";
import TFQuestion from "./TFQuestion";

export default function QuizQuestion() {
    // TODO: Need to make sure the state gets saved when you switch between "Details and Question", maybe look at the DetailsEditor example?
    // TODO: Grab the properties from each Question and populate it (existingQuiz example)
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionType, setQuestionType] = useState(Constants.MC);
    const [questionPoints, setQuestionPoints] = useState(1);
    const [questionDescription, setQuestionDescription] = useState("");

    // Renders the prompt of the current question
    const renderPrompt = () => {
        switch (questionType) {
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
    // Renders the extra features depending on what the quiz is
    const renderQuizProperty = () => {
        switch (questionType) {
            case Constants.MC:
                return <MCQuestion />;
            case Constants.TF:
                return <TFQuestion />;
            case Constants.FITB:
                return <FitBQuestion />;
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
                            <input
                                className="form-control"
                                id="wd-name"
                                value={questionTitle}
                                onChange={(e) => setQuestionTitle(e.target.value)}
                            />
                        </div>
                        <div className="col-3">
                            <select
                                className="form-select"
                                id="wd-group"
                                value={questionType}
                                onChange={(e) => setQuestionType(e.target.value)}>
                                <option selected value={Constants.MC}>
                                    Multiple Choice
                                </option>
                                <option value={Constants.TF}>True/False</option>
                                <option value={Constants.FITB}>Fill In the Blank</option>
                            </select>
                        </div>
                        <div className="col-4" />
                        <div className="col-2 d-flex">
                            <label htmlFor="wd-question-pts" className="form-label me-2 align-self-center">
                                <b>pts:</b>
                            </label>
                            <input
                                className="form-control"
                                id="wd-question-pts"
                                value={questionPoints}
                                onChange={(e) => setQuestionPoints(Number(e.target.value))}
                            />
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
                        value={questionDescription}
                        onChange={(e) => setQuestionDescription(e.target.value)}></textarea>
                    <b>Answers:</b>
                    {renderQuizProperty()}
                </div>
                <div className="card-footer">
                    <button className="btn btn-secondary me-1">Cancel</button>
                    <button className="btn btn-danger">Update Question</button>
                </div>
            </div>
        </div>
    );
}
