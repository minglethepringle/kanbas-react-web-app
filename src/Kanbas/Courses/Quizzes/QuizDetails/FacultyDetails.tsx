import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as coursesClient from "../../client";
import { Link } from "react-router-dom";
import { setQuizzes } from "../reducer";

export default function FacultyDetails() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
        if (quizzes?.length === 0) fetchQuizzes();
    }, []);

    const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid)

    return (
        <div id="faculty-quiz-details">
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <Link
                            className="wd-quiz-link text-decoration-none text-dark"
                            to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/test`}>
                            <button className="btn btn-secondary mb-2 me-2" id="wd-signout-btn">
                                Preview
                            </button>
                        </Link>
                        <Link
                            className="wd-quiz-link text-decoration-none text-dark"
                            to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
                            <button className="btn btn-secondary mb-2" id="wd-signout-btn">
                                <FaPencilAlt className="me-1" />
                                Edit
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <hr />
            <p className="h1">{existingQuiz.details.title}</p>

            <div>
                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Quiz Type</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{existingQuiz.details.quizType}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Points</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{existingQuiz.details.points}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Assignment Group</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{existingQuiz.details.assignmentGroup}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Shuffle Answers</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{existingQuiz.details.shuffleAnswers ? "Yes" : "No"}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Time Limit</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">
                            {existingQuiz.details.timeLimit}{" "}
                            {existingQuiz.details.timeLimit === 1 ? "minute" : "minutes"}
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Multiple Attempts</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{existingQuiz.details.multipleAttempts ? "Yes" : "No"}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>How Many Attempts</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{String(existingQuiz.details.howManyAttempts)}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>View Responses</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Always</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Show Correct Answers</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">
                            {existingQuiz.details.showCorrectAnswers ? "Immediately" : "No"}
                        </label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>One Question at a Time</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{existingQuiz.details.oneQuestionAtATime ? "Yes" : "No"}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Require Respondus Lockdown Browser</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">No</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Required to View Quiz Results</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">No</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Webcam Required</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{existingQuiz.details.webcamRequired ? "Yes" : "No"}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Lock Questions After Answering</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">
                            {existingQuiz.details.lockQuestionsAfterAnswering ? "Yes" : "No"}
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Due</th>
                            <th scope="col">For</th>
                            <th scope="col">Available From</th>
                            <th scope="col">Until</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{existingQuiz.details.dueDate}</td>
                            <td>Everyone</td>
                            <td>{existingQuiz.details.availableDate}</td>
                            <td>{existingQuiz.details.untilDate}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
