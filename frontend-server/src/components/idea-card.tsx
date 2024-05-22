import { useAppSelector } from "./hooks";

type IdeaCardProps = {
    card: IdeaExchange;
    currentCard: number;
}

function IdeaCard({ card, currentCard }: IdeaCardProps) {
    const tags = useAppSelector((store) => store.tags)

    return (
        <li className={currentCard === Number(card.id) ? 'active' : ''}>
            {/*<div className="likes-block">
                <img src="heart.svg"></img>
                <p>{100}</p>
            </div>*/}
            <img className="card-image" src={card.image}></img>
            <div className="idea-info">
                <ul className="idea-tags">
                    {tags.map((tag, index) => <li key={index}>{tag.title}</li>)}
                </ul>
                <h3>{card.title}</h3>
                <p className="description">{card.description}</p>
            </div>
        </li>
    )
}

export default IdeaCard