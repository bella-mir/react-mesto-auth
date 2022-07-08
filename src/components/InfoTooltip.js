function InfoTooltip({ isCorrect, onClose, isOpen }) {
  return (
    <section
      id={popup_infoTooltip}
      className={"popup" + (isOpen ? " popup_opened" : "")}
    >
      <div className="popup__container">
        <img
          src={isCorrect ? "../images/ok.svg" : "../images/decline.svg"}
          alt={"Correct sign"}
        ></img>

        <h2 className="popup__title">
          {isCorrect
            ? "Вы успешно зарегестрировались!"
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
