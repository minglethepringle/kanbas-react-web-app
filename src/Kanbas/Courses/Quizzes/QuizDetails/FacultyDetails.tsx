import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function FacultyDetails() {
    const [_id, setId] = useState("");
    const [title, setTitle] = useState("Quiz");
    // const [course, setCourse] = useState("");
    // const [description, setDescription] = useState("");
    const [quizType, setQuizType] = useState("Graded Quiz");
    const [points, setPoints] = useState(0);
    const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");
    const [shuffleAnswers, setShuffleAnswers] = useState(false);
    const [timeLimit, setTimeLimit] = useState(0);
    const [multipleAttempts, setMultipleAttempts] = useState(false);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(true);
    // const [accessCode, setAccessCode] = useState("");
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(false);
    const [webcamRequired, setWebCamRequired] = useState(false);
    const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);
    const [dueDate, setDueDate] = useState("");
    const [availableDate, setAvailableDate] = useState("");
    const [untilDate, setUntilDate] = useState("");
    // const [published, setPublished] = useState(false);

    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);
    if (existingQuiz && _id === "") {
        setId(existingQuiz._id);
        setTitle(existingQuiz.title);
        // setCourse(existingQuiz.course);
        // setDescription(existingQuiz.description);
        setQuizType(existingQuiz.quizType);
        setPoints(existingQuiz.points);
        setAssignmentGroup(existingQuiz.assignmentGroup);
        setShuffleAnswers(existingQuiz.shuffleAnswers);
        setTimeLimit(existingQuiz.timeLimit);
        setMultipleAttempts(existingQuiz.multipleAttempts);
        setShowCorrectAnswers(existingQuiz.showCorrectAnswers);
        // setAccessCode(existingQuiz.accessCode);
        setOneQuestionAtATime(existingQuiz.oneQuestionAtATime);
        setWebCamRequired(existingQuiz.webcamRequired);
        setLockQuestionsAfterAnswering(existingQuiz.lockQuestionsAfterAnswering);
        setDueDate(existingQuiz.dueDate);
        setAvailableDate(existingQuiz.availableDate);
        setUntilDate(existingQuiz.untilDate);
        // setPublished(existingQuiz.published);
    }
    return (
        <div id="faculty-quiz-details">
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <Link
                            className="wd-quiz-link text-decoration-none text-dark"
                            to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`}>
                            {" "}
                            //TODO: Change to the actual editing later?
                            <button className="btn btn-secondary mb-2 me-2" id="wd-signout-btn">
                                Preview
                            </button>
                        </Link>
                        <Link
                            className="wd-quiz-link text-decoration-none text-dark"
                            to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`}>
                            <button className="btn btn-secondary mb-2" id="wd-signout-btn">
                                <FaPencilAlt className="me-1" />
                                Edit
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <hr />
            <p className="h1">{title}</p>

            <div>
                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Quiz Type</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{quizType}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Points</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{points}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Assignment Group</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{assignmentGroup}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Shuffle Answers</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{quizType}</label>
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
                            {timeLimit} {timeLimit === 1 ? "minute" : "minutes"}
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
                        <label className="form-label">{multipleAttempts ? "Yes" : "No"}</label>
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
                        <label className="form-label">{showCorrectAnswers ? "Immediately" : "No"}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>One Question at a Time</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{oneQuestionAtATime ? "Yes" : "No"}</label>
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
                        <label className="form-label">{webcamRequired ? "Yes" : "No"}</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-4">
                        <label className="form-label float-end">
                            <b>Lock Questions After Answering</b>
                        </label>
                    </div>
                    <div className="col-4">
                        <label className="form-label">{lockQuestionsAfterAnswering ? "Yes" : "No"}</label>
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
                            <td>{dueDate}</td>
                            <td>Everyone</td>
                            <td>{availableDate}</td>
                            <td>{untilDate}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
