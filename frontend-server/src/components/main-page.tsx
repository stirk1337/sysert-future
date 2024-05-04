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
            </main>
        </>
    )
}

export default MainPage