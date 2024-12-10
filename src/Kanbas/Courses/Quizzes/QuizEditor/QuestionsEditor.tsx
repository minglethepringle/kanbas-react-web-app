import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import * as client from "../client";
import { useParams } from "react-router";
import QuizQuestion from "./QuizQuestion";
import { addQuestion, updateQuestion, deleteQuestion, editQuestion, setQuestions } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

interface QuestionsEditorProps {
    quizState: any;
    setQuizState: (state: any) => void;
}

// use quizState and
export default function QuestionsEditor({ quizState, setQuizState }: QuestionsEditorProps) {
    const { qid } = useParams();
    const dispatch = useDispatch();
    const { questions } = useSelector((state: any) => state.questionsReducer);

    const createQuestionForQuiz = async () => {
        if (!qid) return;
        const newQuestion = {}
        const question = await client.createQuestionForQuiz(qid, newQuestion);
        dispatch(addQuestion(question))
    };

    const fetchQuestions = async () => {
        const questions = await client.findQuestionsForQuiz(qid as string);
        dispatch(setQuestions(questions));
    };
    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div>
            <div className="container">
                <QuizQuestion quizState={quizState} setQuizState={setQuizState}/>
                <div className="row">
                    <div className="col text-center">
                        <button
                            onClick={createQuestionForQuiz}
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
