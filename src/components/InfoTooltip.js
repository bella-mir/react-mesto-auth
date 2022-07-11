import React, { Component } from 'react';
import ok from "../images/ok.svg"
import decline from "../images/decline.svg"

function InfoTooltip({ isCorrect, onClose, isOpen }) {
  return (
    <section
      className={"popup" + (isOpen ? " popup_opened" : "")}
    >
      <div className="popup__container">
        <img
          src={isCorrect ? ok : decline}
          alt={"Correct sign"}
          className={"popup__isCorrectImage"}
        ></img>

        <h2 className="popup__title popup__title-register">
          {isCorrect
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз"}
        </h2>

        <button
          id="popupAdClose"
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
