import React from "react";
import logo from "../images/Vector.svg";
import {Link, useLocation} from "react-router-dom";

function Header({onSignOut, userData, isLoggedIn }) {
    const location = useLocation();

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип"/>
            {
                !isLoggedIn && <>
                    {
                        location.pathname === '/sign-in' &&
                        <Link to="sign-up" className="header__link">
                            Регистрация
                        </Link>
                    }
                    {
                        location.pathname === '/sign-up' &&
                        <Link to="sign-in" className="header__link">
                            Войти
                        </Link>
                    }
                </>
            }
            {
                isLoggedIn &&
                <div className="header__container">
                    <p className="header__email">{userData.userEmail}</p>
                    <Link to="sign-in" className="header__link" onClick={onSignOut}>
                        Выйти
                    </Link>
                </div>
            }

        </header>
    );
}

export default Header;
