import GenerateIdeaBlock from "./generate-idea-block"
import Header from "./header"
import HistoryBlock from "./history-block"
import IdeasBlock from "./ideas-block"
import MainBlock from "./main-block"

function MainPage() {
    return (
        <>
            <header className="sou">
                <img src="fav-icon.png" width={230} height={230}></img>
                <h1>Сгенерируй идею мечты</h1>
            </header>
            <main>
                <GenerateIdeaBlock />
            </main>
        </>
    )
}

export default MainPage