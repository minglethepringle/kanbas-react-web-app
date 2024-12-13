import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { updateQuiz, addQuiz, setQuizzes } from "../reducer";
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
    // Lift all the state up
    const [quizState, setQuizState] = useState({
        _id: qid,
        title: "Quiz",
        course: cid,
        // actually unused in the code
        questions: [],
        description: "",
        points: 0,
        quizType: "Graded Quiz",
        assignmentGroup: "Quizzes",
        shuffleAnswers: false,
        timeLimit: 20,
        multipleAttempts: false,
        howManyAttempts: 1,
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
    const [questions, setQuestions] = useState([]);

    const fetchQuizzes = async () => {
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));

        const existingQuiz = quizzes.find((quiz: any) => quiz._id === qid);
        setQuizState({
            _id: existingQuiz._id,
            title: existingQuiz.details?.title || "Quiz",
            course: existingQuiz.course || cid,
            questions: existingQuiz.questions || [],
            description: existingQuiz.details?.description || "",
            points: existingQuiz.details?.points || 0,
            assignmentGroup: existingQuiz.details?.assignmentGroup || "Quizzes",
            quizType: existingQuiz.details?.quizType || "Graded Quiz",
            shuffleAnswers: existingQuiz.details?.shuffleAnswers || true,
            timeLimit: existingQuiz.details?.timeLimit || 20,
            multipleAttempts: existingQuiz.details?.multipleAttempts || false,
            howManyAttempts: existingQuiz.details?.howManyAttempts || 1,
            showCorrectAnswers: existingQuiz.details?.showCorrectAnswers || true,
            accessCode: existingQuiz.details?.accessCode || "",
            oneQuestionAtATime: existingQuiz.details?.oneQuestionAtATime || false,
            webcamRequired: existingQuiz.details?.webcamRequired || false,
            lockQuestionsAfterAnswering: existingQuiz.details?.lockQuestionsAfterAnswering || false,
            dueDate: existingQuiz.details?.dueDate?.substring(0, 10) || "",
            availableDate: existingQuiz.details?.availableDate?.substring(0, 10) || "",
            untilDate: existingQuiz.details?.untilDate?.substring(0, 10) || "",
            published: existingQuiz.details?.published || false,
        });
        setQuestions(existingQuiz.questions || []);
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);

    // Any time questions change, recalculate points
    useEffect(() => {
        const points = questions.reduce((acc, q: any) => acc + q.points, 0);
        setQuizState({ ...quizState, points });
    }, [questions]);

    // // Load in existing quiz questions
    // useEffect(() => {
    //     const fetchQuestions = async () => {
    //         const questions = await quizzesClient.findQuestionsForQuiz(qid as string);
    //         setQuestions(questions);
    //     };
    //     // if (qid !== "new")
    //         // fetchQuestions();
    // }, [qid]);

    // Handle saving quiz
    const handleSave = async (published: boolean) => {
        // Remove all _id from questions
        const qs: any = questions ? questions.map((question: any) => {
            const { _id, ...rest } = question;
            return rest;
        }) : [];

        const quiz = {
            _id: quizState._id,
            course: quizState.course,
            questions: qs,
            details: {
                title: quizState.title,
                description: quizState.description,
                quizType: quizState.quizType,
                assignmentGroup: quizState.assignmentGroup,
                points: quizState.points,
                shuffleAnswers: quizState.shuffleAnswers,
                timeLimit: quizState.timeLimit,
                multipleAttempts: quizState.multipleAttempts,
                howManyAttempts: quizState.multipleAttempts ? quizState.howManyAttempts : 1,
                showCorrectAnswers: quizState.showCorrectAnswers,
                accessCode: quizState.accessCode,
                oneQuestionAtATime: quizState.oneQuestionAtATime,
                webcamRequired: quizState.webcamRequired,
                lockQuestionsAfterAnswering: quizState.lockQuestionsAfterAnswering,
                dueDate: quizState.dueDate,
                availableDate: quizState.availableDate,
                untilDate: quizState.untilDate,
                published: published || quizState.published,
            },
        };

        // if (editing) {
            await quizzesClient.updateQuiz(quiz);
            dispatch(updateQuiz(quiz));
        // } else {
            // quiz.course = cid!;
            // const newQuiz = await coursesClient.createQuizForCourse(cid!, quiz);
            // dispatch(addQuiz(newQuiz));
        // }

        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`);
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
                <div className={activeTab !== "Details" ? "d-none" : ""}>
                    <DetailsEditor quizState={quizState} setQuizState={setQuizState} />
                </div>
                <div className={activeTab !== "Questions" ? "d-none" : ""}>
                    <QuestionsEditor questions={questions} setQuestions={setQuestions} />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-2"></div>
                <div className="col-8">
                    <div>
                        <hr />
                        <button
                            className="btn btn-lg btn-success me-1 float-end"
                            onClick={() => handleSave(true)}>
                            Save and Publish
                        </button>
                        <button
                            id="wd-assignment-editor-save"
                            className="btn btn-lg btn-danger me-1 float-end"
                            onClick={() => handleSave(false)}>
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
