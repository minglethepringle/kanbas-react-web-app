import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import * as client from "../client";
import { useParams } from "react-router";
import MCQuestion from "./MCQuestion";
import TFQuestion from "./TFQuestion";
import FitBQuestion from "./FitBQuestion";

export default function QuizScreen() {
    const questions = [{questionType: 'Multiple Choice', _id: 1}, {questionType: 'True False', _id: 2}, {questionType: 'Fill in the Blank', _id: 3}]

    return (
        <div>
            {questions.map((question) => {
                    switch (question.questionType) {
                        case 'Multiple Choice':
                            return <MCQuestion key={question._id} />;
                        case 'True False':
                            return <TFQuestion key={question._id} />;
                        case 'Fill in the Blank':
                            return <FitBQuestion key={question._id} />;
                    }
                })}
        </div>
    );
}