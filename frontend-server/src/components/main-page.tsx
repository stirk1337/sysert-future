import { useEffect } from "react"
import Footer from "./footer"
import GenerateIdeaBlock from "./generate-idea-block"
import Header from "./header"
import HistoryBlock from "./history-block"
import IdeasBlock from "./ideas-block"
import MainBlock from "./main-block"
import SuccessDetector from "./success-detector"
import { useAppDispatch, useAppSelector } from "./hooks"
import { getUser } from "./store/api-actions/get-actions"
import TelegramModal from "./telegram-modal"
import { setModal } from "./store/action"

function MainPage() {
    const dispatch = useAppDispatch()
    const isModalOpen = useAppSelector((store) => store.isTelegramModalOpen)
    const userData = useAppSelector((store) => store.userData)

    useEffect(() => {
        dispatch(getUser())
    }, [])

    useEffect(() => {
        if (!isModalOpen) {
            document.getElementsByTagName("body")[0].style.overflow = 'auto';
            document.getElementsByTagName("html")[0].style.overflow = 'auto';
        }
    }, [isModalOpen])

    useEffect(() => {
        console.log(userData)
    }, [userData])

    return (
        <>
            <Header />
            <main>
                <MainBlock />
                <HistoryBlock />
                <SuccessDetector />
                <IdeasBlock />
                <GenerateIdeaBlock />
                <Footer />
                {isModalOpen &&
                    <>
                        <TelegramModal />
                        <div onClick={() => dispatch(setModal(false))} className="pop-up-background"></div>
                    </>}
            </main>
        </>
    )
}

export default MainPage