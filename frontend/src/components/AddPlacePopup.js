import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlaceSubmit }) {
  const [placeName, setPlaceName] = useState("");
  const [placeUrl, setPlaceUrl] = useState("");

  useEffect(() => {
    setPlaceName("");
    setPlaceUrl("");
  }, [isOpen]);

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceUrl(e) {
    setPlaceUrl(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({
      name: placeName,
      link: placeUrl,
    });
  }

  function handleClose() {
    setPlaceName("");
    setPlaceUrl("");
    onClose();
  }

  return (
    <PopupWithForm
      name={"add"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={handleClose}
      buttonText={"Создать"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name popup__input_name"
        name="name"
        type="text"
        id="placeName-input"
        placeholder="Название"
        value={placeName}
        onChange={handleChangePlaceName}
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__span popup__span_error placeName-input-error"></span>
      <input
        className="popup__input popup__input_type_about popup__input_type_about-url"
        name="link"
        type="url"
        id="placeUrl-input"
        placeholder="Ссылка на картинку"
        value={placeUrl}
        onChange={handleChangePlaceUrl}
        required
      />
      <span className="popup__span popup__span_error placeUrl-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
