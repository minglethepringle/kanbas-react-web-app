import { Link } from "react-router-dom";
import * as db from "../Database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoleContent from "../Security/ProtectedRoleContent";
import { addEnrollment, deleteEnrollment, setEnrollments } from "./reducer";
import * as enrollmentsClient from "./client";
export default function Dashboard({ courses, course, setCourse, addNewCourse, deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void;
    enrolling: boolean;
    setEnrolling: (enrolling: boolean) => void;
    updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const [showEnrollments, setShowEnrollments] = useState(true);
    const dispatch = useDispatch();

    const fetchEnrollments = async () => {
        const enrollments = await enrollmentsClient.getEnrollmentsForUser(currentUser?._id);
        dispatch(setEnrollments(enrollments));
    };

    useEffect(() => {
        fetchEnrollments();
    }, []);

    function isEnrolledInCourse(courseId: string) {
        return enrollments.some((enrollment: { user: string, course: string }) =>
            enrollment.user === currentUser?._id && enrollment.course === courseId);
    }

    async function enrollCourse(courseId: string) {
        const enrollment = {
            user: currentUser?._id,
            course: courseId
        };
        const newEnrollment = await enrollmentsClient.enrollUserInCourse(enrollment);
        dispatch(addEnrollment(newEnrollment));
    }

    async function unenrollCourse(courseId: string) {
        const enrollmentId = enrollments
            .find((enrollment: { user: string, course: string }) =>
                enrollment.user === currentUser?._id && enrollment.course === courseId)
            ._id;
        await enrollmentsClient.deleteEnrollment(enrollmentId);
        dispatch(deleteEnrollment(enrollmentId));
    }

    return (
        <div id="wd-dashboard">
            <div className="row">
                <div className="col">
                    <h1 id="wd-dashboard-title">Dashboard</h1>
                </div>
                <div className="col">
                    <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
                        {enrolling ? "My Courses" : "All Courses"}
                    </button>
                </div>
                <hr />
            </div>

            <ProtectedRoleContent role="FACULTY">
                <h5>New Course<br />
                    <input value={course.name} className="form-control mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description} className="form-control" onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                </h5>
                <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse} > Add </button>
                <button className="btn btn-warning float-end me-2"
                    onClick={updateCourse} id="wd-update-course-click">
                    Update
                </button>
                <hr />
            </ProtectedRoleContent>


            <h2 id="wd-dashboard-published">Published Courses ({enrollments.length})</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {
                        courses
                            .map((course) => {
                                return (
                                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                                        <div className="card rounded-3 overflow-hidden">
                                            <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                                className="wd-dashboard-course-link text-decoration-none text-dark" >
                                                <img src="/images/dashboard-course-img-1.jpg" width="100%" height={160} />
                                                <div className="card-body">
                                                    <h5 className="wd-dashboard-course-title card-title">
                                                        {course.name} </h5>
                                                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                                        {course.description} </p>
                                                    <button className="btn btn-primary"> Go </button>
                                                    <ProtectedRoleContent role="FACULTY">
                                                        <button onClick={(event) => {
                                                            event.preventDefault();
                                                            deleteCourse(course._id);
                                                        }} className="btn btn-danger float-end"
                                                            id="wd-delete-course-click">
                                                            Delete
                                                        </button>
                                                        <button id="wd-edit-course-click"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                setCourse(course);
                                                            }}
                                                            className="btn btn-warning me-2 float-end" >
                                                            Edit
                                                        </button>
                                                    </ProtectedRoleContent>
                                                    {enrolling && (
                                                        <button onClick={(event) => {
                                                            event.preventDefault();
                                                            updateEnrollment(course._id, !course.enrolled);
                                                        }} className={`btn ${course.enrolled ? "btn-danger" : "btn-success"} float-end`} >
                                                            {course.enrolled ? "Unenroll" : "Enroll"}
                                                        </button>
                                                    )}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                    }
                </div>
            </div>
        </div>);
}