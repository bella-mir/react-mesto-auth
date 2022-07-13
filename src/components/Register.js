import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

function Register({ handleRegister }) {
  const controlInput = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = controlInput.values;
    handleRegister(email, password);
  };

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
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
            Зарегестрироваться
          </button>
        </div>
      </form>
      <div>
        <Link to="/sign-in" className="register__signin">
          Уже зарегестрированы? Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
