import { useAppSelector } from "./hooks";

type IdeaCardProps = {
    card: IdeaExchange;
    currentCard: number;
}

function IdeaCard({ card, currentCard }: IdeaCardProps) {
    return (
        <li className={currentCard === Number(card.id) ? 'active' : ''}>
            {/*<div className="likes-block">
                <img src="heart.svg"></img>
                <p>{100}</p>
            </div>*/}
            <img className="card-image" src={card.image}></img>
            <div className="idea-info">
                <ul className="idea-tags">
                    {card.tags.map((tag) => <li key={tag.id}>{tag.title}</li>)}
                </ul>
                <div className="idea-data">
                    <h3>{card.title}</h3>
                    <p className="description">{card.description}</p>
                </div>
            </div>
        </li>
    )
}

export default IdeaCard