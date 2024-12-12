import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as coursesClient from "../../client";
import * as quizClient from "../client";
import * as quizTestClient from "./client";
import { setQuizzes } from "../reducer";
import ProtectedRoleContent from "../../../Security/ProtectedRoleContent";
import { FaExclamationCircle } from "react-icons/fa";
import QuizQuestion from "./QuizQuestion";
import { start } from "repl";

interface QuestionType {
    _id: string;
    qid: string;
    questionType: "Multiple Choice" | "True False" | "Fill in the Blank";
    title: string;
    points: number;
    question: string;
    properties: any;
}

interface AnswerSubmission {
    questionId: string;
    studentAnswer: string;
}

export default function QuizTest() {
    const { cid, qid } = useParams();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [answers, setAnswers] = useState<AnswerSubmission[]>([]);
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate();

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
        if (quizzes?.length === 0) fetchQuizzes();

        // At start, set the start date
        setStartDate(new Date());
    }, []);

    const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);

    const fetchQuestions = async () => {
        if (qid) {
            const quizQuestions = await quizClient.findQuestionsForQuiz(qid as string);
            // randomizeQuestions if property is set
            setQuestions(quizQuestions);

            const initialAnswers: AnswerSubmission[] = quizQuestions.map((question: QuestionType) => ({
                questionId: question._id,
                studentAnswer: null
            }));
            setAnswers(initialAnswers);
        }
    };
    useEffect(() => {
        if (existingQuiz) {
            fetchQuestions();
        }
    }, [existingQuiz, qid]);

    if (!existingQuiz) {
        return <p>Quiz not found</p>;
    }

    const handleSubmit = async () => {        
        // Validate that all questions have been answered
        const unansweredQuestions = answers.filter((answer) => answer.studentAnswer === null);

        if (unansweredQuestions.length > 0) {
            alert(`Please answer all ${unansweredQuestions.length} remaining questions.`);
            return;
        }

        try {
            // Prepare submission object
            const submissionData = {
                userId: currentUser._id,
                answers: answers,
            };

            // Call API to submit quiz
            const response = await quizTestClient.submitQuiz(qid as string, submissionData);

            // Handle successful submission
            alert("Quiz submitted successfully!");
            // Optionally navigate or update UI
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/results`);
        } catch (error) {
            console.error("Error submitting quiz:", error);
            alert("Failed to submit quiz. Please try again.");
        }
    };

    const handleAnswerChange = (questionId: string, studentAnswer: string) => {
        setAnswers( 
            answers.map(ans => 
                ans.questionId === questionId 
                    ? { ...ans, studentAnswer: studentAnswer }
                    : ans
            )
        );
    };

    return (
        <div className="position-relative p-4">
            <h1>{existingQuiz.details.title}</h1>
            <ProtectedRoleContent role="FACULTY">
                <div className="alert alert-danger w-50" role="alert">
                    <FaExclamationCircle className="me-2" />
                    This is a preview of the published version of the quiz
                </div>
            </ProtectedRoleContent>
            <p>
                Started: {startDate.toLocaleDateString()} at {startDate.toLocaleTimeString()}
            </p>

            <h2>Quiz Instructions</h2>
            <p>{existingQuiz.details.description}</p>
            <hr />
            
            {questions.map((question: QuestionType, index: Number) => {
                // Find currently selected answer if any
                const currentAnswer = answers.find(a => a.questionId === question._id)?.studentAnswer || "";
                return <QuizQuestion key={question._id} question={question} currentAnswer={currentAnswer} onAnswerChange={(answer: string) => handleAnswerChange(question._id, answer)}/>
            })}

            <hr />
            <button type="submit" className="btn btn-danger float-end" onClick={() => handleSubmit()}>
                Submit
            </button>
        </div>
    );
}
