import React, { useContext, useEffect } from "react";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";

function Mesto({ setCurrentUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api
      .getServerData()
      .then((res) => {
        const [initialCards] = res;
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser((user) => ({
          ...user,
          _id: userData._id,
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, link: card.link, name: card.name });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false, link: "", name: "" });
  }

  function handleUpdateUser(user) {
    api
      .editUserInfo(user)
      .then((newUser) => {
        setCurrentUser((user) => ({
          ...user,
          _id: newUser._id,
          userName: newUser.name,
          userDescription: newUser.about,
          userAvatar: newUser.avatar,
        }));
        setIsEditProfilePopupOpen(false);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleAddPlaceSubmit(user) {
    api
      .addNewCard(user)
      .then((newCard) => {
        setCards([newCard, ...cards]);

        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleUpdateAvatar(newAvatar) {
    console.log(newAvatar);
    api
      .setAvatar(newAvatar)
      .then((newUser) => {
        setCurrentUser((user) => ({
          ...user,
          _id: newUser._id,
          userName: newUser.name,
          userDescription: newUser.about,
          userAvatar: newUser.avatar,
        }));
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  return (
    <>
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />
      <Footer />
      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onAddPlaceSubmit={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default Mesto;
