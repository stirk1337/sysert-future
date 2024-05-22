import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import { generateImage, saveIdea } from "./store/api-actions/post-actions"
import { CircularProgress, Skeleton } from "@mui/material"
import { changeTagStatus, setIdeaData } from "./store/action"
import { LoadingStatuses, LoadingStatusesContent } from "../enums"

type EditFormProps = {
    loadingStatus: LoadingStatuses
    changeLoadStatus: (status: LoadingStatuses) => void
}

function EditForm({ loadingStatus, changeLoadStatus }: EditFormProps) {
    const dispatch = useAppDispatch()
    const isDataLoading = useAppSelector((store) => store.ideaIsLoading)
    const isImageLoading = useAppSelector((store) => store.imageIsLoading)
    const tagsData = useAppSelector((store) => store.tags)

    const ideaData = useAppSelector(store => store.idea)

    const [ideaName, setIdeaName] = useState('')
    const [description, setIdeaDescription] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        setIdeaName(ideaData.title)
        setIdeaDescription(ideaData.description)
    }, [ideaData])

    function handleIdeaName(evt: ChangeEvent<HTMLInputElement>) {
        setIdeaName(evt.target.value)
        setError('')
        changeLoadStatus(LoadingStatuses.default)
    }

    function handleDescription(evt: ChangeEvent<HTMLTextAreaElement>) {
        setIdeaDescription(evt.target.value)
        changeLoadStatus(LoadingStatuses.default)
    }

    function handleGenerateImage() {
        if (ideaName) {
            dispatch(setIdeaData({ title: ideaName, description: description }))
            dispatch(generateImage({ ideaName: ideaName }))
            changeLoadStatus(LoadingStatuses.default)
        }
        else {
            setError('Поле заголовка не должно быть пустым')
        }
    }

    function selectTag(id: string) {
        if (tagsData.filter(tag => tag.selected).length > 4 && !tagsData.filter(tag => tag.id === id)[0].selected) {
            return
        }
        dispatch(changeTagStatus(id))
        changeLoadStatus(LoadingStatuses.default)
    }

    function submitForm(evt: SyntheticEvent) {
        evt.preventDefault()
        if (ideaName && loadingStatus === LoadingStatuses.default) {
            const idea = {
                tags: tagsData.filter(tag => tag.selected).map(tag => tag.id),
                title: ideaName.replace(/"/g, ''),
                description: description,
                image: ideaData.image.split(',')[1]
            }
            changeLoadStatus(LoadingStatuses.loading)
            dispatch(saveIdea(idea)).then(() => changeLoadStatus(LoadingStatuses.loaded))
        }
        else if (!ideaName) {
            setError('Поле заголовка не должно быть пустым')
        }
    }

    function handleOnBlur() {
        const idea: IdeaData = {
            title: ideaName,
            description: description
        }
        dispatch(setIdeaData(idea))
    }

    return (
        <form onSubmit={submitForm}>
            <label htmlFor="name">Заголовок</label>
            <input className={error ? 'error-field' : ''} disabled={isDataLoading} autoComplete="off" id="name" name="name" value={ideaName} onChange={handleIdeaName} onBlur={handleOnBlur}></input>
            <p className="error">{error}</p>
            <label htmlFor="description">Описание</label>
            <textarea autoComplete="off" disabled={isDataLoading} id="description" name="description" value={description} onChange={handleDescription} onBlur={handleOnBlur}></textarea>
            <div className="flex-block">
                <div>
                    <h3>Изображение</h3>
                    <div className="image-block">
                        {(!isDataLoading && !isImageLoading) ?
                            <>
                                <div className="hover-block" onClick={handleGenerateImage}>Сгенерировать</div>
                                <img src={ideaData.image ? ideaData.image : '/bridge.png'} width={391} height={223}></img>
                            </>
                            :
                            <div className="loading">
                                <div className="progress">
                                    <CircularProgress />
                                </div>
                                <Skeleton animation="wave" variant="rectangular" width={391} height={223} />
                            </div>
                        }
                    </div>
                </div>
                <div className="tags">
                    <h3>Теги</h3>
                    <ul>
                        {tagsData.map(tag => <li onClick={() => selectTag(tag.id)} key={tag.id} id={tag.id} className={tag.selected ? 'active' : ''}>{tag.title}</li>)}
                    </ul>
                </div>
            </div>
            {!isDataLoading && !isImageLoading && <button className={loadingStatus}>{LoadingStatusesContent[loadingStatus]}</button>}
        </form>
    )
}

export default EditForm