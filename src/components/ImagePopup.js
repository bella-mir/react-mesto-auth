function ImagePopup({ card, onClose }) {
  return (
    <section
      id="popupPic"
      className={"popup popup_blackout" + (card.name && " popup_opened")}
    >
      <figure className="popup__figure">
        <button
          id="popupPicClose"
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
        <img className="popup__image" alt={card.name} src={card.link} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
