import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlacelink] = useState("");

  function handleNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handleLinkChange(e) {
    setPlacelink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name: placeName,
      link: placeLink,
    });
  }

  useEffect(() => {
    if (!props.isOpen) {
      setPlaceName("");
      setPlacelink("");
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
        onChange={handleNameChange}
        value={placeName}
      />
      <span className="form__error" id="name-error"></span>
      <input
        className="form__input"
        type="url"
        id="picLink"
        name="link"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkChange}
        value={placeLink}
      />
      <span className="form__error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
