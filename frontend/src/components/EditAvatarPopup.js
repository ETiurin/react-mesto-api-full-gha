import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvaterPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");

  React.useEffect(() => {
    setAvatar("");
  }, [isOpen]);

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar,
    });
  }

  return (
    <PopupWithForm
      name={"update-avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_el_avatar-url"
        type="url"
        id="input-avatar-link"
        placeholder="Ссылка на изображение"
        name="input-avatar-link"
        value={avatar}
        onChange={handleChangeAvatar}
        required
      />
      <span className="input-avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvaterPopup;