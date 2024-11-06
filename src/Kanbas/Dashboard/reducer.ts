import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
const initialState = {
    enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: enrollment }) => {
            const newEnrollment: any = {
                _id: Math.floor(Math.random() * 900 + 100),
                user: enrollment.user,
                course: enrollment.course,
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        deleteEnrollment: (state, { payload: enrollmentId }) => {
            state.enrollments = state.enrollments.filter(
                (m: any) => m._id !== enrollmentId);
        }
    },
});
export const { addEnrollment, deleteEnrollment } =
    enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;