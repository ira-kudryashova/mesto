/** все переменные */

const initialCards = [ // массив карточек
  {
    name: "Сингапур",
    link: "https://images.unsplash.com/photo-1600468636011-c75ae69b7fcb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHNpbmdhcG9yZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Сеул",
    link: "https://images.unsplash.com/photo-1602479185195-32f5cd203559?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fHNldWx8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Флоренция",
    link: "https://images.unsplash.com/photo-1592089206718-1124ee6d6378?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEzfHxmaXJlbnplfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Копенгаген",
    link: "https://images.unsplash.com/photo-1583674071999-7ec33b8751d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fGNvcGVuaGFnZW58ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Амстердам",
    link: "https://images.unsplash.com/photo-1622015524070-5ea7caac2643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGFtc3RlcmRhbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "Банкок",
    link: "https://images.unsplash.com/photo-1583491470869-ca0b9fa90216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJhbmdrb2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  },
];

const obj = { //для валидации
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_inactive",
  inputErrorClass: "form__item_error",
  errorClass: "form__item-error",
};

/** все модальные окна */
const popup = document.querySelector(".popup");
//const popupProfile = document.querySelector('.popup-profile'); //мод.окно профиля
//const popupAdd = document.querySelector('.popup-add'); //мод.окно добавления карточки
const popupImage = document.querySelector(".popup-image"); //мод.окно картинки

/** кнопки открытия модальных окон */
const buttonEdit = document.querySelector(".profile__edit-button"); //кнопка открытия модалки редактирования профиля
const addButton = document.querySelector(".profile__add-button"); //кнопка открытия модалки добавления карточки

/** формы модальных окон */
const formCards = document.querySelector(".form-cards"); // форма модалки добавления карточек
const formProfile = document.querySelector(".form-profile"); // форма модалки редактиования профиля

/** данные модального окна профиля и его инпуты */
const nameProfileInput = document.querySelector(".form__item_user_name"); //поле ввода имени пользователя
const jobProfileInput = document.querySelector(".form__item_user_job"); //поле ввода описания пользователя
const nameProfileTitle = document.querySelector(".profile__name"); // имя пользователя
const jobProfileTitle = document.querySelector(".profile__job"); //описание пользователя

/** инпуты модального окна добавления карточек */
const nameImageAdd = document.querySelector(".form__item_image_name"); // название картинки
const linkImageAdd = document.querySelector(".form__item_image_link"); // ссылка на картинку

/** данные модального окна просмотра изображения */
const imageClicked = document.querySelector(".popup-image__pic"); // изображение
const nameImageClicked = document.querySelector(".popup-image__title"); // название изображения

/** данные шаблона */
const cardsBlock = document.querySelector(".cards"); // секция всех карточек
//const cardTemplate = document.querySelector('#card__template'); // шаблон карточки
//const card = document.querySelector('.card'); // карточка
//const cardImage = document.querySelector('.card__pic'); // изображение


export {
  initialCards,
  obj,
  buttonEdit,
  addButton,
  formCards,
  formProfile,
  nameProfileInput,
  jobProfileInput,
  cardsBlock
}