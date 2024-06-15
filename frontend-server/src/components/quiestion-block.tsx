import { useEffect, useState } from "react"
import QuestionHeaderCircles from "./quiestions-header-circles"
import RadioButton from "./radio-button"

type QuestionBlockProps = {
    questions: SuccessDetectorBlock[]
    onFinish: (progress: number) => void
}

function QuestionBlock({ questions, onFinish }: QuestionBlockProps) {
    const [questionIndex, setQuestionIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState<SuccessDetectorBlock>(questions[0])
    const [currentBlockProgress, setCurrentBlockProgress] = useState<boolean[]>([])
    const [isAnswerClicked, setIsAnswerClicked] = useState(false)

    useEffect(() => {
        const firstUncompleted = questions[0]
        setQuestionIndex(questions.findIndex(question => question.id === firstUncompleted.id) + 1)
        setCurrentQuestion(firstUncompleted)
        setCurrentBlockProgress(questions.map(() => false))
    }, [])

    function handleClick(id: string) {
        const clickedQuestion = questions.find(question => question.id === id)
        if (clickedQuestion) {
            const currentQuestionIndex = questions.findIndex(question => question.id === clickedQuestion.id) + 1
            changeProgress(questionIndex)
            setCurrentQuestion(clickedQuestion)
            setQuestionIndex(currentQuestionIndex)
        }
    }

    function handleClickNextButton() {
        if (questionIndex < questions.length) {
            setCurrentQuestion(questions[questionIndex])
            setQuestionIndex(questionIndex + 1)
            changeProgress(questionIndex)
        }
        else {
            changeProgress(questionIndex)
            onFinish(currentBlockProgress.filter(question => question).length)
        }
        setIsAnswerClicked(false)
    }

    function changeProgress(questionIndex: number) {
        if (currentQuestion.is_test && !isAnswerClicked) return
        currentBlockProgress[questionIndex - 1] = true
        setCurrentBlockProgress([...currentBlockProgress])
    }

    function handleClickBackButton() {
        if (questionIndex > 1) {
            setCurrentQuestion(questions[questionIndex - 2])
            setQuestionIndex(questionIndex - 1)
        }
    }

    function handleAnswer() {
        setIsAnswerClicked(true)
    }

    return (
        <div className="questions-block">
            <div className="questions-menu">
                <p>{questionIndex}/{questions.length}</p>
                <div className="questions-circles-block">
                    {questions.map((question, index) => <QuestionHeaderCircles id={question.id} isQuestion={question.is_test ? true : false} isCompleted={currentBlockProgress[index]} handleClick={handleClick} />)}
                </div>
            </div>
            <div className="question-container">
                <div className="question-content">
                    {!currentQuestion.is_test && <h2>{currentQuestion.title}</h2>}
                    <div className="flex">
                        {currentQuestion.is_test && <div className="questions">
                            <h2>{currentQuestion.title}</h2>
                            {currentQuestion.answer1 && <RadioButton key={1} id={'1'} onClick={handleAnswer} value={currentQuestion.answer1} name={"question"} />}
                            {currentQuestion.answer2 && <RadioButton key={2} id={'2'} onClick={handleAnswer} value={currentQuestion.answer2} name={"question"} />}
                            {currentQuestion.answer3 && <RadioButton key={3} id={'3'} onClick={handleAnswer} value={currentQuestion.answer3} name={"question"} />}
                        </div>}
                        <div className="question-text">
                            <p dangerouslySetInnerHTML={{ __html: currentQuestion.description }}></p>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button className="back" onClick={handleClickBackButton}>Назад</button>
                    <button className="forward" onClick={handleClickNextButton}>{questionIndex === questions.length ? 'Завершить' : 'Дальше'}</button>
                </div>
            </div>
        </div >
    )
}

export default QuestionBlock