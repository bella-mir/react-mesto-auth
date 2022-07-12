import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const [windowPath, setWindowPath] = useState(window.location.pathname);

  useEffect(() => {
    setWindowPath(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div>
        {props.isloggedIn ? (
          <div className="header__menu">
            <div>{props.email}</div>{" "}
            <button className="header__link" onClick={props.handleLogout}>
              Выйти
            </button>
          </div>
        ) : windowPath === "/sign-up" ? (
          <Link to="/login" className="header__link">
            Войти
          </Link>
        ) : (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
