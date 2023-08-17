import { apiToken, apiUrl, apiCohortId } from "./constans";

class Api {
  constructor(apiToken, apiUrl, apiCohortId) {
    this._apiToken = apiToken;
    this._apiUrl = apiUrl;
    this._apiCohortId = apiCohortId;

    this.changeLikeCardStatus = this.changeLikeCardStatus.bind(this);
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _getInitialCards() {
    return fetch(`${this._apiUrl}${this._apiCohortId}/cards`, {
      headers: {
        authorization: this._apiToken,
      },
    }).then(this._checkRes);
  }

  getUserInfo() {
    return fetch(`${this._apiUrl}${this._apiCohortId}/users/me`, {
      headers: {
        authorization: this._apiToken,
      },
    }).then(this._checkRes);
  }

  getServerData() {
    return Promise.all([this._getInitialCards(), this.getUserInfo()]);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._apiUrl}${this._apiCohortId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._checkRes);
  }

  addNewCard(data) {
    return fetch(`${this._apiUrl}${this._apiCohortId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._apiUrl}${this._apiCohortId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._apiToken,
      },
    }).then(this._checkRes);
  }

  setLike(cardId) {
    return fetch(`${this._apiUrl}${this._apiCohortId}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._apiToken,
      },
    }).then(this._checkRes);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.removeLike(cardId) : this.setLike(cardId);
  }

  removeLike(cardId) {
    return fetch(`${this._apiUrl}${this._apiCohortId}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._apiToken,
      },
    }).then(this._checkRes);
  }

  setAvatar(data) {
    return fetch(`${this._apiUrl}${this._apiCohortId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkRes);
  }
}

const api = new Api(apiToken, apiUrl, apiCohortId);

export default api;
