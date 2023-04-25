import { Popup } from "./Popup.js";

class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._submitButton = this._form.querySelector('.form__submit-button');
    this._submitButtonText = this._submitButton.textContent;
  }

  /** параметр функции - это колбэк удаления карточки */
  setSubmit(submit) {
    this._handleSubmit = submit;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleSubmit();
    });
  }

  /** показываем ход загрузки/сохранения */
  renderLoading(isLoading, submitButtonText) {
    if (isLoading) {
      this._submitButton.textContent = submitButtonText;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = submitButtonText;
      this._submitButton.disabled = false;
    }
  }
}

export { PopupConfirmation };