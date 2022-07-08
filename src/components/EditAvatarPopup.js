import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  useEffect(() => {
    if (!props.isOpen) {
      inputRef.current.value = "";
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        className="form__input"
        type="url"
        id="avatarLink"
        name="avatarlink"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="form__error" id="avatarlink-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
