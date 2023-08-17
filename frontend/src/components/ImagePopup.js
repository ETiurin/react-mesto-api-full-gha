import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_zoom-image ${card.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__figure-container popup__overlay">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
