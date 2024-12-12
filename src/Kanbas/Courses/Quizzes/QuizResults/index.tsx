import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as quizClient from "../client";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface Answer {
    questionId: string;
    studentAnswer: string;
    correctAnswers: string[];
    question: {
        questionType: string;
        title: string;
        points: number;
        question: string;
        properties: any;
    }
}

interface Result {
    datetime: string;
    score: number;
    answers: Answer[];
}

export default function QuizResults() {
    const { cid, qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [latestResult, setLatestResult] = useState<Result>();

    const fetchLatestResult = async () => {
        const result = await quizClient.getLatestAttempt(qid as string, currentUser._id);
        setLatestResult(result);
    };

    useEffect(() => {
        fetchLatestResult();
    }, []);

    const totalPoints = latestResult?.answers.reduce((acc, curr) => acc + curr.question.points, 0);

    const renderChoices = (answer: Answer) => {
        switch (answer.question.questionType) {
            case "Multiple Choice":
                return (
                    <div>
                        <ul>
                            {
                                answer.question.properties.choices.map((choice: any) => (
                                    <li>{choice.text}</li>
                                ))
                            }
                        </ul>
                    </div>
                );
            case "True False":
                return (
                    <div>
                        <ul>
                            <li>True</li>
                            <li>False</li>
                        </ul>
                    </div>
                );
            case "Fill in the Blank":
                return (
                    <div>
                    </div>
                );
            default:
                return null;
        }
    }

    const answeredCorrectly = (answer: Answer) => {
        let lowercaseCorrectAnswers = answer.correctAnswers.map((answer: string) => answer.toLowerCase());
        return lowercaseCorrectAnswers.includes(answer.studentAnswer.toLowerCase());
    }

    return (
        <div>
            <h1>Quiz Results</h1>
            <h3>Score: {latestResult?.score} / {totalPoints}</h3>
            <p>Taken: {latestResult?.datetime}</p>
            <hr/>

            {
                latestResult?.answers.map((answer: Answer) => (
                    <div className={"card my-3 border-3 " + (answeredCorrectly(answer) ? "border-success" : "border-danger")}>
                        <div className="card-header">
                            <h4>{answer.question.title} ({answer.question.points} points)</h4>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{answer.question.question}</h5>
                            { renderChoices(answer) }
                            <p><b>Your Answer: {answer.studentAnswer}</b></p>
                            <div className="alert alert-success" role="alert">
                                Correct Answers: {answer.correctAnswers.join(", ")}
                            </div>
                        </div>
                    </div>
                ))
            }

            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/details`} className="btn btn-danger">Retake Quiz</Link>

        </div>
    );
}