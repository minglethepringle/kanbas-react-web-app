import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import * as client from "../client";
import { useParams } from "react-router";
import QuizQuestion from "./QuizQuestion";
import { useSelector, useDispatch } from "react-redux";
import { MC } from "./QuizQuestion/constants";

interface QuestionsEditorProps {
    questions: any;
    setQuestions: (state: any) => void;
}

interface QuestionType {
    _id: string,
    qid: string,
    questionType: "Multiple Choice" | "True False" | "Fill in the Blank",
    title: string,
    points: number,
    question: string,
    properties: any
}

export default function QuestionsEditor({ questions, setQuestions }: QuestionsEditorProps) {
    const { qid } = useParams();

    // Add a new question LOCALLY (not in the database)
    const createNewQuestion = async () => {
        const newQuestion = {
            _id: crypto.randomUUID(),
            qid: qid,
            questionType: MC,
            title: "New Question",
            points: 0,
            question: "Question",
            properties: {
                choices: []
            }
        };
        setQuestions([...questions, newQuestion]);
    };

    // Updates question details locally in questions state
    const updateQuestion = (question: QuestionType) => {
        const updatedQuestions = questions.map((q: QuestionType) => {
            // If the question is the one being updated,
            // replace it with the new question
            if (q._id === question._id) {
                return question;
            }
            return q;
        });
        setQuestions(updatedQuestions);
    };

    // Deletes a question locally in questions state
    const deleteQuestion = (id: string) => {
        const updatedQuestions = questions.filter((q: QuestionType) => q._id !== id);
        setQuestions(updatedQuestions);
    }

    return (
        <div>
            <div className="container">
                {
                    questions.map((question: QuestionType) => {
                        return <QuizQuestion 
                                            key={question._id}
                                            question={question}
                                            updateQuestion={updateQuestion}
                                            deleteQuestion={deleteQuestion}/>;
                    })
                }
                
                <div className="row">
                    <div className="col text-center">
                        <button
                            onClick={createNewQuestion}
                            className="btn btn-secondary mt-3">
                            <FaPlus className="me-2" />
                            New Question
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
