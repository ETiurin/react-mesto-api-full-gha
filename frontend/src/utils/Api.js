import { apiUrl } from "./constans";

const getToken = () => {
  const token = localStorage.getItem('jwt');

  return token;
}

class Api {
  constructor(apiUrl) {
    this._apiUrl = apiUrl;

    this.changeLikeCardStatus = this.changeLikeCardStatus.bind(this);
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getInitialCards() {
    return fetch(`${this._apiUrl}/cards`, {
      headers: {
        authorization: getToken(),
      },
    }).then(this._checkRes);
  }

  getUserInfo() {
    return fetch(`${this._apiUrl}/users/me`, {
      headers: {
        authorization: getToken(),
      },
    }).then(this._checkRes);
  }

  getServerData() {
    return Promise.all([this._getInitialCards(), this.getUserInfo()]);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._apiUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkRes);
  }

  addNewCard(data) {
    return fetch(`${this._apiUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._apiUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: getToken(),
      },
    }).then(this._checkRes);
  }

  setLike(cardId) {
    return fetch(`${this._apiUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: getToken(),
      },
    }).then(this._checkRes);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.removeLike(cardId) : this.setLike(cardId);
  }

  removeLike(cardId) {
    return fetch(`${this._apiUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: getToken(),
      },
    }).then(this._checkRes);
  }

  setAvatar(data) {
    return fetch(`${this._apiUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: getToken(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkRes);
  }
}

const api = new Api(apiUrl);

export default api;
