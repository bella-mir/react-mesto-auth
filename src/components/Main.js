import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__photo-edit">
            {currentUser?.avatar && (
              <img
                src={currentUser.avatar}
                alt="profile face"
                className="profile__photo"
              />
            )}
            <button
              type="button"
              className="profile__photo-edit-button"
              onClick={props.onEditAvatar}
            ></button>
          </div>
          <div className="profile__text">
            <div className="profile__firstline">
              <h1 className="profile__name">
                {currentUser.name === undefined || currentUser.name === null
                  ? ""
                  : currentUser.name}
              </h1>
              <button
                id="editButton"
                type="button"
                className="profile__edit-button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__description">
              {currentUser.about === undefined || currentUser.about === null
                ? ""
                : currentUser.about}
            </p>
          </div>
        </div>
        <button
          id="addButton"
          type="button"
          className="profile__button"
          onClick={props.onAddPlace}
        >
          +
        </button>
      </section>
      <section className="places">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.handleCardLike}
            onCardDelete={props.handleCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
