import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizzes: [],
};
const quizzesSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        addQuiz: (state, { payload: quiz }) => {
            const newQuiz: any = {
                _id: quiz._id,
                courseId: quiz.courseId,
                details: quiz.details,
                questions: quiz.questions,
            };
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter((m: any) => m._id !== quizId);
        },
        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((m: any) => (m._id === quiz._id ? quiz : m)) as any;
        },
    },
});
export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes /*editAssignment*/ } = quizzesSlice.actions;
export default quizzesSlice.reducer;
