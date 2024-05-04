import { Draggable } from "react-beautiful-dnd"

type HistoryCardType = {
    id: string;
    index: number;
    cardData: historyListType;
}

function HistoryCard({ id, index, cardData }: HistoryCardType) {
    console.log(id, index, cardData)
    return (
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <li className="history-card" {...provided.draggableProps}  {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className="card-info">
                        <h3>{cardData.name}</h3>
                        <p>{cardData.description}</p>
                    </div>
                    <div className="card-date">
                        <img src="/image 11.png"></img>
                        <p>{cardData.date}</p>
                    </div>
                </li>
            )}
        </Draggable>
    )
}

export default HistoryCard