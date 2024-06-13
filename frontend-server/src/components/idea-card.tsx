import { useAppDispatch, useAppSelector } from "./hooks";
import { likeIdea } from "./store/api-actions/post-actions";

type IdeaCardProps = {
    card: IdeaExchange;
    currentCard: number;
}

function IdeaCard({ card, currentCard }: IdeaCardProps) {
    const dispatch = useAppDispatch()

    const tags = useAppSelector((store) => store.tags)

    function handleLikeClick() {
        dispatch(likeIdea({ id: Number(card.id) }))
    }

    return (
        <li className={currentCard === Number(card.id) ? 'active' : ''}>
            <div className="likes-block">
                <img onClick={handleLikeClick} src="heart.svg"></img>
                <p>{card.likes.length}</p>
            </div>
            <img className="card-image" src={card.image}></img>
            <div className="idea-info">
                <ul className="idea-tags">
                    {card.active_tags.map((currentTag) => <li key={currentTag}>{tags.filter((tag) => Number(tag.id) === currentTag)[0].title}</li>)}
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