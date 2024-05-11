import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import { generateIdea } from "./store/api-actions/post-actions"
import { useAppDispatch, useAppSelector } from "./hooks"
import ProgressBar from "@ramonak/react-progress-bar"

function GenerateIdeaBlock() {
    const dispatch = useAppDispatch()

    const ideaData = useAppSelector(store => store.idea)
    const isLoading = useAppSelector(store => store.ideaIsLoading)

    const [like, setLike] = useState('')
    const [want, setWant] = useState('')
    const [can, setCan] = useState('')
    const [progress, setProgress] = useState(0)
    const [intervalId, setIntervalId] = useState(0);
    const [error, setError] = useState(false);

    useEffect(() => {
        let id = 0
        const incrementProgress = () => {
            setProgress(prevProgress => prevProgress + 1)
        }

        if (isLoading && progress <= 98) {
            id = setInterval(incrementProgress, 250)
            setIntervalId(id)
        }
        else {
            clearInterval(intervalId)
        }

        return () => clearInterval(id)
    }, [progress, isLoading])

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

        if (like.length === 0 || want.length === 0 || can.length === 0) {
            setError(true)
            return
        }

        if (!intervalId) {
            setProgress(0)
        }

        dispatch(generateIdea(data)).then(() => {
            clearInterval(intervalId)
            setProgress(0)
        })
    }

    return (
        <section id="generate-idea">
            <form onSubmit={handleSubmit}>
                <label htmlFor="like">Что тебе нравится?</label>
                <input autoComplete="off" id="like" name="like" value={like} onChange={handleLike}></input>
                <label htmlFor="want">Что тебе хотелось бы сделать?</label>
                <input autoComplete="off" id="want" name="want" value={want} onChange={handleWant}></input>
                <label htmlFor="can">Что ты умеешь?</label>
                <input autoComplete="off" id="can" name="can" value={can} onChange={handleCan}></input>
                {error && <p className="error">Поля не должны быть пустыми</p>}
                {!isLoading && <button type="submit">Сгенерировать идею</button>}
            </form>
            {isLoading &&
                <>
                    <p>Ваша идея создаётся</p>
                    <ProgressBar completed={progress} customLabel=" " bgColor="#c1ed32" transitionTimingFunction={'linear'} />
                </>}
            {!isLoading && ideaData.image !== '' && <div className="generate-result">
                <p>{ideaData.data}</p>
                <img src={ideaData.image}></img>
            </div>}
        </section>
    )
}

export default GenerateIdeaBlock