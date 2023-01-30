let buttonEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.form__close-button');
let formElement = document.querySelector('.form');
let nameInput = document.querySelector('.form__item_user_name');
let jobInput = document.querySelector('.form__item_user_job');
let nameTitle = document.querySelector('.profile__name');
let jobTitle = document.querySelector('.profile__job');

function closePopup() {
    popup.classList.remove('popup_opened');
}
function handleFormSubmit (evt) {
    evt.preventDefault();

    nameTitle.textContent = nameInput.value;
    jobTitle.textContent = jobInput.value;

    closePopup();
}

buttonEdit.addEventListener('click', function() {
    popup.classList.add('popup_opened');
    nameInput.value = nameTitle.textContent;
    jobInput.value = jobTitle.textContent;
});
buttonClose.addEventListener('click', function () {
    closePopup();
});
formElement.addEventListener('submit', handleFormSubmit);