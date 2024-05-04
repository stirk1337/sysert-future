import { useState } from "react"
import { ideaList } from "../const-data"
import IdeaCard from "./idea-card"

function IdeasBlock() {
    const [currentCard, setCurrentCard] = useState(1)
    const [blockPositions, setBlockPositions] = useState(10)

    function changeCurrentCard(step: number) {
        setCurrentCard(currentCard + step)
        setBlockPositions(blockPositions + (-step * 85))
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
                    {ideaList.map(idea => <IdeaCard key={idea.id} card={idea} currentCard={currentCard} />)}
                </ul>
            </div>
        </section>
    )
}

export default IdeasBlock