// массив карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// import { enableValidation } from './validate';
// import { obj } from './validate';

//переменные
const popupProfile = document.querySelector(".popup-profile"); //мод.окно профиля
const popupAdd = document.querySelector(".popup-add"); //мод.окно добавления карточки
const popupImage = document.querySelector(".popup-image"); //мод.окно картинки

const buttonEdit = document.querySelector(".profile__edit-button"); //кнопка редактирования профиля
const addButton = document.querySelector(".profile__add-button"); //кнопка добавления картинки

const formCards = document.querySelector(".form-cards"); //кнопка сохранения новой карточки (ранее submitCard)
const formProfile = document.querySelector(".form-profile");

const nameProfileInput = document.querySelector(".form__item_user_name"); //поле ввода имени пользователя
const jobProfileInput = document.querySelector(".form__item_user_job"); //поле ввода описания полтзователя

const nameProfileTitle = document.querySelector(".profile__name"); //имя пользователя
const jobProfileTitle = document.querySelector(".profile__job"); //описание пользователя

const nameImageAdd = document.querySelector(".form__item_image_name"); //название картинки
const linkImageAdd = document.querySelector(".form__item_image_link"); //ссылка на картинку

const imageClicked = document.querySelector(".popup-image__pic");
const nameImageClicked = document.querySelector(".popup-image__title");

const cardsBlock = document.querySelector(".cards"); //секция всех карточек
const cardTemplate = document.querySelector("#card__template"); //шаблон карточки
const card = document.querySelector(".card");

//import { obj } from './validates';
//import { disabledSubmitBtm, activeSubmitBtm } from './validate';

// все кнопки закрытия popup
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach((button) => {
  const popup = button.closest(".popup"); //родитель к кнопке закрытия
  button.addEventListener("click", () => closePopup(popup));
});

//функция открытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', closeWithinPopup);
};

//закрытие popup кликом на оверлей
const closeWithinPopup = (e) => {
  if (e.target.classList.contains('popup_opened')) {
    closePopup(e.target);
  }
};

//закрытие popup через Esc //не работает зараза
const closePopupEsc = (e) => {
;  if (e.keyCode == 27) {
    const popupAll = document.querySelector('.popup_opened');
    closePopup(popupAll);
  }
};

/*const closePopupList = document.querySelectorAll('.popup');
closePopupList.forEach((popupElem) => {
  popupElem.addEventListener('click', function(e) {
    if (e.target.classList.contains('popup_opened') || e.target === e.currentTarget) {
      closePopup(popupElem);
    }
  })
});*/

//функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('click', closeWithinPopup);
};

function handleFormProfileSubmit(e) { //отправка данных(заполнение профиля пользователя)
  e.preventDefault();

  nameProfileTitle.textContent = nameProfileInput.value;
  jobProfileTitle.textContent = jobProfileInput.value;
  closePopup(popupProfile);
}

//функция создания новой карточки
function createCard(item) {
  const cardName = item.name;
  const cardLink = item.link;
  const cardAlt = item.name;
  const cardElement = cardTemplate.content.cloneNode(true);
  cardElement.querySelector(".card__name").textContent = cardName;
  const imageCard = cardElement.querySelector(".card__pic");
  imageCard.src = cardLink;
  imageCard.alt = cardAlt;

  const buttonLike = cardElement.querySelector(".card__like");
  const buttonTrash = cardElement.querySelector(".card__trash");
  const cardImage = cardElement.querySelector(".card__pic");

  //лайк карточки
  buttonLike.addEventListener("click", function () {
    buttonLike.classList.toggle("card__like_active");
  });

  //удаление любой карточки нажатием кнопки удаления
  buttonTrash.addEventListener("click", function () {
    const parentOfTrash = buttonTrash.closest(".card");
    parentOfTrash.remove();
  });

  // открытие попап с картинкой по клику на карточку
  cardImage.addEventListener("click", function () {
    imageClicked.src = cardLink;
    imageClicked.alt = cardName;
    nameImageClicked.textContent = cardAlt;

    openPopup(popupImage);
  });

  return cardElement;
}

const addNewCard = (item) => {
  cardsBlock.prepend(createCard(item));
};

initialCards.forEach(function (item) {
  cardsBlock.append(createCard(item));
});

formCards.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewCard({
    name: nameImageAdd.value,
    link: linkImageAdd.value,
  });

  e.target.reset();
  closePopup(popupAdd);
});

//открытие и редактирование полей попап профиля нажатием на кнопку редактирования
buttonEdit.addEventListener("click", function () {
  // popup.classList.add('popup_opened');
  openPopup(popupProfile);
  nameProfileInput.value = nameProfileTitle.textContent;
  jobProfileInput.value = jobProfileTitle.textContent;
});

//открытие попап добавления карточки нажатием на кнопку добавления
addButton.addEventListener("click", function () {
  openPopup(popupAdd);
});

formProfile.addEventListener("submit", handleFormProfileSubmit);