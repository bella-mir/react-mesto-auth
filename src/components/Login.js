import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
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

  const navigate = useNavigate();


  return (
    <div className="register">
      <h2>Вход</h2>
      <form className="register__form">
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className="register__button-container">
          <button type="submit" className="register__link">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
