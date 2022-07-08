function Header(props) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div>
        {props.isloggedIn ? (
          <div className="header__menu">
            <div> Email</div> <div>Выйти</div>
          </div>
        ) : (
          <div className="header__menu">Войти</div>
        )}
      </div>
    </header>
  );
}

export default Header;
