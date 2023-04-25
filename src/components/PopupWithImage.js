import { Popup } from './Popup.js';

/** класс перезаписывает родительский метод open */
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageClicked = document.querySelector('.popup-image__pic');
    this._nameImageClicked = document.querySelector('.popup-image__title');
  }

  open({name, link}) {
    this._nameImageClicked.textcontent = name;
    this._imageClicked.src = link;
    this._imageClicked.alt = name;

    super.open();
  };
}

export { PopupWithImage };
