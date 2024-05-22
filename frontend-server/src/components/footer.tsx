function Footer() {
    return (
        <section id="footer">
            <div className="flex-box">
                <div className="sysert-projects">
                    <h2>Подробнее об остальных наших проектах</h2>
                    <a>
                        <img src="/footer-projects.png"></img>
                    </a>
                </div>
                <div className="contacts">
                    <h2>Контакты</h2>
                    <p>agency1732@gmail.com</p>
                    <p>+7 (888) 888 88-88</p>
                </div>
                <div className="media">
                    <h2>Найди нас</h2>
                    <p>
                        <a>ВКонтакте</a>
                        <img src="/vk-icon.png"></img>
                    </p>
                    <p>
                        <a>В телеграме</a>
                        <img src="/telegram-icon.png"></img>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer