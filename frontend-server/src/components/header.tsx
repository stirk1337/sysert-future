import { Link } from 'react-scroll';

function Header() {
    return (
        <header>
            <nav>
                <img src="/logo.svg" alt="" width={51} height={51}></img>
                <ul>
                    <li><Link to="main" smooth={true} duration={500}>В начало</Link></li>
                    <li><Link to="history" smooth={true} duration={500}>Хроника</Link></li>
                    <li><Link to="ideas" smooth={true} duration={500}>Биржа идей</Link></li>
                    <li><Link to="generate-idea" smooth={true} duration={500}>Генератор идей</Link></li>
                    <li><Link to="footer" smooth={true} duration={500}>Контакты</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header