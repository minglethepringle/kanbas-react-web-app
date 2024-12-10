import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({ withCredentials: true });
export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};
export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};

export const publishQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/publish`);
    return response.data;
}

export const createQuestionForQuiz = async (quizId: string, question: any) => {
    const response = await axiosWithCredentials.post(
        `${QUIZZES_API}/${quizId}/questions`,
        question
    );
    return response.data;
}

export const findQuestionsForQuiz = async (quizId: string) => {
    const response = await axios
        .get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
}

export const findQuestionById = async (quizId: string, questionId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
    return response.data;
}

export const deleteQuestion = async (quizId: string, questionId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
    return response.data;
};

export const updateQuestion = async (quizId: string, question: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quizId}/questions/${question._id}`, question);
    return data;
};
