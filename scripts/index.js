import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards, obj } from './arrays.js';

//переменные
/** все модальные окна */
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup-profile'); //мод.окно профиля
const popupAdd = document.querySelector('.popup-add'); //мод.окно добавления карточки
const popupImage = document.querySelector('.popup-image'); //мод.окно картинки

/** кнопки открытия модальных окон */
const buttonEdit = document.querySelector('.profile__edit-button'); //кнопка открытия модалки редактирования профиля
const addButton = document.querySelector('.profile__add-button'); //кнопка открытия модалки добавления карточки

/** формы модальных окон */
const formCards = document.querySelector('.form-cards'); // форма модалки добавления карточек
const formProfile = document.querySelector('.form-profile'); // форма модалки редактиования профиля

/** данные модального окна профиля и его инпуты */
const nameProfileInput = document.querySelector('.form__item_user_name'); //поле ввода имени пользователя
const jobProfileInput = document.querySelector('.form__item_user_job'); //поле ввода описания пользователя
const nameProfileTitle = document.querySelector('.profile__name'); // имя пользователя
const jobProfileTitle = document.querySelector('.profile__job'); //описание пользователя

/** инпуты модального окна добавления карточек */
const nameImageAdd = document.querySelector('.form__item_image_name'); // название картинки
const linkImageAdd = document.querySelector('.form__item_image_link'); // ссылка на картинку

/** данные модального окна просмотра изображения */
const imageClicked = document.querySelector('.popup-image__pic'); // изображение
const nameImageClicked = document.querySelector('.popup-image__title'); // название изображения

/** данные шаблона */
const cardsBlock = document.querySelector('.cards'); // секция всех карточек
const cardTemplate = document.querySelector('#card__template'); // шаблон карточки
const card = document.querySelector('.card'); // карточка
const cardImage = document.querySelector('.card__pic'); // изображение

/** закрытие модальных окон */
const closeButtons = document.querySelectorAll('.popup__close'); // все кнопки закрытия модалок
closeButtons.forEach((button) => {
  const popup = button.closest('.popup'); //родитель к кнопке закрытия
  button.addEventListener('click', () => closePopup(popup)); // слушатель закрытия по клику на кнопку
});

/** закрытие модальных окон кликом на оверлей */
const closeWithinPopup = (e) => {
  if (e.target.classList.contains('popup_opened')) {
    closePopup(e.target);
  }
};

/** закрытие модальных окон через Esc */
const closePopupEsc = (e) => {
  if (e.keyCode == 27) {
    const popupAll = document.querySelector('.popup_opened');
    closePopup(popupAll);
  }
};

/** закрытие модального окна */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('click', closeWithinPopup);
}

/** открытие модальных окон */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', closeWithinPopup);
}

/** открытие попап с картинкой по клику на карточку */
// function viewPopupImagePic() {
//   cardImage.addEventListener('click', () => {
//     imageClicked.src = item.link;
//     imageClicked.alt = item.name;
//     nameImageClicked.textContent = item.name;

//     openPopup(popupImage);
//   });
// }

function viewPopupImagePic(name, link) {
  imageClicked.src = link;
  imageClicked.alt = name;
  nameImageClicked.textContent = name;

  openPopup(popupImage);
}

/** создание новой карточки */
function createCard(data) {
  const card = new Card(data, cardTemplate, viewPopupImagePic);
  return card.generateCard();
}

/** создание карточек из массива */
// initialCards.forEach(function (item) {
//   cardsBlock.append(createCard(item));
// });

/** добавление новой карточки в начало блока */
function addNewCard(item) {
  cardsBlock.prepend(item);
}

/** загрузка из массива */
initialCards.forEach((item) => {
  addNewCard(createCard(item));
});

/** cброс инпутов */
function clearInput(e) {
  e.target.reset();
}

/** сохранение(отправка) данных профиля (заполнение профиля пользователя) */
function handleFormProfileSubmit(e) {
  e.preventDefault();

  nameProfileTitle.textContent = nameProfileInput.value;
  jobProfileTitle.textContent = jobProfileInput.value;

  closePopup(popupProfile);
}

/** сохранение(отправка) даных карточки (внесение названия и ссылки на изображение) */
function handleFormAddSubmit(e) {
  e.preventDefault();
  formCards.addEventListener('submit', (e) => {
    e.preventDefault();

    const addCard = {
      name: nameImageAdd.value,
      link: linkImageAdd.value,
    };

    addNewCard(createCard(addCard));

    /** закрытие окна после сохранения и очистка инпутов*/
    closePopup(popupAdd, clearInput(e));
  });
}

nameProfileInput.value = nameProfileTitle.textContent;
jobProfileInput.value = jobProfileTitle.textContent;

/** открытие и редактирование полей попап профиля нажатием на кнопку редактирования */
buttonEdit.addEventListener('click', function () {
  openPopup(popupProfile);
});

/** открытие попап добавления карточки нажатием на кнопку добавления */
addButton.addEventListener('click', function () {
  formCardValidation.disablesSubmitForm();
  openPopup(popupAdd);
});

formProfile.addEventListener('submit', handleFormProfileSubmit);
formCards.addEventListener('submit', handleFormAddSubmit);

/** валидация форм */
const profileValidation = new FormValidator(obj, formProfile);
profileValidation.enableValidation();

const formCardValidation = new FormValidator(obj, formCards);
formCardValidation.enableValidation();
