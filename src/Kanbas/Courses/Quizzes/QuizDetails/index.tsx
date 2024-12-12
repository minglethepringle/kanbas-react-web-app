import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ProtectedRoleContent from "../../../Security/ProtectedRoleContent";
import FacultyDetails from "./FacultyDetails";
import StudentDetails from "./StudentDetails";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as quizzesClient from "../client";

export default function QuizDetails() {
    const { cid, qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [latestAttempt, setLatestAttempt] = useState<any>();

    const fetchLatestAttempt = async () => {
        const attempt = await quizzesClient.getLatestAttempt(
            qid!,
            currentUser._id,
        );
        setLatestAttempt(attempt);
    }

    useEffect(() => {
        fetchLatestAttempt();
    }, []);

    return (
        <div id="wd-quiz-details">
            <ProtectedRoleContent role="FACULTY">
                <FacultyDetails />
            </ProtectedRoleContent>

            <ProtectedRoleContent role="STUDENT">
                <StudentDetails />
            </ProtectedRoleContent>

            {
                latestAttempt &&
                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/results`}
                    className="btn btn-secondary">
                    View Latest Result
                </Link>
            }

        </div>
    );
}
