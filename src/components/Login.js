import React, { useState } from "react";

function Login({ handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = data;
    handleLogin(email, password);
  };

  return (
    <div className="register">
      <h2 className="register__title">Вход</h2>
      <form className="form form__register" onSubmit={handleSubmit}>
        <input
          className="form__input_white"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
        <span className="form__error" id="email-error"></span>
        <input
          className="form__input_white "
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={data.password}
          onChange={handleChange}
        />
        <span className="form__error" id="password-error"></span>
        <div className="register__button-container">
          <button type="submit" className="form__submit form__submit_white">
            Войти
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
