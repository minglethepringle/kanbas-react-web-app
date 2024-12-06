import { Router, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addQuiz, updateQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";

export default function QuizEditor() {
    const [_id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [course, setCourse] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(0);
    const [quizType, setQuizType] = useState("GradedQuiz");
    const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");
    const [shuffleAnswers, setShuffleAnswers] = useState(false);
    const [timeLimit, setTimeLimit] = useState(0);
    const [multipleAttempts, setMultipleAttempts] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
    const [accessCode, setAccessCode] = useState("");
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(false);
    const [webcamRequired, setWebCamRequired] = useState(false);
    const [lockQuestionsAfterAnswering, setLockQuestionsAFterAnswering] = useState(false);
    const [dueDate, setDueDate] = useState("");
    const [availableDate, setAvailableDate] = useState("");
    const [untilDate, setUntilDate] = useState("");
    const [published, setPublished] = useState(false);


    const { cid, qid } = useParams();
    const editing = qid !== "new";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);
    if (existingQuiz && _id === "") {
        setId(existingQuiz._id);
        setTitle(existingQuiz.title);
        setCourse(existingQuiz.course);
        setDescription(existingQuiz.description);
        setPoints(existingQuiz.points);
        setQuizType(existingQuiz.quizType);
        setAssignmentGroup(existingQuiz.assignmentGroup);
        setShuffleAnswers(existingQuiz.shuffleAnswers);
        setTimeLimit(existingQuiz.timeLimit);
        setMultipleAttempts(existingQuiz.multipleAttempts);
        setShowCorrectAnswers(existingQuiz.showCorrectAnswers);
        setAccessCode(existingQuiz.accessCode);
        setOneQuestionAtATime(existingQuiz.oneQuestionAtATime);
        setWebCamRequired(existingQuiz.webcamRequired);
        setLockQuestionsAFterAnswering(existingQuiz.lockQuestionsAfterAnswering);
        setDueDate(existingQuiz.dueDate);
        setAvailableDate(existingQuiz.availableDate);
        setUntilDate(existingQuiz.untilDate);
        setPublished(existingQuiz.published);
    }

    async function handleSubmit() {
        debugger;
        const quiz = {
            _id,
            course,
            details: {
                title,
                description,
                quizType,
                assignmentGroup,
                points,
                shuffleAnswers,
                timeLimit,
                multipleAttempts,
                showCorrectAnswers,
                accessCode,
                oneQuestionAtATime,
                webcamRequired,
                lockQuestionsAfterAnswering,
                dueDate,
                availableDate,
                untilDate,
                published,
            },
        };

        if (editing) {
            await quizzesClient.updateQuiz(quiz)
            dispatch(updateQuiz(quiz));
        } else {
            quiz.course = cid!;
            const newQuiz = await coursesClient.createQuizForCourse(cid!, quiz);
            dispatch(addQuiz(newQuiz));
        }

        // Route back
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    }

    return (
        <div id="wd-assignments-editor">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">Quiz Name</label>
                <input className="form-control" id="wd-name" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="mb-3">
                <textarea className="form-control" id="wd-description" rows={5} cols={30} onChange={(e) => setDescription(e.target.value)}>
                    {description}
                </textarea>
            </div>

            <div>
                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-points">Points</label>
                    </div>
                    <div className="col-8">
                        <input className="form-control" id="wd-points" value={points} onChange={(e) => setPoints(Number(e.target.value))} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-group">Assignment Group</label>
                    </div>
                    <div className="col-8">
                        <select className="form-select" id="wd-group">
                            <option selected value="Quizzes">QUIZZES</option>
                            <option value="Exams">EXAMS</option>
                            <option value="Assignments">ASSIGNMENTS</option>
                            <option value="Project">PROJECT</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-display-grade-as">Quiz Type</label>
                    </div>
                    <div className="col-8">
                        <select className="form-select" id="wd-display-grade-as">
                            <option selected value="GradedQuiz">GRADED QUIZ</option>
                            <option value="PracticeQuiz">PRACTICE QUIZ</option>
                            <option value="GradedSurvey">GRADED SURVEY</option>
                            <option value="UngradedSurvey">UNGRADED SURVEY</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-time-limit">Time Limit</label>
                    </div>
                    <div className="col-8">
                        <input className="form-control" id="wd-points" value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value))} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-access-code">Access Code</label>
                    </div>
                    <div className="col-8">
                        <input className="form-control" id="wd-points" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">
                        <label className="form-label float-end" htmlFor="wd-submission-type">Quiz Parameters</label>
                    </div>
                    <div className="col-8">
                        <div className="border border-dark rounded p-3">
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" name="check-shuffle-answers" id="wd-shuffle-answers"
                                    checked={shuffleAnswers} onChange={(e) => setShuffleAnswers(e.target.checked)} />
                                <label className="form-check-label" htmlFor="wd-shuffle-answers">Shuffle Answers</label>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" name="check-mutliple-attempts" id="wd-mutliple-attempts"
                                    checked={multipleAttempts} onChange={(e) => setMultipleAttempts(e.target.checked)} />
                                <label className="form-check-label" htmlFor="wd-mutliple-attempts">Multiple Attempts</label>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" name="check-show-correct-answers" id="wd-show-correct-answers"
                                    checked={showCorrectAnswers} onChange={(e) => setShowCorrectAnswers(e.target.checked)} />
                                <label className="form-check-label" htmlFor="wd-show-correct-answers">Show Correct Answers</label>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" name="check-one-questions-at-a-time" id="wd-one-questions-at-a-time"
                                    checked={oneQuestionAtATime} onChange={(e) => setOneQuestionAtATime(e.target.checked)} />
                                <label className="form-check-label" htmlFor="wd-one-questions-at-a-time">One Question At A Time</label>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" name="check-webcam-required" id="wd-webcam-required"
                                    checked={webcamRequired} onChange={(e) => setWebCamRequired(e.target.checked)} />
                                <label className="form-check-label" htmlFor="wd-webcam-required">Webcam Required</label>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" name="check-lock-questions-after-answering" id="wd-lock-questions-after-answering"
                                    checked={lockQuestionsAfterAnswering} onChange={(e) => setLockQuestionsAFterAnswering(e.target.checked)} />
                                <label className="form-check-label" htmlFor="wd-lock-questions-after-answering">Lock Questions After Answering</label>
                            </div>
                            <div className="form-check my-3">
                                <input className="form-check-input" type="checkbox" name="check-published" id="wd-published"
                                    checked={published} onChange={(e) => setPublished(e.target.checked)} />
                                <label className="form-check-label" htmlFor="wd-published">Published</label>
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
                                    <label className="form-label" htmlFor="wd-assign-to"><b>Assign to</b></label>
                                    <input className="form-control" id="wd-assign-to" value="Everyone" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <label className="form-label" htmlFor="wd-due-date"><b>Due</b></label>
                                    <input className="form-control" type="date" id="wd-due-date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <label className="form-label" htmlFor="wd-available-from"><b>Available from</b></label>
                                    <input className="form-control" type="date" id="wd-available-from" value={availableDate} onChange={(e) => setAvailableDate(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label" htmlFor="wd-available-until"><b>Until</b></label>
                                    <input className="form-control" type="date" id="wd-available-until" value={untilDate} onChange={(e) => setUntilDate(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-2">

                    </div>
                    <div className="col-8">
                        <div>
                            <hr />
                            <button id="wd-assignment-editor-save" className="btn btn-lg btn-danger me-1 float-end" onClick={handleSubmit}>
                                Save
                            </button>
                            <Link to={`/Kanbas/Courses/${cid}/Assignments`} id="wd-assignment-editor-cancel" className="btn btn-lg btn-secondary me-1 float-end">
                                Cancel
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
