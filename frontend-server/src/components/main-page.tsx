import GenerateIdeaBlock from "./generate-idea-block"
import Header from "./header"
import HistoryBlock from "./history-block"
import IdeasBlock from "./ideas-block"
import MainBlock from "./main-block"

function MainPage() {
    return (
        <>
            <Header />
            <main>
                <MainBlock />
                <HistoryBlock />
                <IdeasBlock />
                <GenerateIdeaBlock />
            </main>
        </>
    )
}

export default MainPage