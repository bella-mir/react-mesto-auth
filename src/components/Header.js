import React, { Component } from 'react';

function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div>
        {props.isloggedIn ? (
          <div className="header__menu">
            <div> Email</div> <button onClick={props.handleLogout}>Выйти</button>
          </div>
        ) : (
          <div className="header__menu">Войти</div>
        )}
      </div>
    </header>
  );
}

export default Header;
