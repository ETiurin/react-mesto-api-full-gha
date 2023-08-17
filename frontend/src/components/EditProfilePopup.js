import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.userName || "");
    setDescription(currentUser.userDescription || "");
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name popup__input_type_name-profile"
        name="user_name"
        id="name-input"
        type="text"
        placeholder="Имя"
        value={name}
        onChange={handleChangeName}
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__span popup__span_error name-input-error"></span>
      <input
        className="popup__input popup__input_type_about popup__input_type_about-profile"
        name="user_about"
        id="about-input"
        type="text"
        placeholder="О cебе"
        onChange={handleChangeDescription}
        value={description}
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__span popup__span_error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
