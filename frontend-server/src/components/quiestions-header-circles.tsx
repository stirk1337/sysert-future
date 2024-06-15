type QuestionHeaderCircles = {
    id: string,
    isCompleted: boolean,
    isQuestion: boolean,
    handleClick: (id: string) => void,
}

function QuestionHeaderCircles({ id, isCompleted, isQuestion, handleClick }: QuestionHeaderCircles) {
    return (
        <div className={`question-dot ${isQuestion ? 'question' : 'text'} ${isCompleted ? 'completed' : ''}`} onClick={() => handleClick(id)}></div>
    )
}

export default QuestionHeaderCircles