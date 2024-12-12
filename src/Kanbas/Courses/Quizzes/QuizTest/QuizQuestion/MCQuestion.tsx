interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface MCQuestionProps {
    answers: Answer[];
    onAnswerChange: (questionId: string, answer: string ) => void;
}

export default function MCQuestion({ answers, onAnswerChange }: MCQuestionProps) {
    return (
        <div>
            {answers.map((answer) => (
                <div key={answer.id} className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="mc-question"
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
