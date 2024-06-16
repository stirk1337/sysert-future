import { Draggable } from "react-beautiful-dnd"

type HistoryCardType = {
    id: number;
    index: number;
    cardData: HistoryData;
}

function HistoryCard({ id, index, cardData }: HistoryCardType) {
    return (
        <Draggable draggableId={String(id)} index={index}>
            {(provided) => (
                <li className="history-card" {...provided.draggableProps}  {...provided.dragHandleProps} ref={provided.innerRef}>
                    <img className="puzzle-part" src={`/history-puzzle/puzzle-${id}.png`}></img>
                    <div className="card-info">
                        <h3>{cardData.title}</h3>
                        <p dangerouslySetInnerHTML={{ __html: cardData.description }}></p>
                    </div>
                    <div className="card-date">
                        <div dangerouslySetInnerHTML={{ __html: cardData.image_url }}></div>
                        <p>{cardData.date}</p>
                    </div>
                </li>
            )}
        </Draggable>
    )
}

export default HistoryCard