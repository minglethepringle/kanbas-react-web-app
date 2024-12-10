import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import * as client from "../client";
import { useParams } from "react-router";
import QuizQuestion from "./QuizQuestion";

export default function QuestionsEditor() {
    const [questions, setQuestions] = useState<any[]>([]);
    const { qid } = useParams();
    // const createQuestion = async () => {
    //     const question = await client.createQuestion({
    //     });
    //     setQuestions([...questions, question]);
    // };
    // const fetchQuestions = async () => {
    //     const users = await client.findAllQuestions();
    //     setQuestions(users);
    // };
    // useEffect(() => {
    //     fetchQuestions();
    // }, [qid]);

    return (
        <div>
            <div className="container">
                <QuizQuestion />
                <div className="row">
                    <div className="col text-center">
                        <button
                            // {onClick={createQuestion}
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
