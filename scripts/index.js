// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//переменные
const popup = document.querySelector('.popup'); //мод.окно редактирования профиля
const popupAdd = document.querySelector('.popup-add'); //мод.окно добавления карточки
const popupImage = document.querySelector('.popup-image'); //мод.окно картинки

const buttonEdit = document.querySelector('.profile__edit-button');//кнопка редактирования профиля
const addButton = document.querySelector('.profile__add-button'); //кнопка добавления картинки

const buttonClose = document.querySelector('.form__close-button');// кнопка закрытия popup
const closeBtbPopupAdd = document.querySelector('.form__cl-button');//кнопка закрытия popup-add
const closeBtnPopupImage = document.querySelector('.popup-image__close');//кнопка закрытия popup-image
const submitCard = document.querySelector('.form_sb');

const formElement = document.querySelector('.form');

const nameInput = document.querySelector('.form__item_user_name');//поле ввода имени пользователя
const jobInput = document.querySelector('.form__item_user_job');//поле ввода описания полтзователя

const nameTitle = document.querySelector('.profile__name');//имя пользователя
const jobTitle = document.querySelector('.profile__job');//описание пользователя

const nameImage = document.querySelector('.form__item_image_name');//название картинки
const linkImage = document.querySelector('.form__item_image_link'); //ссылка на картинку

const imageClicked = document.querySelector('.popup-image__pic');
const nameImageClicked = document.querySelector('.popup-image__title');

const cardsBlock = document.querySelector('.cards');//секция всех карточек
const cardTemplate = document.querySelector('#card__template');//шаблон карточки
const card = document.querySelector('.card');

// добавление карточек через template
initialCards.forEach(function(item) {
  const cardName = item.name;
  const cardLink = item.link;
  const cardElement = cardTemplate.content.cloneNode(true);
    cardElement.querySelector('.card__name').textContent = cardName;
    cardElement.querySelector('.card__pic').src = cardLink;
    cardsBlock.append(cardElement);
});
const buttonLike = document.querySelectorAll('.card__like');
const buttonTrash = document.querySelectorAll('.card__trash');

const cardImage = document.querySelectorAll('.card__pic');

//создание новой карточки
submitCard.addEventListener('submit', (e) => {
  e.preventDefault();
  initialCards.unshift({ //добавление новой карточки в начало массива
    name: nameImage.value,
    link: linkImage.value
  });
    const cardName = initialCards[0].name;
    const cardLink = initialCards[0].link;
    const cardElement = cardTemplate.content.cloneNode(true);
        cardElement.querySelector('.card__name').textContent = cardName;
        cardElement.querySelector('.card__pic').src = cardLink;
        cardsBlock.prepend(cardElement);
    closePopupAdd();

    const newButtonLike = document.querySelectorAll('.card__like');
    const newButtonTrash = document.querySelectorAll('.card__trash');

    //возможность ставить лайк новой карточке
    newButtonLike.forEach(function(newLikeActive) {
      newLikeActive.addEventListener('click', function() {
        newLikeActive.classList.toggle('card__like_active');
      });
  });

    
    newButtonTrash.forEach(newTrash => {
      newTrash.addEventListener('click', () => {
      const parentOfNewTrash = newTrash.closest('.card');
      parentOfNewTrash.remove();
      });
    });
});


function closePopup() { 
    popup.classList.remove('popup_opened');
};

function closePopupAdd() {
    popupAdd.classList.remove('popup-add_opened');
};

function closePopupImage() {
  popupImage.classList.remove('popup-image_opened');
};

function handleFormSubmit (evt) {
    evt.preventDefault();

    nameTitle.textContent = nameInput.value;
    jobTitle.textContent = jobInput.value;

    closePopup();
}

//открытие и редактирование полей попап профиля нажатием на кнопку редактирования
buttonEdit.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
});

//открытие попап добавления карточки нажатием на кнопку добавления
addButton.addEventListener('click', function() {
    popupAdd.classList.add('popup-add_opened'); 
});

// открытие попап с картинкой по клику на карточку
cardImage.forEach(function(imageOfCard) {
  imageOfCard.addEventListener('click', function() {

    const pathOfImage = imageOfCard.src
    const parentOfCard = imageOfCard.closest('.card'); 
    const titleOfCard = parentOfCard.querySelector('.card__name').textContent;
    imageClicked.src = pathOfImage;
    nameImageClicked.textContent = titleOfCard;
    popupImage.classList.add('popup-image_opened');
  });
});

//закрытие попап профиля
buttonClose.addEventListener('click', function () {
    closePopup();
});

//закрытие попап добавления карточки
closeBtbPopupAdd.addEventListener('click', function () {
    closePopupAdd();
});

//закрытие попап с картинкой
closeBtnPopupImage.addEventListener('click', function() {
  closePopupImage();
});

//возможность ставить лайк на каждую карточку
buttonLike.forEach(function(likeActive) {
    likeActive.addEventListener('click', function() {
      likeActive.classList.toggle('card__like_active');
    });
});

//удаление любой карточки нажатием кнопки удаления
buttonTrash.forEach(trash => {
  trash.addEventListener('click', () => {
  const parentOfTrash = trash.closest('.card');
  parentOfTrash.remove();
  });
});

formElement.addEventListener('submit', handleFormSubmit);
