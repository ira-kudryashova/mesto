/** класс, отвечающий за управление отображением информации о пользователе на странице */
class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userAboutInfo = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
      return {
      //метод возвращает объект с данными пользователя
      name: this._userName.textContent,
      job: this._userAboutInfo.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    //метод принимает новые данные пользователя и добавляет их на страницу
    this._userName.textContent = data.name;
    this._userAboutInfo.textContent = data.about;
    this._avatar.src = data.avatar;
    this._avatar.alt = data.name;
    this._id = data._id;
  }

  getUserId() {
    return this._id;
  }
}

export { UserInfo };
