let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');

editButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
});

let closeButton = document.querySelector('.form__close-button');
closeButton.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});

   // Находим форму в DOM
let formElement = document.querySelector('.form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.form__item_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.form__item_job'); // Воспользуйтесь инструментом .querySelector()
let nameTitle = document.querySelector('.profile__name');
let jobTitle = document.querySelector('.profile__job');

function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value; // Получите значение полей jobInput и nameInput из свойства value

    nameTitle.textContent = nameInputValue; // Вставьте новые значения с помощью textContent
    jobTitle.textContent = jobInputValue;

    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);