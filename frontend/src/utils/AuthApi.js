import { getToken } from './constans';

class Auth {
    constructor(options) {
        this.url = options.baseUrl;
        this.headers = options.headers;
    }

    _gerResponseJson(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    signUp(userEmail, userPassword) {
        return fetch(`${this.url}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password: userPassword,
                email: userEmail,
            })
        }).then(this._gerResponseJson);
    }

    signIn(userEmail, userPassword) {
        return fetch(`${this.url}/signin`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                password: userPassword,
                email: userEmail,
            })
        }).then(this._gerResponseJson);
    }

    checkToken(token) {
        return fetch(`${this.url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getToken(),
            },
        }).then(this._gerResponseJson);
    }
}

export default new Auth({
    baseUrl: 'https://api.etiurin.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json'
    }
});
