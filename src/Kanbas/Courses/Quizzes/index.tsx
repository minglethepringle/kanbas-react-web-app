import { BsGripVertical, BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { SlNotebook } from "react-icons/sl";
import { FaPlus, FaSortDown, FaTrash } from "react-icons/fa";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import ProtectedRoleContent from "../../Security/ProtectedRoleContent";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteQuiz, setQuizzes } from "./reducer";
import * as coursesClient from "../client"
import * as quizzesClient from "./client"


export default function Quizzes() {
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [qidToDelete, setQidToDelete] = useState("");
    const dispatch = useDispatch();

    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);

    const removeQuiz = async () => {
        await quizzesClient.deleteQuiz(qidToDelete);
        dispatch(deleteQuiz(qidToDelete));
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
                        <Link id="wd-add-quiz" className="btn btn-lg btn-danger me-1 float-end"
                            to={`/Kanbas/Courses/${cid}/Quizzes/new`}> {/* TODO IMPLEMENT NEW QUIZZES PAGE */}
                            <FaPlus className="me-2" />
                            Quiz</Link>
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
                                <li className="wd-lesson list-group-item p-3 ps-1 d-flex">
                                    <div className="col-1">
                                        <BsGripVertical className="me-2 fs-3" />
                                        <SlNotebook className="text-success me-3" />
                                    </div>
                                    <div className="col">
                                        <h3>
                                            <Link className="wd-quiz-link text-decoration-none text-dark"
                                                to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}> {/* TODO IMPLEMENT TAKE QUIZ/EDIT QUIZ PAGE BASED ON ROLE */}
                                                {quiz.details.title}
                                            </Link>
                                        </h3>
                                        <b>Available Until</b> {new Date(quiz.details.availableDate).toISOString().slice(0, 10)} | <b>Due</b> {new Date(quiz.details.dueDate).toISOString().slice(0, 10)} | {quiz.details.points} pts | {quiz.questions.length}
                                    </div>
                                    <div className="col-1">
                                        <LessonControlButtons />
                                        <ProtectedRoleContent role="FACULTY">
                                            <FaTrash className="text-danger me-2 mt-1 float-end" data-bs-toggle="modal" data-bs-target="#wd-delete-quiz-dialog" onClick={() => setQidToDelete(quiz._id) } />
                                        </ProtectedRoleContent>
                                    </div>
                                </li>
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