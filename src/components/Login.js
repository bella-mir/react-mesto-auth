import React from "react";
import { useForm } from "../hooks/useForm";

function Login({ handleLogin }) {
  const controlInput = useForm();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = controlInput.values;
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
          value={controlInput?.values?.email || ""}
          onChange={controlInput.handleChange}
        />
        <span className="form__error" id="email-error"></span>
        <input
          className="form__input_white "
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={controlInput?.values?.password || ""}
          onChange={controlInput.handleChange}
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
