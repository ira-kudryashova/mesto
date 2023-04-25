class Api {
    constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
    }
  
    //получим информацию о пользователе
    getUserInfoApi() {
      return fetch(`${this._url}/users/me`, {
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    //обновим информацию пользователя
    editUserInfo(data) {
      return fetch(`${this._url}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.job,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    //обновим аватар пользователя
    editUserAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.avatar,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    //получим карточки
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    //добавим новую карточку
    addCards(data) {
      return fetch(`${this._url}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    //удалим карточку
    removeCardApi(_id) {
      return fetch(`${this._url}/cards/${_id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    // поставим лайк карточке
    addCardLike(_id) {
      return fetch(`${this._url}/cards/${_id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    // удалим лайк с карточки
    removeCardLike(_id) {
      return fetch(`${this._url}/cards/${_id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    // toggleLikeCard(cardId, isCardLiked) {
    //     return fetch(`${this._url}/cards/${cardId}/likes`, {
    //       method: isCardLiked ? "PUT" : "DELETE",
    //       headers: {
    //         authorization: this._authorization,
    //       },
    //     })
    //     .then((res) => {
    //         if (res.ok) {
    //             return res.json();
    //         }
    //         return Promise.reject(`Ошибка: ${res.status}`);
    //     })
    // }
  }
  
  export { Api };  