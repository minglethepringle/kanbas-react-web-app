import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function StudentDetails() {
    const [_id, setId] = useState("");
    const [title, setTitle] = useState("Quiz");
    // const [course, setCourse] = useState("");
    // const [description, setDescription] = useState("");
    // const [quizType, setQuizType] = useState("Graded Quiz");
    const [points, setPoints] = useState(0);
    // const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");
    // const [shuffleAnswers, setShuffleAnswers] = useState(false);
    const [timeLimit, setTimeLimit] = useState(0);
    // const [multipleAttempts, setMultipleAttempts] = useState(false);
    // const [showCorrectAnswers, setShowCorrectAnswers] = useState(true);
    const [accessCode, setAccessCode] = useState("");
    // const [oneQuestionAtATime, setOneQuestionAtATime] = useState(false);
    // const [webcamRequired, setWebCamRequired] = useState(false);
    // const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);
    const [dueDate, setDueDate] = useState("");
    const [availableDate, setAvailableDate] = useState("");
    const [untilDate, setUntilDate] = useState("");
    // const [published, setPublished] = useState(false);

    const { cid, qid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    //TODO: Convert current date to the date format of the other things
    const currDate = null;

    const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);
    if (existingQuiz && _id === "") {
        setId(existingQuiz._id);
        setTitle(existingQuiz.title);
        // setCourse(existingQuiz.course);
        // setDescription(existingQuiz.description);
        // setQuizType(existingQuiz.quizType);
        setPoints(existingQuiz.points);
        // setAssignmentGroup(existingQuiz.assignmentGroup);
        // setShuffleAnswers(existingQuiz.shuffleAnswers);
        setTimeLimit(existingQuiz.timeLimit);
        // setMultipleAttempts(existingQuiz.multipleAttempts);
        // setShowCorrectAnswers(existingQuiz.showCorrectAnswers);
        setAccessCode(existingQuiz.accessCode);
        // setOneQuestionAtATime(existingQuiz.oneQuestionAtATime);
        // setWebCamRequired(existingQuiz.webcamRequired);
        // setLockQuestionsAfterAnswering(existingQuiz.lockQuestionsAfterAnswering);
        setDueDate(existingQuiz.dueDate);
        setAvailableDate(existingQuiz.availableDate);
        setUntilDate(existingQuiz.untilDate);
        // setPublished(existingQuiz.published);
    }
    return (
        <div id="student-quiz-details">
            <p className="h1">{title}</p>
            <hr />
            <div className="row">
                <div className="col-2">
                    <label className="form-label">
                        <b className="me-2">Due</b>
                        {dueDate}
                    </label>
                </div>
                <div className="col-2">
                    <label className="form-label">
                        <b className="me-2">Points</b>
                        {points}
                    </label>
                </div>
                <div className="col-2">
                    <label className="form-labeld">
                        <b className="me-2">Questions</b>
                        //TODO: Do some question count thing
                        {points}
                    </label>
                </div>
                <div className="col-3">
                    <label className="form-label">
                        <b className="me-2">Available</b>
                        {availableDate}
                    </label>
                </div>
            </div>
            <label className="form-label">
                <b className="me-2">Time Limit</b>
                {timeLimit}
            </label>
            <hr />
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        // TODO: Check if the current date is greater, and show button, otherwise, show the not
                        available yet
                        {true ? (
                            <Link
                                className="wd-quiz-link text-decoration-none text-dark"
                                to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/test`}>
                                <button className="btn btn-danger mb-2 me-2" id="wd-signout-btn">
                                    Take Quiz
                                </button>
                            </Link>
                        ) : (
                            `This quiz is locked until ${dueDate}`
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
