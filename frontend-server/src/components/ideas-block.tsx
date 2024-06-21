import { useEffect, useState } from "react"
import IdeaCard from "./idea-card"
import { useAppDispatch, useAppSelector } from "./hooks"
import { getIdeas } from "./store/api-actions/get-actions"

function IdeasBlock() {
    const dispatch = useAppDispatch()
    const ideasListData = useAppSelector((store) => store.ideas)
    const userData = useAppSelector((store) => store.userData)

    const [currentCard, setCurrentCard] = useState(0)
    const [blockPositions, setBlockPositions] = useState(-10)
    const [isUserCards, setUserCards] = useState(false)
    const [ideasList, setIdeasList] = useState<IdeaExchange[]>(ideasListData)
    const [isCompleted, setIsCompleted] = useState<string | null>(null)

    useEffect(() => {
        dispatch(getIdeas())
        setIsCompleted(localStorage.getItem('ideas'))
    }, [])

    useEffect(() => {
        if (isUserCards) {
            const currentIdeaList = ideasListData.filter((idea) => idea.created_by === userData.id)
            console.log(currentIdeaList)
            setIdeasList(currentIdeaList)
        }
        else {
            setIdeasList(ideasListData)
        }
    }, [ideasListData, isUserCards])

    function changeCurrentCard(step: number) {
        if (currentCard + step < 0) {
            return
        }
        setCurrentCard(currentCard + step)
        setBlockPositions(blockPositions + (-step * 30))
    }

    function changeToggle() {
        setUserCards(!isUserCards)
    }

    function handleComplete() {
        localStorage.setItem('ideas', 'completed')
        setIsCompleted('completed')
    }

    return (
        <section id="ideas" className={isCompleted ? 'completed' : ''}>
            <h2>Меняющие культуру идеи</h2>
            <p>Фраза, которая рассказывает, что в этом блоке находятся идеи, которые создали другие люди, и мотивация просмотреть и оценить их.</p>
            <div className="card-block-with-controls">
                <div className="controls">
                    <img onClick={() => { changeCurrentCard(-1) }} src="arrow.svg"></img>
                    <img onClick={() => { changeCurrentCard(1) }} src="arrow.svg"></img>
                </div>
                {userData.id !== 0 &&
                    <div className="toggle-container">
                        <button onClick={changeToggle} className={`form-toggle ${isUserCards ? 'user-cards' : 'all-cards'}`}>
                            <div className={`toggle ${isUserCards ? 'edit-mode' : 'ai-mode'}`}></div>
                        </button>
                        <p>Только свои идеи</p>
                    </div>
                }
                <ul className="ideas-list" style={{ left: blockPositions + '%' }}>
                    {ideasList.map(idea => <IdeaCard key={idea.id} handleComplete={handleComplete} card={idea} currentCard={currentCard} />)}
                </ul>
            </div>
        </section>
    )
}

export default IdeasBlock