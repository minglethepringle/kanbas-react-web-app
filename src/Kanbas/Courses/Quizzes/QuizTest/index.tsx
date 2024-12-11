import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as coursesClient from "../../client";
import { setQuizzes } from "../reducer";
import ProtectedRoleContent from "../../../Security/ProtectedRoleContent";
import { FaExclamation, FaExclamationCircle } from "react-icons/fa";

export default function QuizTest() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    
    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
        if (quizzes?.length === 0) fetchQuizzes();
    }, []);

    const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);

    if (!existingQuiz) {
        return <p>Quiz not found</p>;
    }
    
    return (
        <div>
            <h1>{existingQuiz.details.title}</h1>
            <ProtectedRoleContent role="FACULTY">
                <div className="alert alert-danger w-50" role="alert">
                    <FaExclamationCircle className="me-2" />
                    This is a preview of the published version of the quiz
                </div>
            </ProtectedRoleContent>
            <p>Started: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>

            <h2>Quiz Instructions</h2>
            <p>{existingQuiz.details.description}</p>
            <hr/>
        </div>
    );
}