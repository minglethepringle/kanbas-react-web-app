import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({ withCredentials: true });

interface Attempt {
    userId: string,
    answers: { questionId: string, studentAnswer: string }[]
}

export const getNumberOfAttempts = async (quizId: string, userId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/${userId}`);
    return response.data;
}

export const getLatestAttempt = async (quizId: string, userId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/${userId}/latest`);
    return response.data;
}

export const submitQuiz = async (quizId: string, attempt: Attempt) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/submit`, attempt);
    return response.data;
}

