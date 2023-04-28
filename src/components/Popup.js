/** класс, отвечающий за открытие и закрытие попапа */
class Popup {
  constructor(popupSelector) {
    //принимает параметром - селектор класса
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    //document.addEventListener('click', this._handleOverlayClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    //document.addEventListener('click', this._handleOverlayClose);
  }

  _handleEscClose = (e) => {
    //метод содержит логику закрытия попап через Esc
    if (e.key === 'Escape') {
      this.close();
    }
  };
 
  // _handleOverlayClose = (e) => { // метод не используется в классе
  //   //метод содержит логику закрытия попап нажатием на оверлей
  //   if (e.target.classList.contains('popup_opened')) {
  //     this.close();
  //   }
  // };

  setEventListeners() {
    // //метод добавления слушателя клика иконке закрытия попапа
    // const closeButtons = document.querySelectorAll('.popup__close'); // все кнопки закрытия модалок
    // closeButtons.forEach((button) => {
    //   button.addEventListener('mousedown', () => {
    //     const popup = button.closest('.popup'); //родитель к кнопке закрытия
    //     this.close(popup);
    //   });
    // });
    this._popup.addEventListener('click', (e) => {
      if (
        e.target.classList.contains('popup') ||
        e.target.classList.contains('popup__close')
      ) {
        this.close();
      }
    });
  }
}

export { Popup };
