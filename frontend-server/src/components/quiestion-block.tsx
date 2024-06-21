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
    const [currentAnswer, setCurrentAnswer] = useState('')
    const [questionsArray, setQuestionArray] = useState([currentQuestion.answer1, currentQuestion.answer2, currentQuestion.answer3])


    useEffect(() => {
        const firstUncompleted = questions[0]
        setQuestionIndex(questions.findIndex(question => question.id === firstUncompleted.id) + 1)
        setCurrentQuestion(firstUncompleted)
        setCurrentBlockProgress(questions.map(() => false))
    }, [])

    useEffect(() => {
        setQuestionArray(shuffleArray([currentQuestion.answer1, currentQuestion.answer2, currentQuestion.answer3]))
    }, [currentQuestion.answer1, currentQuestion.answer2, currentQuestion.answer3])

    function shuffleArray<T>(array: T[]): T[] {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

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
        setCurrentAnswer('')
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
            changeProgress(questionIndex)
        }
        setIsAnswerClicked(false)
        setCurrentAnswer('')
    }

    function handleAnswer(evt: React.ChangeEvent<HTMLInputElement>) {
        setCurrentAnswer(evt.target.value)

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
                            {questionsArray.map((question, index) => (question && <RadioButton isCorrect={question === currentQuestion.answer1} show={isAnswerClicked} key={index} id={String(index)} onClick={handleAnswer} value={question} name={"question"} selectedAnswer={currentAnswer} />))}
                            {isAnswerClicked && <div>
                                <p>{currentQuestion.after_test}</p>
                            </div>}
                        </div>}
                        <div className="question-text">
                            <p dangerouslySetInnerHTML={{ __html: currentQuestion.description }}></p>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    {questionIndex !== 1 && <button className="back" onClick={handleClickBackButton}>Назад</button>}
                    <button className="forward" onClick={handleClickNextButton}>{questionIndex === questions.length ? 'Завершить' : 'Дальше'}</button>
                </div>
            </div>
        </div >
    )
}

export default QuestionBlock