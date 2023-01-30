let buttonEdit = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let buttonClose = document.querySelector('.form__close-button');
let formElement = document.querySelector('.form'); // Воспользуйтесь методом querySelector()
let nameInput = document.querySelector('.form__item_user_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.form__item_user_job'); // Воспользуйтесь инструментом .querySelector()
let nameTitle = document.querySelector('.profile__name');
let jobTitle = document.querySelector('.profile__job');

function closePopup() {
    popup.classList.remove('popup_opened');
}
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
     // Получите значение полей jobInput и nameInput из свойства value

    nameTitle.textContent = nameInput.value; // Вставьте новые значения с помощью textContent
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