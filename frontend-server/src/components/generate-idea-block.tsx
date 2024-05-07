import { ChangeEvent, SyntheticEvent, useState } from "react"
import { generateIdea } from "./store/api-actions/get-actions"
import { useAppDispatch, useAppSelector } from "./hooks"

function GenerateIdeaBlock() {
    const dispatch = useAppDispatch()

    const ideaData = useAppSelector(store => store.idea)
    const isLoading = useAppSelector(store => store.ideaIsLoading)

    const [like, setLike] = useState('')
    const [want, setWant] = useState('')
    const [can, setCan] = useState('')

    function handleLike(evt: ChangeEvent<HTMLInputElement>) {
        setLike(evt.target.value)
    }

    function handleWant(evt: ChangeEvent<HTMLInputElement>) {
        setWant(evt.target.value)
    }

    function handleCan(evt: ChangeEvent<HTMLInputElement>) {
        setCan(evt.target.value)
    }

    function handleSubmit(evt: SyntheticEvent) {
        evt.preventDefault()
        const data = {
            like: like,
            want: want,
            can: can
        }
        dispatch(generateIdea(data))
    }

    return (
        <section id="generate-idea">
            <form onSubmit={handleSubmit}>
                <label htmlFor="like">Что тебе нравится?</label>
                <input id="like" name="like" value={like} onChange={handleLike}></input>
                <label htmlFor="want">Что тебе хотелось бы сделать?</label>
                <input id="want" name="want" value={want} onChange={handleWant}></input>
                <label htmlFor="can">Что ты умеешь?</label>
                <input id="can" name="can" value={can} onChange={handleCan}></input>
                {!isLoading && <button type="submit">Сгенерировать идею</button>}
            </form>
            {isLoading && <><p>Ваша идея создаётся</p><img src="loading.gif"></img></>}
            {!isLoading && ideaData.image !== '' && <div className="generate-result">
                <p>Готовая идея</p>
                <p>{ideaData.data}</p>
                <img src={ideaData.image}></img>
            </div>}
        </section>
    )
}

export default GenerateIdeaBlock