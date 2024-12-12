import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { setQuizzes } from "../reducer";
import * as coursesClient from "../../../Courses/client";
import * as quizzesClient from "../client";

export default function StudentDetails() {
    const [quizDetails, setQuizDetails] = useState<any>();
    const [attemptsRemaining, setAttemptsRemaining] = useState<number>(0);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    const { cid, qid } = useParams();
    //TODO: Convert current date to the date format of the other things
    const currDate = null;

    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        let quiz = quizzes.find((quiz: any) => quiz._id === qid);
        setQuizDetails(quiz);

        dispatch(setQuizzes(quizzes));

        if (currentUser) {
            // Fetch all attempts for this user
            const { numberOfAttempts } = await quizzesClient.getNumberOfAttempts(qid as string, currentUser._id);
            const attemptsRemaining = quiz.details.howManyAttempts - numberOfAttempts;
            setAttemptsRemaining(attemptsRemaining);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, [currentUser]);

    // const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);
    // if (existingQuiz) {
    //     setQuizDetails(existingQuiz);
    // }

    const renderQuizButton = () => {
        if (new Date() > new Date(quizDetails?.details?.dueDate)) {
            return `This quiz is locked until ${quizDetails?.details?.dueDate}`;
        } else if (attemptsRemaining === 0) {
            return `You have no attempts remaining`;
        }
        else {
            return <Link
                className="wd-quiz-link text-decoration-none text-dark"
                to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/test`}>
                <button className="btn btn-danger mb-2 me-2" id="wd-signout-btn">
                    Take Quiz
                </button>
            </Link>
        }
    };

    return (
        <div id="student-quiz-details">
            <p className="h1">{quizDetails?.details?.title}</p>
            <hr />
            <div className="row">
                <div className="col">
                    <label className="form-label">
                        <b className="me-2">Due</b>
                        {quizDetails?.details?.dueDate.substring(0, 10)}
                    </label>
                </div>
                <div className="col">
                    <label className="form-label">
                        <b className="me-2">Points</b>
                        {quizDetails?.details?.points}
                    </label>
                </div>
                <div className="col">
                    <label className="form-labeld">
                        <b className="me-2">Questions</b>
                        {quizDetails?.questions.length}
                    </label>
                </div>
                <div className="col">
                    <label className="form-label">
                        <b className="me-2">Available</b>
                        {quizDetails?.details?.availableDate.substring(0, 10)}
                    </label>
                </div>
                <div className="col">
                    <label className="form-label">
                        <b className="me-2">Time Limit</b>
                        {quizDetails?.details?.timeLimit} minutes
                    </label>
                </div>
                <div className="col">
                    <label className="form-label">
                        <b className="me-2">Attempts Remaining</b>
                        {attemptsRemaining}
                    </label>
                </div>
            </div>

            <hr />
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        {renderQuizButton()}
                    </div>
                </div>
            </div>
        </div>
    );
}
