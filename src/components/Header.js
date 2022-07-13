import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
  const [windowPath, setWindowPath] = useState(window.location.pathname);

  useEffect(() => {
    setWindowPath(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <header className="header">
      <div className="header__logo"></div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="header__menu">
              <p className="header__user">{props.email}</p>
              <button className="header__link" onClick={props.handleLogout}>
                Выйти
              </button>
            </div>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        ></Route>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        ></Route>
      </Routes>
    </header>
  );
}

export default Header;
