import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { updateQuiz, addQuiz } from "../reducer";
import DetailsEditor from "./DetailsEditor";
import QuestionsEditor from "./QuestionsEditor";
import * as coursesClient from "../../client";
import * as quizzesClient from "../client";
import { Link } from "react-router-dom";

// QuizEditor.tsx
export default function QuizEditor() {
    const [activeTab, setActiveTab] = useState("Details");
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);

    // Lift all the state up
    const [quizState, setQuizState] = useState({
        _id: "",
        title: "Quiz",
        course: "",
        questions: [],
        description: "",
        points: 0,
        quizType: "Graded Quiz",
        assignmentGroup: "Quizzes",
        shuffleAnswers: false,
        timeLimit: 0,
        multipleAttempts: false,
        showCorrectAnswers: true,
        accessCode: "",
        oneQuestionAtATime: false,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "",
        availableDate: "",
        untilDate: "",
        published: false,
    });

    // Load existing quiz data
    const editing = qid !== "new";
    const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);

    useEffect(() => {
        if (existingQuiz && quizState._id === "") {
            setQuizState({
                _id: existingQuiz._id,
                title: existingQuiz.title,
                course: existingQuiz.course,
                questions: existingQuiz.questions,
                description: existingQuiz.description,
                points: existingQuiz.points,
                assignmentGroup: existingQuiz.assignmentGroup,
                quizType: existingQuiz.quizType,
                shuffleAnswers: existingQuiz.shuffleAnswers,
                timeLimit: existingQuiz.timeLimit,
                multipleAttempts: existingQuiz.multipleAttempts,
                showCorrectAnswers: existingQuiz.showCorrectAnswers,
                accessCode: existingQuiz.accessCode,
                oneQuestionAtATime: existingQuiz.oneQuestionAtATime,
                webcamRequired: existingQuiz.webcamRequired,
                lockQuestionsAfterAnswering: existingQuiz.lockQuestionsAfterAnswering,
                dueDate: existingQuiz.dueDate,
                availableDate: existingQuiz.availableDate,
                untilDate: existingQuiz.untilDate,
                published: existingQuiz.published,
            });
        }
    }, [existingQuiz]);

    // Handle saving quiz
    const handleSave = async () => {
        const quiz = {
            _id: quizState._id,
            course: quizState.course,
            questions: quizState.questions,
            details: {
                title: quizState.title,
                description: quizState.description,
                quizType: quizState.quizType,
                assignmentGroup: quizState.assignmentGroup,
                points: quizState.points,
                shuffleAnswers: quizState.shuffleAnswers,
                timeLimit: quizState.timeLimit,
                multipleAttempts: quizState.multipleAttempts,
                showCorrectAnswers: quizState.showCorrectAnswers,
                accessCode: quizState.accessCode,
                oneQuestionAtATime: quizState.oneQuestionAtATime,
                webcamRequired: quizState.webcamRequired,
                lockQuestionsAfterAnswering: quizState.lockQuestionsAfterAnswering,
                dueDate: quizState.dueDate,
                availableDate: quizState.availableDate,
                untilDate: quizState.untilDate,
                published: quizState.published,
            },
        };

        if (editing) {
            await quizzesClient.updateQuiz(quiz);
            dispatch(updateQuiz(quiz));
        } else {
            quiz.course = cid!;
            const newQuiz = await coursesClient.createQuizForCourse(cid!, quiz);
            dispatch(addQuiz(newQuiz));
        }

        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };

    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "Details" ? "active" : ""}`}
                        onClick={() => setActiveTab("Details")}>
                        Details
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "Questions" ? "active" : ""}`}
                        onClick={() => setActiveTab("Questions")}>
                        Questions
                    </button>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                {activeTab === "Details" && (
                    <DetailsEditor quizState={quizState} setQuizState={setQuizState} />
                )}
                {activeTab === "Questions" && <QuestionsEditor quizState={quizState} setQuizState={setQuizState}/>}
            </div>

            <div className="row mb-3">
                <div className="col-2"></div>
                <div className="col-8">
                    <div>
                        <hr />
                        <button
                            id="wd-assignment-editor-save"
                            className="btn btn-lg btn-danger me-1 float-end"
                            onClick={handleSave}>
                            Save
                        </button>
                        <Link
                            to={`/Kanbas/Courses/${cid}/Quizzes`}
                            id="wd-assignment-editor-cancel"
                            className="btn btn-lg btn-secondary me-1 float-end">
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
