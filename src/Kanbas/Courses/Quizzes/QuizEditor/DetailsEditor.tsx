import { Router, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addQuiz, updateQuiz } from "../reducer";
import { useDispatch, useSelector } from "react-redux";
import * as coursesClient from "../../client";
import * as quizzesClient from "../client";

interface DetailsEditorProps {
    quizState: any;
    setQuizState: (state: any) => void;
}

export default function DetailsEditor({ quizState, setQuizState }: DetailsEditorProps) {
    const { cid } = useParams();

    const updateField = (field: string, value: any) => {
        setQuizState({
            ...quizState,
            [field]: value,
        });
    };

    return (
        <div id="wd-quiz-details-editor">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label mt-3">
                    Quiz Name
                </label>
                <input
                    className="form-control"
                    id="wd-name"
                    value={quizState.title}
                    onChange={(e) => updateField("title", e.target.value)}
                />
            </div>

            <div className="mb-3">
                <textarea
                    className="form-control"
                    id="wd-description"
                    rows={5}
                    cols={30}
                    onChange={(e) => updateField("description", e.target.value)}>
                    {quizState.description}
                </textarea>
            </div>

            <div>
                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-points">
                            Points
                        </label>
                    </div>
                    <div className="col-8">
                        <input
                            className="form-control"
                            id="wd-points"
                            value={quizState.points}
                            onChange={(e) => updateField("points", e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-group">
                            Assignment Group
                        </label>
                    </div>
                    <div className="col-8">
                        <select
                            className="form-select"
                            id="wd-group"
                            value={quizState.assignmentGroup}
                            onChange={(e) => updateField("assignmentGroup", e.target.value)}
                            // onChange={(e) => updateField("assignmentGroup", e.target.value)}
                        >
                            <option selected value="Quizzes">
                                QUIZZES
                            </option>
                            <option value="Exams">EXAMS</option>
                            <option value="Assignments">ASSIGNMENTS</option>
                            <option value="Project">PROJECT</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-display-grade-as">
                            Quiz Type
                        </label>
                    </div>
                    <div className="col-8">
                        <select
                            className="form-select"
                            id="wd-display-grade-as"
                            value={quizState.quizType}
                            onChange={(e) => updateField("quizType", e.target.value)}>
                            <option selected value="GradedQuiz">
                                GRADED QUIZ
                            </option>
                            <option value="PracticeQuiz">PRACTICE QUIZ</option>
                            <option value="GradedSurvey">GRADED SURVEY</option>
                            <option value="UngradedSurvey">UNGRADED SURVEY</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-time-limit">
                            Time Limit
                        </label>
                    </div>
                    <div className="col-8">
                        <input
                            className="form-control"
                            id="wd-time-limit"
                            value={quizState.timeLimit}
                            onChange={(e) => updateField("timeLimit", e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-access-code">
                            Access Code
                        </label>
                    </div>
                    <div className="col-8">
                        <input
                            className="form-control"
                            id="wd-access-code"
                            value={quizState.accessCode}
                            onChange={(e) => updateField("accessCode", e.target.value)}
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-submission-type">
                            Quiz Parameters
                        </label>
                    </div>
                    <div className="col-8">
                        <div className="border border-dark rounded p-3">
                            <div className="form-check my-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="check-shuffle-answers"
                                    id="wd-shuffle-answers"
                                    checked={quizState.shuffleAnswers}
                                    onChange={(e) => updateField("shuffleAnswers", e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="wd-shuffle-answers">
                                    Shuffle Answers
                                </label>
                            </div>
                            <div className="form-check my-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="check-multiple-attempts"
                                    id="wd-multiple-attempts"
                                    checked={quizState.multipleAttempts}
                                    onChange={(e) => updateField("multipleAttempts", e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="wd-multiple-attempts">
                                    Multiple Attempts
                                </label>
                            </div>
                            <div className="form-check my-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="check-show-correct-answers"
                                    id="wd-show-correct-answers"
                                    checked={quizState.showCorrectAnswers}
                                    onChange={(e) => updateField("showCorrectAnswers", e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="wd-show-correct-answers">
                                    Show Correct Answers
                                </label>
                            </div>
                            <div className="form-check my-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="check-one-questions-at-a-time"
                                    id="wd-one-questions-at-a-time"
                                    checked={quizState.oneQuestionAtATime}
                                    onChange={(e) => updateField("oneQuestionAtATime", e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="wd-one-questions-at-a-time">
                                    One Question At A Time
                                </label>
                            </div>
                            <div className="form-check my-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="check-webcam-required"
                                    id="wd-webcam-required"
                                    checked={quizState.webcamRequired}
                                    onChange={(e) => updateField("webcamRequired", e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="wd-webcam-required">
                                    Webcam Required
                                </label>
                            </div>
                            <div className="form-check my-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="check-lock-questions-after-answering"
                                    id="wd-lock-questions-after-answering"
                                    checked={quizState.lockQuestionsAfterAnswering}
                                    onChange={(e) => updateField("lockQuestionsAfterAnswering", e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="wd-lock-questions-after-answering">
                                    Lock Questions After Answering
                                </label>
                            </div>
                            <div className="form-check my-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="check-published"
                                    id="wd-published"
                                    checked={quizState.published}
                                    onChange={(e) => updateField("published", e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="wd-published">
                                    Published
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end">Assign</label>
                    </div>
                    <div className="col-8">
                        <div className="border border-dark rounded p-3">
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label" htmlFor="wd-assign-to">
                                        <b>Assign to</b>
                                    </label>
                                    <input className="form-control" id="wd-assign-to" value="Everyone" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label" htmlFor="wd-due-date">
                                        <b>Due</b>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        id="wd-due-date"
                                        value={quizState.dueDate}
                                        onChange={(e) => updateField("dueDate", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="form-label" htmlFor="wd-available-from">
                                        <b>Available from</b>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        id="wd-available-from"
                                        value={quizState.availableDate}
                                        onChange={(e) => updateField("availableDate", e.target.value)}
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="form-label" htmlFor="wd-available-until">
                                        <b>Until</b>
                                    </label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        id="wd-available-until"
                                        value={quizState.untilDate}
                                        onChange={(e) => updateField("untilDate", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
