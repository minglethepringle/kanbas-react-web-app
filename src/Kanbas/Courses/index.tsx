import { FaAlignJustify } from "react-icons/fa";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import Modules from "./Modules";
import { courses } from "../Database";
import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as courseClient from "./client";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizTest from "./Quizzes/QuizTest";
import QuizResults from "./Quizzes/QuizResults";
export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const course = courses.find((course) => course._id === cid);
    const [coursePeople, setCoursePeople] = useState<any[]>([]);

    const fetchCoursePeople = async () => {
        if (cid) {
            const coursePeople = await courseClient.findUsersForCourse(cid);
            setCoursePeople(coursePeople);
        }
    };
    useEffect(() => {
        fetchCoursePeople();
    }, [cid]);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable users={coursePeople} />} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/:qid" element={<QuizEditor />} />
                        <Route path="Quizzes/:qid/details" element={<QuizDetails />} />
                        <Route path="Quizzes/:qid/test" element={<QuizTest/>} />
                        <Route path="Quizzes/:qid/results" element={<QuizResults/>} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
