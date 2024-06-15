function MainBlock() {
    return (
        <div className="main-block">
            <div className="background">
                <img src="/main-lines.svg"></img>
                <img src="/main-line-top.svg"></img>
            </div>
            <section id="main">
                <div className="flex">
                    <div className="text-block">
                        <h1>Как же круто в Сысерти развивать будущее</h1>
                        <p>Сысерть сейчас и Сысерть через год 2 разных города</p>
                    </div>
                    <img src="/main-image.png" alt="" width={559} height={351}></img>
                </div>
            </section>
        </div>
    )
}

export default MainBlock