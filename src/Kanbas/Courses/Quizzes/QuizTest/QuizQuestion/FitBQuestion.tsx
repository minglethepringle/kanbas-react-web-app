// interface Answer {
//     id: string;
//     text: string;
//     isCorrect: boolean;
// }

interface FitBQuestionProps {
    onAnswerChange: (questionId: string, answer: string ) => void;
 }

export default function FitBQuestion({onAnswerChange} : FitBQuestionProps) {
    return (
        <div>
            <input
                type="text"
                className="form-control"
                // id={answer.id}
                name="fitb-question"
                placeholder="Enter your answer"
            />
            {/* {answers.map((answer) => (
                <div key={answer.id} className="mb-3"></div>
            ))} */}
        </div>
    );
}
