/** класс, отвечающий за управление отображением информации о пользователе на странице */
class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._userName = document.querySelector(nameSelector);
    this._userJob = document.querySelector(jobSelector);
  }

  getUserInfo() {
    // this._userName.value = document.querySelector('.profile__name');
    // this._userJob.value = document.querySelector('.profile__job')
    return { //метод возвращает объект с данными пользователя
      name: this._userName.textContent,
      job: this._userJob.textContent,
    };
  }

  setUserInfo({ name, job }) { //метод принимает новые данные пользователя и добавляет их на страницу
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }
}

export { UserInfo };
