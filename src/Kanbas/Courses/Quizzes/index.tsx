import { BsGripVertical, BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { SlNotebook } from "react-icons/sl";
import { FaPlus, FaSortDown, FaTrash, FaUpload } from "react-icons/fa";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import ProtectedRoleContent from "../../Security/ProtectedRoleContent";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addQuiz, deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import * as coursesClient from "../client"
import * as quizzesClient from "./client"
import GreenCheckmark from "../Modules/GreenCheckmark";
import { format, isBefore, isAfter, parseISO } from 'date-fns';

export default function Quizzes() {
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [qidToDelete, setQidToDelete] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);

    const createEmptyQuiz = async () => {
        const newQuiz = await quizzesClient.createEmptyQuiz(cid as string);
        dispatch(addQuiz(newQuiz));
        // Navigate to the new quiz details
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}`);
    }

    const removeQuiz = async () => {
        await quizzesClient.deleteQuiz(qidToDelete);
        dispatch(deleteQuiz(qidToDelete));
    }

    const publishQuiz = async (qid: string) => {
        const updatedQuiz = await quizzesClient.publishQuiz(qid);
        dispatch(updateQuiz(updatedQuiz));
    }

    const handleAvailableDates = (quiz: any) => {
        const currentDate = new Date();
        const availableDate = quiz.details?.availableDate ? parseISO(quiz.details.availableDate) : null;
        const dueDate = quiz.details?.dueDate ? parseISO(quiz.details.dueDate) : null;
        const availableUntil = quiz.details?.untilDate ? parseISO(quiz.details.untilDate) : null;

        if (availableDate && isBefore(currentDate, availableDate)) {
            return <span><b>Not Available Until</b> {format(availableDate, 'yyyy-MM-dd')} | </span>;
        } else if (availableUntil && dueDate && isAfter(currentDate, availableUntil)) {
            return <span><b>Closed</b> | </span>;
        } else if (availableUntil && dueDate) {
            return <span><b>Available Until</b> {format(availableUntil, 'yyyy-MM-dd')} | </span>;
        } else {
            return <span><b>Always Available</b> | </span>;
        }
    };

    const unpublishQuiz = async (qid: string) => {
        const updatedQuiz = await quizzesClient.unpublishQuiz(qid);
        dispatch(updateQuiz(updatedQuiz));
    }

    return (
        <div id="wd-quizzes">
            <div className="row mb-4">
                <div className="col-6">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text h-100 bg-white rounded-0 border-end-0" id="basic-addon1">
                                <CiSearch className="fs-6" />
                            </span>
                        </div>
                        <input type="text" className="form-control py-2 border-start-0" placeholder="Search..." id="wd-search-quiz" />
                    </div>
                </div>
                <div className="col-6">
                    <ProtectedRoleContent role="FACULTY">
                        <button id="wd-add-quiz" className="btn btn-lg btn-danger me-1 float-end"
                            onClick={() => createEmptyQuiz()}>
                            <FaPlus className="me-2" />
                            Quiz
                        </button>
                    </ProtectedRoleContent>
                </div>
            </div>

            <ul id="wd-quizzes" className="list-group rounded-0">
                <li className="wd-quiz list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <FaSortDown />
                        <span className="px-3"><b>QUIZZES</b></span>
                    </div>
                    <ul className="wd-lessons list-group rounded-0 ">
                        {
                            quizzes.map((quiz: any) => (
                                quiz.details?.published ? (<li className={`${!quiz.details?.published ? "unpublished" : ""} wd-lesson list-group-item p-3 ps-1 d-flex`}>
                                    <div className="col-1">
                                        <BsGripVertical className="me-2 fs-3" />
                                        <SlNotebook className="text-success me-3" />
                                    </div>
                                    <div className="col">
                                        <h3>
                                            <Link className="wd-quiz-link text-decoration-none text-dark"
                                                to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`}>
                                                {quiz.details?.title}
                                            </Link>
                                        </h3>
                                        {!quiz.details?.published ? <span><b>Not Published</b> | </span> : <></>}
                                        {handleAvailableDates(quiz)} | 
                                        <b>Due</b> {quiz.details?.dueDate?.substring(0, 10) ?? "N/A"} | {quiz.details?.points} pts | {quiz.questions?.length || 0} questions
                                    </div>
                                    <div className="col-1 d-flex flex-col align-items-center">
                                        {
                                            quiz.details?.published
                                            && <GreenCheckmark />
                                        }
                                        <ProtectedRoleContent role="FACULTY">
                                            <div className="dropdown mx-3">
                                                <button className="btn btn-secondary" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <IoEllipsisVertical />
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                    <li><button className="dropdown-item" type="button" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`)}>Edit</button></li>
                                                    <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#wd-delete-quiz-dialog" onClick={() => setQidToDelete(quiz._id)}>Delete</button></li>
                                                    {
                                                        !quiz.details?.published
                                                            ? <li><button className="dropdown-item" type="button" onClick={() => publishQuiz(quiz._id)}>Publish</button></li>
                                                            : <li><button className="dropdown-item" type="button" onClick={() => unpublishQuiz(quiz._id)}>Unpublish</button></li>
                                                    }
                                                </ul>
                                            </div>
                                        </ProtectedRoleContent>
                                    </div>
                                </li>) : (
                                    <ProtectedRoleContent role="FACULTY">
                                        <li className={`${!quiz.details?.published ? "unpublished" : ""} wd-lesson list-group-item p-3 ps-1 d-flex`}>
                                            <div className="col-1">
                                                <BsGripVertical className="me-2 fs-3" />
                                                <SlNotebook className="text-success me-3" />
                                            </div>
                                            <div className="col">
                                                <h3>
                                                    <Link className="wd-quiz-link text-decoration-none text-dark"
                                                        to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`}>
                                                        {quiz.details?.title}
                                                    </Link>
                                                </h3>
                                                {!quiz.details?.published ? <span><b>Not Published</b> | </span> : <></>}
                                                {handleAvailableDates(quiz)} | 
                                                <b>Due</b> {quiz.details?.dueDate?.substring(0, 10) ?? "N/A"} | {quiz.details?.points} pts | {quiz.questions?.length || 0} questions
                                            </div>
                                            <div className="col-1 d-flex flex-col align-items-center">
                                                {
                                                    quiz.details?.published
                                                    && <GreenCheckmark />
                                                }
                                                <ProtectedRoleContent role="FACULTY">
                                                    <div className="dropdown mx-3">
                                                        <button className="btn btn-secondary" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <IoEllipsisVertical />
                                                        </button>
                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                                            <li><button className="dropdown-item" type="button" onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`)}>Edit</button></li>
                                                            <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#wd-delete-quiz-dialog" onClick={() => setQidToDelete(quiz._id)}>Delete</button></li>
                                                            {
                                                                !quiz.details?.published
                                                                    ? <li><button className="dropdown-item" type="button" onClick={() => publishQuiz(quiz._id)}>Publish</button></li>
                                                                    : <li><button className="dropdown-item" type="button" onClick={() => unpublishQuiz(quiz._id)}>Unpublish</button></li>
                                                            }
                                                        </ul>
                                                    </div>
                                                </ProtectedRoleContent>
                                            </div>
                                        </li>
                                    </ProtectedRoleContent>
                                )

                            ))}
                    </ul>
                </li>
            </ul>

            <ProtectedRoleContent role="FACULTY">
                <div id="wd-delete-quiz-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                    Are you sure? </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <p>You're about to remove a quiz. Are you sure?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancel </button>
                                <button onClick={removeQuiz} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                                    Delete </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ProtectedRoleContent>
        </div>
    );
}