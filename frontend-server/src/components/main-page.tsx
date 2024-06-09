import Footer from "./footer"
import GenerateIdeaBlock from "./generate-idea-block"
import Header from "./header"
import HistoryBlock from "./history-block"
import IdeasBlock from "./ideas-block"
import MainBlock from "./main-block"
import SuccessDetector from "./success-detector"

function MainPage() {
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
            </main>
        </>
    )
}

export default MainPage