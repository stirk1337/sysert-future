import { useEffect, useState } from "react"
import IdeaCard from "./idea-card"
import { useAppDispatch, useAppSelector } from "./hooks"
import { getIdeas } from "./store/api-actions/get-actions"

function IdeasBlock() {
    const dispatch = useAppDispatch()
    const ideasList = useAppSelector((store) => store.ideas)

    const [currentCard, setCurrentCard] = useState(0)
    const [blockPositions, setBlockPositions] = useState(-10)

    useEffect(() => {
        dispatch(getIdeas())
    }, [])

    function changeCurrentCard(step: number) {
        if (currentCard + step < 0 || currentCard + step > ideasList.length + 3) {
            return
        }
        setCurrentCard(currentCard + step)
        setBlockPositions(blockPositions + (-step * 30))
    }

    return (
        <section id="ideas">
            <h2>Все блестящие идеи</h2>
            <p>Добро пожаловать на биржу идей! Здесь любой человек может опубликовать собственную идею, а также посмотреть на идеи других людей и оценить их</p>
            <div className="card-block-with-controls">
                <div className="controls">
                    <img onClick={() => { changeCurrentCard(-1) }} src="arrow.svg"></img>
                    <img onClick={() => { changeCurrentCard(1) }} src="arrow.svg"></img>
                </div>
                <ul className="ideas-list" style={{ left: blockPositions + '%' }}>
                    {ideasList.map(idea => <IdeaCard key={idea.id} card={idea} currentCard={currentCard} />)}
                </ul>
            </div>
        </section>
    )
}

export default IdeasBlock