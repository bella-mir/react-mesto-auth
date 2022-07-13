function PopupWithForm({
  name,
  title,
  onClose,
  isOpen,
  children,
  buttonText = "Сохранить",
  onSubmit,
}) {
  return (
    <section
      id={`popup_type_${name}`}
      className={"popup" + (isOpen ? " popup_opened" : "")}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          id={`form_${name}`}
          name={name}
          className="form"
          onSubmit={onSubmit}
        >
          {children}
          <input className="form__submit" type="submit" value={buttonText} />
        </form>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
