type IdeaCardProps = {
    card: ideaCardType;
    currentCard: number;
}

function IdeaCard({ card, currentCard }: IdeaCardProps) {

    return (
        <li className={currentCard === Number(card.id) ? 'active' : ''}>
            <div className="idea-info">
                <h3>{card.name}</h3>
                <p className="description">{card.description}</p>
                <ul>
                    {card.tags.map((tag, index) => <li key={index}>{tag}</li>)}
                </ul>
                <div className="likes-block">
                    <img src="heart.svg"></img>
                    <p>{card.likes}</p>
                </div>
            </div>
            <img src={`/${card.img}.png`} width={369} height={226}></img>
        </li>
    )
}

export default IdeaCard