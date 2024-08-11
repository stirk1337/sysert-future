function Footer() {
    return (
        <section id="footer">
            <div className="flex-box">
                <div className="sysert-projects">
                    <h2>Подробнее об остальных наших проектах</h2>
                    <a href="https://nazavode.space/" target="_blank">
                        <img src="/footer-projects.png"></img>
                    </a>
                </div>
                <div className="mobile-flex">
                    <div className="contacts">
                        <h2>Контакты</h2>
                        <p><a href="mailto:pagency1732@gmail.com">pagency1732@gmail.com</a></p>
                        <p><a href="tel:+79827010685">+7 982 701 06 85</a></p>
                    </div>
                    <div className="media">
                        <h2>Найди нас</h2>
                        <p>
                            <a href="https://vk.com/sgo_agency" target="_blank">ВКонтакте</a>
                            <img src="/vk-icon.png"></img>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer