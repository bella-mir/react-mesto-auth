import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from "../hooks/useForm";

function AddPlacePopup(props) {
  const controlInput = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard(controlInput.values);
  }

  useEffect(() => {
    if (!props.isOpen) {
      controlInput.setValues({});
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={"Создать"}
      onSubmit={handleSubmit}
    >
      <input
        className="form__input"
        type="text"
        id="picName"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={controlInput.handleChange}
        value={controlInput?.values?.name || ""}
      />
      <span className="form__error" id="name-error"></span>
      <input
        className="form__input"
        type="url"
        id="picLink"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={controlInput.handleChange}
        value={controlInput?.values?.link || ""}
      />
      <span className="form__error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
