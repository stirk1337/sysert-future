import { useEffect, useRef, useState } from "react"
import IdeaCard from "./idea-card"
import { useAppDispatch, useAppSelector } from "./hooks"
import { getIdeas } from "./store/api-actions/get-actions"
import { setIdeaSaved } from "./store/action"

function IdeasBlock() {
    const dispatch = useAppDispatch()

    const itemsRefs = useRef<(HTMLElement | null)[]>([])
    const listBlockRef = useRef<HTMLDivElement | null>(null)

    const ideasListData = useAppSelector((store) => store.ideas)
    const userData = useAppSelector((store) => store.userData)
    const isIdeaSaved = useAppSelector((store) => store.isIdeaSaved)

    const [ideasList, setIdeasList] = useState<IdeaExchange[]>(ideasListData)
    const [isCompleted, setIsCompleted] = useState<string | null>(null)

    useEffect(() => {
        dispatch(getIdeas())
        setIsCompleted(localStorage.getItem('ideas'))
    }, [])

    useEffect(() => {
        if (isIdeaSaved && userData.id !== 0) {
            const currentIdeaList = ideasListData.filter((idea) => idea.created_by === userData.id)
            console.log(currentIdeaList)
            setIdeasList(currentIdeaList)
        }
        else {
            setIdeasList(ideasListData)
        }
    }, [ideasListData, isIdeaSaved])

    function changeToggle() {
        dispatch(setIdeaSaved(!isIdeaSaved))
    }

    function handleComplete() {
        localStorage.setItem('ideas', 'completed')
        setIsCompleted('completed')
    }

    useEffect(() => {
        setVisibilityStatus()
    }, [ideasListData])

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
        if (ideasListData.length === itemsRefs.current.length) return
        itemsRefs.current.push(ref)
    }

    function scrollTo(step: number) {
        const arrayStatusVisibility = findFirstUnvisibleItem()
        console.log(arrayStatusVisibility)
        let currentIndex = 0
        if (step > 0) {
            currentIndex = arrayStatusVisibility[arrayStatusVisibility.length - 1] + 2
        }
        else {
            currentIndex = arrayStatusVisibility[0] - 2
        }
        itemsRefs.current[currentIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }

    return (
        <section id="ideas" className={isCompleted ? 'completed' : ''}>
            <h2>Меняющие культуру идеи</h2>
            <p>Фраза, которая рассказывает, что в этом блоке находятся идеи, которые создали другие люди, и мотивация просмотреть и оценить их.</p>
            <div className="card-block-with-controls" ref={listBlockRef}>
                <div className="controls">
                    <img onClick={() => scrollTo(-1)} src="arrow.svg"></img>
                    <img onClick={() => scrollTo(1)} src="arrow.svg"></img>
                </div>
                {userData.id !== 0 &&
                    <div className="toggle-container">
                        <button onClick={changeToggle} className={`form-toggle ${isIdeaSaved ? 'user-cards' : 'all-cards'}`}>
                            <div className={`toggle ${isIdeaSaved ? 'edit-mode' : 'ai-mode'}`}></div>
                        </button>
                        <p>Только свои идеи</p>
                    </div>
                }
                <ul className="ideas-list">
                    {ideasList.map(idea => <IdeaCard key={idea.id} handleComplete={handleComplete} card={idea} addRef={addItemRef} />)}
                </ul>
            </div>
        </section>
    )
}

export default IdeasBlock