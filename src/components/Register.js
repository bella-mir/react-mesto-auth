import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = useCallback(
    (e) => {
      setEmail(e.currentTarget.value);
    },
    [setEmail]
  );
  const handlePasswordChange = useCallback(
    (e) => {
      setPassword(e.currentTarget.value);
    },
    [setPassword]
  );
  
  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="form form__register">
        <input
          className="form__input form__input_white"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <span className="form__error" id="email-error"></span>
        <input
          className="form__input form__input_white "
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
        />
        <span className="form__error" id="password-error"></span>
        <div className="register__button-container">
          <button type="submit" className="form__submit form__submit_white">
            Зарегестрироваться
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегестрированы?</p>
        {/* <Link to="login" className="register__login-link">
          Войти
        </Link> */}
      </div>
    </div>
  );
}

export default Register;
