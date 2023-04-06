import '../src/pages/index.css';

import 
{
  initialCards,
  obj,
  buttonEdit,
  addButton,
  formCards,
  formProfile,
  nameProfileInput,
  jobProfileInput,
  cardsBlock
} from './utils/constants.js';

import { Card } from './components/Card.js';
import { FormValidator } from './components/FormValidator.js';
//import { initialCards, obj } from './components/arrays.js';
import { Section } from './components/Section.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { UserInfo } from './components/UserInfo.js';

// // все переменные

// /** все модальные окна */
// const popup = document.querySelector('.popup');
// //const popupProfile = document.querySelector('.popup-profile'); //мод.окно профиля
// //const popupAdd = document.querySelector('.popup-add'); //мод.окно добавления карточки
// const popupImage = document.querySelector('.popup-image'); //мод.окно картинки

// /** кнопки открытия модальных окон */
// const buttonEdit = document.querySelector('.profile__edit-button'); //кнопка открытия модалки редактирования профиля
// const addButton = document.querySelector('.profile__add-button'); //кнопка открытия модалки добавления карточки

// /** формы модальных окон */
// const formCards = document.querySelector('.form-cards'); // форма модалки добавления карточек
// const formProfile = document.querySelector('.form-profile'); // форма модалки редактиования профиля

// /** данные модального окна профиля и его инпуты */
// const nameProfileInput = document.querySelector('.form__item_user_name'); //поле ввода имени пользователя
// const jobProfileInput = document.querySelector('.form__item_user_job'); //поле ввода описания пользователя
// const nameProfileTitle = document.querySelector('.profile__name'); // имя пользователя
// const jobProfileTitle = document.querySelector('.profile__job'); //описание пользователя

// /** инпуты модального окна добавления карточек */
// const nameImageAdd = document.querySelector('.form__item_image_name'); // название картинки
// const linkImageAdd = document.querySelector('.form__item_image_link'); // ссылка на картинку

// /** данные модального окна просмотра изображения */
// const imageClicked = document.querySelector('.popup-image__pic'); // изображение
// const nameImageClicked = document.querySelector('.popup-image__title'); // название изображения

// /** данные шаблона */
// const cardsBlock = document.querySelector('.cards'); // секция всех карточек
// //const cardTemplate = document.querySelector('#card__template'); // шаблон карточки
// //const card = document.querySelector('.card'); // карточка
// //const cardImage = document.querySelector('.card__pic'); // изображение


/** экземпляр класса UserInfo, который отвечает за управление отображением информации о пользователе на странице */
const user = new UserInfo({ nameSelector: '.profile__name', jobSelector: '.profile__job'});

/** создание новой карточки */
function createCard(data) {
  const card = new Card(data, '#card__template', viewPopupImagePic);
  return card.generateCard();
}

/** экземпляр класса Section, который отвечает за отрисовку элементов на странице */
const cardsList = new Section({ items: initialCards, renderer: (item) => {
  cardsList.addItem(createCard(item));
}}, cardsBlock);

cardsList.renderItems();

/** экземпляры класса PopupWithForm */

/** попап редкатирования профиля */
const popupProfile = new PopupWithForm('.popup-profile', (inputs) => {
  user.setUserInfo(inputs);
  popupProfile.close();
});
popupProfile.setEventListeners();

function popupProfileOpen({ name, job}) {
  nameProfileInput.value = name;
  jobProfileInput.value = job;

  popupProfile.open();
}

buttonEdit.addEventListener('click', () => {
  popupProfileOpen(user.getUserInfo());
  profileValidation.disablesSubmitForm();
})

/** попап добавления карточки */
const popupAdd = new PopupWithForm('.popup-add', ({ name, link }) => {
  cardsList.addItem(createCard({ name, link }));
  popupAdd.close();
})
popupAdd.setEventListeners();

addButton.addEventListener('click', () => {
  popupAdd.open();
  formCardValidation.disablesSubmitForm();
})

/** попап просмотра изображения */
const popupViewImage = new PopupWithImage('.popup-image')
popupViewImage.setEventListeners();

function viewPopupImagePic(name, link) {
  popupViewImage.open(name, link);
}

/** валидация форм */
const profileValidation = new FormValidator(obj, formProfile);
profileValidation.enableValidation();

const formCardValidation = new FormValidator(obj, formCards);
formCardValidation.enableValidation();