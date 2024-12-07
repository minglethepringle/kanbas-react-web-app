import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import ProtectedRoleContent from "../../../Security/ProtectedRoleContent";
import FacultyDetails from "./FacultyDetails";
import StudentDetails from "./StudentDetails";

export default function QuizDetails() {
    const { cid, qid } = useParams();

    return (
        <div id="wd-quiz-details">
            <ProtectedRoleContent role="FACULTY">
                <FacultyDetails />
            </ProtectedRoleContent>

            <ProtectedRoleContent role="STUDENT">
                <StudentDetails />
            </ProtectedRoleContent>
        </div>
    );
}
