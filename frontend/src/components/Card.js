import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwner = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="elements__card">
      <img
        src={card.link}
        className="elements__image"
        alt={card.name}
        onClick={handleClick}
      />
      {isOwner && (
        <button
          className="elements__trash"
          type="button"
          aria-label="Удалить"
          onClick={handleCardDelete}
        ></button>
      )}
      <div className="elements__title-wrapper">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__like-wrapper">
          <button
            type="button"
            className={`elements__like-button ${
              isLiked && "elements__like-button_active"
            }`}
            aria-label="Нравится"
            onClick={handleCardLike}
          ></button>
          <p className="elements__like-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
