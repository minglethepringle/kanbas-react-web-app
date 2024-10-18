import { BsGripVertical, BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { SlNotebook } from "react-icons/sl";
import { FaPlus, FaSortDown } from "react-icons/fa";
import LessonControlButtons from "../Modules/LessonControlButtons";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function Assignments() {
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
                    <button id="wd-add-assignment" className="btn btn-lg btn-danger me-1 float-end">
                        <FaPlus className="me-2" />
                        Assignment</button>
                    <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary me-1 float-end">
                        <FaPlus className="me-2" />
                        Group</button>
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
                        <li className="wd-lesson list-group-item p-3 ps-1 d-flex">
                            <div className="col-1">
                                <BsGripVertical className="me-2 fs-3" />
                                <SlNotebook className="text-success me-3" />
                            </div>
                            <div className="col">
                                <h3>
                                    <a className="wd-assignment-link text-decoration-none text-dark"
                                        href="#/Kanbas/Courses/1234/Assignments/125">
                                        A1
                                    </a>
                                </h3>
                                <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                            </div>
                            <div className="col-1">
                                <LessonControlButtons />
                            </div>
                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1 d-flex">
                            <div className="col-1">
                                <BsGripVertical className="me-2 fs-3" />
                                <SlNotebook className="text-success me-3" />
                            </div>
                            <div className="col">
                                <h3>
                                    <a className="wd-assignment-link text-decoration-none text-dark"
                                        href="#/Kanbas/Courses/1234/Assignments/125">
                                        A2
                                    </a>
                                </h3>
                                <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                            </div>
                            <div className="col-1">
                                <LessonControlButtons />
                            </div>
                        </li>
                        <li className="wd-lesson list-group-item p-3 ps-1 d-flex">
                            <div className="col-1">
                                <BsGripVertical className="me-2 fs-3" />
                                <SlNotebook className="text-success me-3" />
                            </div>
                            <div className="col">
                                <h3>
                                    <a className="wd-assignment-link text-decoration-none text-dark"
                                        href="#/Kanbas/Courses/1234/Assignments/125">
                                        A3
                                    </a>
                                </h3>
                                <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                            </div>
                            <div className="col-1">
                                <LessonControlButtons />
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}
