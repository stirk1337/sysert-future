import { RefObject, useEffect, useRef, useState } from "react"
import GenerateForm from "./generate-form"
import EditForm from "./edit-form"
import { useAppDispatch, useAppSelector } from "./hooks"
import { getTags } from "./store/api-actions/get-actions"
import { LoadingStatuses } from "../enums"
import { setModal } from "./store/action"

function GenerateIdeaBlock() {
    const dispatch = useAppDispatch()

    const userData = useAppSelector((store) => store.userData)

    const [isEdit, setIsEdit] = useState(false)
    const [formLabel, setFormLabel] = useState('тебе нравится')
    const [formHeight, setFormHeight] = useState(70)
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatuses>(LoadingStatuses.default)

    const elementRef: RefObject<HTMLDivElement> = useRef(null);
    const scrollToRef: RefObject<HTMLDivElement> = useRef(null);

    function isElementInViewport(scrollToEl: HTMLDivElement, containerEl: HTMLDivElement): boolean {
        const scrollToRect = scrollToEl.getBoundingClientRect();
        const containerReact = containerEl.getBoundingClientRect()
        return (
            scrollToRect.bottom > (window.innerHeight || document.documentElement.clientHeight) &&
            containerReact.top <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    useEffect(() => {
        dispatch(getTags())
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (scrollToRef.current && elementRef.current && isElementInViewport(scrollToRef.current, elementRef.current)) {
                scrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        };
        handleScroll();

        const resizeObserver = new ResizeObserver(handleScroll);
        if (elementRef.current) {
            resizeObserver.observe(elementRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [])

    useEffect(() => {
        if (isEdit && userData.id === 0) {
            dispatch(setModal(true))
            document.getElementsByTagName("body")[0].style.overflow = 'hidden';
            document.getElementsByTagName("html")[0].style.overflow = 'hidden';
        }
    }, [isEdit])

    function handleLabel(label: string) {
        setFormLabel(label)
    }

    function changeToggle() {
        setIsEdit(!isEdit)
    }

    function changeFormHeight(height: number) {
        setFormHeight(height)
    }

    function changeLoadStatus(status: LoadingStatuses) {
        setLoadingStatus(status)
    }

    return (
        <section ref={elementRef} id="generate-idea">
            <h2>Генератор идей</h2>
            <p>Здесь ты можешь создать идею, которая может найти своё будущие в твоих или других руках! Напиши её сам или при помощи нейросетей</p>
            <div className="generate-form" style={{ "--max-height": `${isEdit ? '960' : formHeight + 200}px` } as React.CSSProperties}>
                <div className="form-header">
                    {!isEdit && <h3>Напиши о том, что {formLabel}</h3>}
                    <div className="form-toggle-block">
                        <img width={35} height={35} src="/generate-edit-icon.svg"></img>
                        <button onClick={changeToggle} className="form-toggle">
                            <div className={`toggle ${isEdit ? 'edit-mode' : 'ai-mode'}`}></div>
                        </button>
                        <p>ИИ</p>
                    </div>
                </div>
                {isEdit ? <EditForm loadingStatus={loadingStatus} changeLoadStatus={changeLoadStatus} /> : <GenerateForm setLabel={handleLabel} setHeight={changeFormHeight} setEdit={changeToggle} height={formHeight} />}
            </div>
            <div ref={scrollToRef}></div>
        </section>
    )
}

export default GenerateIdeaBlock