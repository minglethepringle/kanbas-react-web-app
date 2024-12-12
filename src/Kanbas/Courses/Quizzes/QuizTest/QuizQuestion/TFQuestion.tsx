interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface TFQuestionProps {
    answers: Answer[];
    onAnswerChange: (questionId: string, answer: string ) => void;
}

export default function TFQuestion({ answers, onAnswerChange }: TFQuestionProps) {
    return (
        <div>
            {answers.map((answer) => (
                <div key={answer.id} className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="tf-question"
                        id={answer.id}
                    />
                    <label className="form-check-label" htmlFor={answer.id}>
                        {answer.text}
                    </label>
                </div>
            ))}
        </div>
    );
}
