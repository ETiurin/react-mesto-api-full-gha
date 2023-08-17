import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onAddPlace,
  onCardClick,
  onEditAvatar,
  onEditProfile,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const userInfo = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-wrapper" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={userInfo.userAvatar}
            alt={userInfo.userDescription}
          />
        </div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{userInfo.userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Добавить"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__about">{userInfo.userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements-container">
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
