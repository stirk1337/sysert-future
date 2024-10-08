import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setModal } from "./store/action";
import { likeIdea } from "./store/api-actions/post-actions";

type IdeaCardProps = {
    card: IdeaExchange;
    handleComplete: () => void;
    addRef: (ref: HTMLElement) => void;
}

function IdeaCard({ card, handleComplete, addRef }: IdeaCardProps) {
    const dispatch = useAppDispatch()

    const tags = useAppSelector((store) => store.tags)
    const userData = useAppSelector((store) => store.userData)

    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        if (card.likes.filter((like) => String(like.id) === String(userData.id)).length > 0) {
            setIsLiked(true)
        }
        else {
            setIsLiked(false)
        }
    }, [card, userData.id])

    function handleLikeClick() {
        if (userData.id === 0) {
            dispatch(setModal(true))
            document.getElementsByTagName("body")[0].style.overflow = 'hidden';
            document.getElementsByTagName("html")[0].style.overflow = 'hidden';
        }
        else {
            dispatch(likeIdea({ id: Number(card.id) }))
            handleComplete()
        }
    }

    function getTagTitle(currentTag: number) {
        const tag = tags.filter((tag) => Number(tag.id) === currentTag)
        if (tag.length > 0) {
            return tag[0].title
        }

        return ""
    }

    return (
        <li ref={(el) => { addRef(el as HTMLElement) }}>
            <div className="likes-block">
                <img onClick={handleLikeClick} src={isLiked ? "heart-liked.svg" : "heart.svg"}></img>
                <p>{card.likes.length}</p>
            </div>
            <img className="card-image" src={card.image}></img>
            <div className="idea-info">
                <ul className="idea-tags">
                    {tags && card.active_tags.map((currentTag) => <li key={currentTag}>{getTagTitle(currentTag)}</li>)}
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