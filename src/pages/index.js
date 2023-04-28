import '../pages/index.css';

import {
  initialCards,
  obj,
  editProfileButton,
  addCardButton,
  formCards,
  formProfile,
  nameProfileInput,
  jobProfileInput,
  cardsBlock,
  editAvatarButton,
  formAvatar,
} from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupConfirmation } from '../components/PopupConfirmation.js';
import { Api } from '../components/Api.js';

class App {
  api = null;
  user = null;
  popupProfile = null;
  popupAvatar = null;
  popupAdd = null;
  popupViewImage = null;
  cardsList = null;
  profileValidation = null;
  formCardValidation = null;
  formAvatarValidation = null;

  constructor(api) {
    this.api = api;
    this.appUser();
    this.appPopupProfile();
    this.appProfileAvatar();
    this.appPopupAddCard();
    this.appPopupConfirm();
    this.appPopupViewImage();
    this.appCardsList();
    this.appFormsValidation();
    this.addEventListenerForEditProfileButton();
    this.addEventListenerForAvatarButton();
    this.addEventListenerForAddCardButton();
    this.fetchAllUserInfoAndCards();
  }

  /** метод отвечает за управление отображением информации о пользователе на странице */
  appUser() {
    this.user = new UserInfo({
      nameSelector: '.profile__name',
      jobSelector: '.profile__job',
      avatarSelector: '.profile__avatar',
    });
  }

  /** попап редактирования профиля */
  appPopupProfile() {
    this.popupProfile = new PopupWithForm('.popup-profile', (inputs) => {
      this.popupProfile.renderLoading(true, 'Сохраняем...');
      this.api
        .editUserInfo(inputs)
        .then((inputs) => {
          this.user.setUserInfo(inputs);
          this.popupProfile.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.popupProfile.renderLoading(false, 'Сохранить');
        });
    });
    this.popupProfile.setEventListeners();
  }

  /** попап редактирования аватара пользователя */
  appProfileAvatar() {
    this.popupAvatar = new PopupWithForm('.popup-avatar', (data) => {
      this.popupAvatar.renderLoading(true, 'Сохраняем...');
      this.api
        .editUserAvatar(data)
        .then((data) => {
          this.user.setUserInfo(data);
          this.popupAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.popupAvatar.renderLoading(false, 'Сохранить');
        });
    });
    this.popupAvatar.setEventListeners();
  }

   /** попап добавления карточки */
  appPopupAddCard() {
    this.popupAdd = new PopupWithForm('.popup-add', (data) => {
      this.popupAdd.renderLoading(true, 'Создаем...');
      this.api
        .addCards(data)
        .then((data) => {
          this.cardsList.addItem(this.createCard(data));
          this.popupAdd.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.popupAdd.renderLoading(false, 'Создать');
        });
    });
    this.popupAdd.setEventListeners();
  }

  appPopupConfirm() {
    this.popupConfirm = new PopupConfirmation('.popup-delete');
    this.popupConfirm.setEventListeners();
  }

  /** метод отвечает за отрисовку элементов на странице */
  appCardsList() {
    this.cardsList = new Section(
      {
        renderer: (item) => {
          this.cardsList.addItem(this.createCard(item));
        },
      },
      cardsBlock
    );
  }

  /**попап просмотра изображения */
  appPopupViewImage() {
    this.popupViewImage = new PopupWithImage('.popup-image');
    this.popupViewImage.setEventListeners();
  }

  /** валидация форм */
  appFormsValidation() {
    this.profileValidation = new FormValidator(obj, formProfile);
    this.profileValidation.enableValidation();

    this.formCardValidation = new FormValidator(obj, formCards);
    this.formCardValidation.enableValidation();

    this.formAvatarValidation = new FormValidator(obj, formAvatar);
    this.formAvatarValidation.enableValidation();
  }

  /**слушатели для кнопок открытия всех попап */
  addEventListenerForEditProfileButton() {
    editProfileButton.addEventListener('click', () => {
      const userInfoProfile = this.user.getUserInfo();
      this.inputsProfileInfo({
        name: userInfoProfile.name,
        job: userInfoProfile.job,
      });
      this.popupProfile.open();
      this.profileValidation.disablesSubmitForm();
    });
  }

  addEventListenerForAvatarButton() {
    editAvatarButton.addEventListener('click', () => {
      this.popupAvatar.open();
    });
  }

  addEventListenerForAddCardButton() {
    addCardButton.addEventListener('click', () => {
      this.popupAdd.open();
      this.formCardValidation.disablesSubmitForm();
    });
  }

  /** общий промис, который срабатывает при положительном результате запросов */
  fetchAllUserInfoAndCards() {
      Promise.all([this.api.getUserInfoApi(), this.api.getInitialCards()])
    .then(([userData, initialCards]) => {
      this.user.setUserInfo(userData);
      this.cardsList.renderItems(initialCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  /** ф-ция открытия попап просмотра изображений */
  viewPopupImagePic(name, link) {
    this.popupViewImage.open(name, link);
  }

  /** ф-ция записи информации в инпуты профиля*/
  inputsProfileInfo(data) {
    nameProfileInput.value = data.name;
    jobProfileInput.value = data.job;
  }

  /** создание карточки */
  createCard = (data) => {
    const card = new Card(
      {
        data: data,
        userId: this.user.getUserId(),
        viewPopupImage: () => {
          viewPopupImagePic(data);
        },
        handleCardDelete: () => {
          this.popupConfirm.open();
          this.popupConfirm.setSubmit(() => {
            this.popupConfirm.renderLoading(true, 'Удаляем...'); //подтверждаем удаление карточки
            this.api
              .removeCardApi(card.getId())
              .then(() => {
                card.removeCard();
                this.popupConfirm.close();
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                this.popupConfirm.renderLoading(false, 'Да');
              });
          });
        },
        handleCardLike: () => { //ставим лайк
          this.api
            .addCardLike(card.getId())
            .then((data) => {
              card.cardLiked(data);
            })
            .catch((err) => {
              console.log(err);
            });
        },
        handleRemoveLike: () => { //удаляем лайк
          this.api
            .removeCardLike(card.getId())
            .then((data) => {
              card.cardLiked(data);
            })
            .catch((err) => {
              console.log(err);
            });
        },
      },
      '#card__template'
    );
    return card.generateCard();
  };

}

/** экз класса Api, работает с сервером */
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '87349e01-2fa7-4c1c-a124-fc32c1131584',
    'Content-Type': 'application/json',
  },
});

const app = new App(api);

// Promise.all([api.getUserInfoApi(), api.getInitialCards()])
//   .then(([userData, initialCards]) => {
//     user.setUserInfo(userData);
//     cardsList.renderItems(initialCards);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// /** попап просмотра изображения */
// const popupViewImage = new PopupWithImage('.popup-image');
// popupViewImage.setEventListeners();

// function viewPopupImagePic(name, link) {
//   //открытие попап просмотра изображения
//   popupViewImage.open(name, link);
// }

// /** попап подтверждения удаления карточки */
// const popupConfirm = new PopupConfirmation('.popup-delete');
// popupConfirm.setEventListeners();

// /** для записи и нформации в инпуты профиля */
// function inputsProfileInfo(data) {
//   nameProfileInput.value = data.name;
//   jobProfileInput.value = data.job;
// }

// /** экземпляр класса UserInfo, который отвечает за управление отображением информации о пользователе на странице */
// const user = new UserInfo({
//   nameSelector: '.profile__name',
//   jobSelector: '.profile__job',
//   avatarSelector: '.profile__avatar',
// });

// /** попап редактирования профиля */
// const popupProfile = new PopupWithForm('.popup-profile', (inputs) => {
//   popupProfile.renderLoading(true, 'Сохраняем...');
//   api
//     .editUserInfo(inputs)
//     .then((inputs) => {
//       user.setUserInfo(inputs);
//       popupProfile.close();
//       console.log(inputs);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       popupProfile.renderLoading(false, 'Сохранить');
//     });
// });
// popupProfile.setEventListeners();

// editProfileButton.addEventListener('click', () => {
//   //открытие попап профиля
//   const userInfoProfile = user.getUserInfo();
//   inputsProfileInfo({
//     name: userInfoProfile.name,
//     job: userInfoProfile.job,
//   });
//   popupProfile.open();
//   profileValidation.disablesSubmitForm();
// });

// /** попап редактирования аватара пользователя */
// const popupAvatar = new PopupWithForm('.popup-avatar', (data) => {
//   popupAvatar.renderLoading(true, 'Сохраняем...');
//   api
//     .editUserAvatar(data)
//     .then((data) => {
//       user.setUserInfo(data);
//       popupAvatar.close();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       popupAvatar.renderLoading(false, 'Сохранить');
//     });
// });
// popupAvatar.setEventListeners();

// editAvatarButton.addEventListener('click', () => {
//   //для открытия попап аватара
//   popupAvatar.open();
// });

// /** создание новой карточки */
// const createCard = (data) => {
//   const card = new Card(
//     {
//       data: data,
//       userId: user.getUserId(),
//       viewPopupImage: () => {
//         viewPopupImagePic(data);
//       },
//       handleCardDelete: () => {
//         popupConfirm.open();
//         popupConfirm.setSubmit(() => {
//           popupConfirm.renderLoading(true, 'Удаляем...');
//           api
//             .removeCardApi(card.getId())
//             .then(() => {
//               card.removeCard();
//               popupConfirm.close();
//             })
//             .catch((err) => {
//               console.log(err);
//             })
//             .finally(() => {
//               popupConfirm.renderLoading(false, 'Да');
//             });
//         });
//       },
//       handleCardLike: () => {
//         api
//           .addCardLike(card.getId())
//           .then((data) => {
//             card.cardLiked(data);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       },
//       handleRemoveLike: () => {
//         api
//           .removeCardLike(card.getId())
//           .then((data) => {
//             card.cardLiked(data);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       },
//     },
//     '#card__template'
//   );
//   return card.generateCard();
// };

// /** экземпляр класса Section, который отвечает за отрисовку элементов на странице */
// const cardsList = new Section(
//   {
//     renderer: (item) => {
//       cardsList.addItem(createCard(item));
//     },
//   },
//   cardsBlock
// );

// /** попап добавления карточки */
// const popupAdd = new PopupWithForm('.popup-add', (data) => {
//   popupAdd.renderLoading(true, 'Создаем...');
//   api
//     .addCards(data)
//     .then((data) => {
//       cardsList.addItem(createCard(data));
//       popupAdd.close();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       popupAdd.renderLoading(false, 'Создать');
//     });
// });
// popupAdd.setEventListeners();

// addCardButton.addEventListener('click', () => {
//   //для открытия попап добавления карточоки
//   popupAdd.open();
//   formCardValidation.disablesSubmitForm();
// });

// /** валидация форм */
// const profileValidation = new FormValidator(obj, formProfile);
// profileValidation.enableValidation();

// const formCardValidation = new FormValidator(obj, formCards);
// formCardValidation.enableValidation();

// const formAvatarValidation = new FormValidator(obj, formAvatar);
// formAvatarValidation.enableValidation();
