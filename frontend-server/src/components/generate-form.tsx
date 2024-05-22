import { ChangeEvent, SyntheticEvent, useState } from "react"
import { generateIdea } from "./store/api-actions/post-actions"
import { useAppDispatch } from "./hooks"
import { clearIdeaData } from "./store/action";

type GenerateFormProps = {
    setLabel: (label: string) => void;
    setHeight: (height: number) => void;
    setEdit: () => void;
    height: number;
}

function GenerateForm({ setLabel, setHeight, setEdit, height }: GenerateFormProps) {
    const dispatch = useAppDispatch()
    const [like, setLike] = useState('')
    const [want, setWant] = useState('')
    const [can, setCan] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(evt: SyntheticEvent) {
        evt.preventDefault()
        if (!like || !want || !can) {
            setError('Поля ввода не должны быть пустыми')
            return
        }

        const data = {
            like: like,
            want: want,
            can: can
        }

        dispatch(generateIdea(data))
        dispatch(clearIdeaData())
        setEdit()
    }

    function handleLike(evt: ChangeEvent<HTMLInputElement>) {
        setLike(evt.target.value)
        setError("")
        if (height < 160) {
            setHeight(160)
            setLabel('тебе хочется')
        }
    }

    function handleWant(evt: ChangeEvent<HTMLInputElement>) {
        setWant(evt.target.value)
        setError("")
        if (height < 260) {
            setHeight(260)
            setLabel('ты умеешь')
        }
    }

    function handleCan(evt: ChangeEvent<HTMLInputElement>) {
        setCan(evt.target.value)
        setError("")
        if (height < 360) {
            setHeight(370)
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ "--form-height": `${height}px` } as React.CSSProperties}>
            <input autoComplete="off" placeholder="Мне нравится..." name="like" value={like} onChange={handleLike}></input>
            <input autoComplete="off" placeholder="Я хочу..." name="want" value={want} onChange={handleWant}></input>
            <input className={error ? 'error-field' : ''} autoComplete="off" placeholder="Я могу..." name="can" value={can} onChange={handleCan}></input>
            <p className="error">{error}</p>
            <button type="submit">Сгенерировать</button>
        </form>
    )
}

export default GenerateForm