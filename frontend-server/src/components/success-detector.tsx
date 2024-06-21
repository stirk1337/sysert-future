import { useEffect, useRef, useState } from "react"
import SuccessCard from "./success-card"
import PreviewSuccessDot from "./preview-success-dot"
import QuestionBlock from "./quiestion-block"
import ResultBlock from "./result-block"
import { useAppDispatch, useAppSelector } from "./hooks"
import { getSuccessData } from "./store/api-actions/get-actions"

function SuccessDetector() {
    const itemsRefs = useRef<(HTMLElement | null)[]>([])
    const listBlockRef = useRef<HTMLUListElement | null>(null)

    const dispatch = useAppDispatch()
    const successData = useAppSelector((store) => store.successData)

    const [itemsVisibilityStatuses, setItemsVisibility] = useState<boolean[]>([])
    const [currentQuestionsBlock, setCurrentQuestionsBlock] = useState<SuccessDetector | null>(null)
    const [isResultBlock, setIsResultBlock] = useState<boolean>(false)
    const [percentProgress, setPercentProgress] = useState(0)
    const [isCompleted, setIsCompleted] = useState<string | null>(null)

    useEffect(() => {
        setIsCompleted(localStorage.getItem('success'))
    }, [])

    useEffect(() => {
        setIsResultBlock(false)
        dispatch(getSuccessData())
    }, [])

    useEffect(() => {
        setVisibilityStatus()
    }, [successData])

    function setVisibilityStatus() {
        const itemsVisibilityStatuses: boolean[] = []

        itemsRefs.current.forEach((ref) => {
            if (ref && isElementInViewport(ref)) {
                itemsVisibilityStatuses.push(true)
            }
            else {
                itemsVisibilityStatuses.push(false)
            }
        });
        setItemsVisibility(itemsVisibilityStatuses)
    }

    function findFirstUnvisibleItem() {
        const VisibleItemsIndexes: number[] = []

        itemsRefs.current.forEach((ref, index) => {
            if (ref && isElementInViewport(ref)) {
                VisibleItemsIndexes.push(index)
            }
        });
        setVisibilityStatus()
        return VisibleItemsIndexes
    }

    function isElementInViewport(el: HTMLElement) {
        if (!listBlockRef.current) return;
        const rect = el.getBoundingClientRect();
        const blockRect = listBlockRef.current.getBoundingClientRect()
        return (
            rect.top >= blockRect.top &&
            rect.left >= blockRect.left &&
            rect.bottom <= blockRect.bottom &&
            rect.right <= blockRect.right
        );
    }

    function addItemRef(ref: HTMLElement) {
        if (successData.length === itemsRefs.current.length) return
        itemsRefs.current.push(ref)
    }

    function scrollTo(step: number) {
        const arrayStatusVisibility = findFirstUnvisibleItem()
        let currentIndex = 0
        if (step > 0) {
            currentIndex = arrayStatusVisibility[arrayStatusVisibility.length - 1] + 2
        }
        else {
            currentIndex = arrayStatusVisibility[0] - 2
        }
        itemsRefs.current[currentIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }

    function handleCLick(id: string) {
        const clickedBlock = successData.find(item => item.id === id)
        if (clickedBlock) setCurrentQuestionsBlock(clickedBlock)
    }

    function finishBlock(progress: number) {
        const numberQuestions = currentQuestionsBlock?.items ? currentQuestionsBlock.items.length : 0
        const currentPercentage = localStorage.getItem(currentQuestionsBlock?.id || '0') || 0
        if (currentPercentage !== null && numberQuestions !== 0 && currentQuestionsBlock) {
            const percentage = Math.floor(progress / numberQuestions * 100)
            setPercentProgress(percentage)
            if (Number(currentPercentage) < percentage)
                localStorage.setItem(currentQuestionsBlock?.id, String(percentage))
        }
        else if (currentQuestionsBlock) {
            setPercentProgress(100)
            localStorage.setItem(currentQuestionsBlock?.id, '100')
        }
        setIsResultBlock(true)
        localStorage.setItem('success', 'completed')
        setIsCompleted('completed')
    }

    function onClose() {
        setCurrentQuestionsBlock(null)
        setIsResultBlock(false)
    }


    return (
        <>
            <section id="success-block" className={isCompleted ? 'completed' : ''}>
                <h2>Детектор успеха</h2>
                <p>Вокруг Завода появилось много инициатив. Представь себя на месте создателя одного из проектов и проверь, получилось ли у тебя повторить такой успех</p>
                <div className="success-items-block">
                    <div className="items-carousel-block">
                        <div className="up-arrow">
                            <img onClick={() => scrollTo(-1)} src="/arrow.svg"></img>
                        </div>
                        <ul onScroll={setVisibilityStatus} ref={listBlockRef} className="success-list">
                            {successData.map((item) => <SuccessCard key={item.id} handleClick={handleCLick} addRef={addItemRef} successCardData={item} />)}
                        </ul>
                        <div className="down-arrow">
                            <img onClick={() => scrollTo(1)} src="/arrow.svg"></img>
                        </div>
                    </div>
                    <div className="preview-items">
                        {itemsVisibilityStatuses.map((item, index) => <PreviewSuccessDot key={index} isBig={item} />)}
                    </div>
                </div>
                {!isResultBlock && currentQuestionsBlock && <QuestionBlock questions={currentQuestionsBlock.items} onFinish={finishBlock} />}
                {isResultBlock && <ResultBlock onClose={onClose} progress={percentProgress} />}
            </section>
            {currentQuestionsBlock && <div onClick={onClose} className="pop-up-background"></div>}
        </>
    )
}

export default SuccessDetector