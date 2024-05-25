import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { historyList } from '../const-data'
import HistoryCard from './history-cards'
import { useState } from 'react'

function HistoryBlock() {
    const [historyCards, setHistoryCards] = useState(historyList)


    function onDragEnd(result: DropResult) {
        const { source, destination } = result;
        if (!destination) return;

        const array = [...historyCards]
        const element = array[source.index]
        array.splice(source.index, 1)
        array.splice(destination.index, 0, element)
        setHistoryCards([...array])
    }

    return (
        <div className="history-block">
            <section id="history">
                <h2>Как это было?</h2>
                <p>Собери реку в правильном порядке и узнай больше о городе</p>

                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="constructor-list-block">
                        <Droppable droppableId={'1'}>
                            {(provided) => (
                                <ul
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}>
                                    {historyCards.map((data, index) => <HistoryCard key={data.id} index={index} id={data.id} cardData={data} />)}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>

            </section>
        </div>
    )
}

export default HistoryBlock