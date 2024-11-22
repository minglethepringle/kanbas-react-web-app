import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
const initialState = {
    assignments: [],
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
        addAssignment: (state, { payload: assignment }) => {
            const newAssignment: any = {
                // A + random 3 digit integer between 100 and 999
                _id: "A" + Math.floor(Math.random() * 900 + 100),
                title: assignment.title,
                course: assignment.course,
                description: assignment.description,
                points: assignment.points,
                dueDate: assignment.dueDate,
                availableDate: assignment.availableDate,
            };
            state.assignments = [...state.assignments, newAssignment] as any;
        },
        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (m: any) => m._id !== assignmentId);
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((m: any) =>
                m._id === assignment._id ? assignment : m
            ) as any;
        },
        // editAssignment: (state, { payload: assignmentId }) => {
        //     state.assignments = state.assignments.map((m: any) =>
        //         m._id === assignmentId ? { ...m, editing: true } : m
        //     ) as any;
        // },
    },
});
export const { addAssignment, deleteAssignment, updateAssignment, setAssignments /*editAssignment*/ } =
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;