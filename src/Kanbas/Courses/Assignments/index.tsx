import { BsGripVertical, BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { SlNotebook } from "react-icons/sl";
import { FaPlus, FaSortDown, FaTrash } from "react-icons/fa";
import LessonControlButtons from "../Modules/LessonControlButtons";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useParams } from "react-router";
import * as db from "../../Database";
import ProtectedRoleContent from "../../Security/ProtectedRoleContent";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAssignment, setAssignments } from "./reducer";
import { useEffect, useState } from "react";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [aidToDelete, setAidToDelete] = useState("");
    const dispatch = useDispatch();

    const fetchAssignments = async () => {
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, []);

    const removeAssignment = async () => {
        await assignmentsClient.deleteAssignment(aidToDelete);
        dispatch(deleteAssignment(aidToDelete));
    }

    return (
        <div id="wd-assignments">
            <div className="row mb-4">
                <div className="col-6">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text h-100 bg-white rounded-0 border-end-0" id="basic-addon1">
                                <CiSearch className="fs-6" />
                            </span>
                        </div>
                        <input type="text" className="form-control py-2 border-start-0" placeholder="Search..." id="wd-search-assignment" />
                    </div>
                </div>
                <div className="col-6">
                    <ProtectedRoleContent role="FACULTY">
                        <Link id="wd-add-assignment" className="btn btn-lg btn-danger me-1 float-end"
                            to={`/Kanbas/Courses/${cid}/Assignments/new`}>
                            <FaPlus className="me-2" />
                            Assignment</Link>
                        <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary me-1 float-end">
                            <FaPlus className="me-2" />
                            Group</button>
                    </ProtectedRoleContent>
                </div>
            </div>

            <ul id="wd-assignments" className="list-group rounded-0">
                <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <FaSortDown />
                        <span className="px-3"><b>ASSIGNMENTS</b></span>
                        <div className="float-end">
                            <span className="border border-dark p-2 rounded-5">
                                40% of Total
                            </span>
                            <BsPlus />
                            <IoEllipsisVertical className="fs-4" />
                        </div>
                    </div>
                    <ul className="wd-lessons list-group rounded-0 ">
                        {
                            assignments.map((assignment: any) => (
                                <li className="wd-lesson list-group-item p-3 ps-1 d-flex">
                                    <div className="col-1">
                                        <BsGripVertical className="me-2 fs-3" />
                                        <SlNotebook className="text-success me-3" />
                                    </div>
                                    <div className="col">
                                        <h3>
                                            <Link className="wd-assignment-link text-decoration-none text-dark"
                                                to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                                                {assignment.title}
                                            </Link>
                                        </h3>
                                        <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> {assignment.availableDate} | <b>Due</b> {assignment.dueDate} | {assignment.points} pts
                                    </div>
                                    <div className="col-1">
                                        <LessonControlButtons />
                                        <ProtectedRoleContent role="FACULTY">
                                            <FaTrash className="text-danger me-2 mt-1 float-end" data-bs-toggle="modal" data-bs-target="#wd-delete-assignment-dialog" onClick={() => setAidToDelete(assignment._id) } />
                                        </ProtectedRoleContent>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </li>
            </ul>

            <ProtectedRoleContent role="FACULTY">
                <div id="wd-delete-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                    Are you sure? </h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <p>You're about to remove an assignment. Are you sure?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancel </button>
                                <button onClick={removeAssignment} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                                    Delete </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ProtectedRoleContent>
        </div>
    );
}
