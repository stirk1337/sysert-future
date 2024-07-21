import { Link } from 'react-scroll';
import { useAppSelector } from './hooks';
import { useState } from 'react';

function Header() {
    const userData = useAppSelector((store) => store.userData)
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false)
    console.log(userData);
    return (
        <header>
            <nav>
                <Link to="main" smooth={true} duration={500}><img src="/logo.svg" alt="" width={51} height={51}></img></Link>
                <div className='header-container'>
                    <div className={`mobile-menu ${isMobileMenuActive ? "active" : ""}`} onClick={() => { setIsMobileMenuActive(!isMobileMenuActive) }}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <ul>
                        <li><Link to="history" smooth={true} duration={500}>Хроника</Link></li>
                        <li><Link to="success-block" smooth={true} duration={500}>Детектор успеха</Link></li>
                        <li><Link to="ideas" smooth={true} duration={500}>Биржа идей</Link></li>
                        <li><Link to="generate-idea" smooth={true} duration={500}>Генератор идей</Link></li>
                        <li><Link to="footer" smooth={true} duration={500}>Контакты</Link></li>
                    </ul>
                    <div className='user-data'>
                        {userData.photo_url && <img src={userData.photo_url}></img>}
                        {!userData.photo_url && userData.first_name && <div className='user-no-image'>{userData.first_name[0]}</div>}
                        <p>{userData.first_name} <br></br> {userData.last_name}</p>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header