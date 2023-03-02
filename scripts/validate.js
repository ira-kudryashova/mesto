const obj = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__item_error',
  errorClass: 'form__item-error',
};

// Отключаем отправку форм.
function disabledSubmit(e) {
  e.preventDefault();
}

// Функция, которая добавляет класс с ошибкой. 
const showInputError = (object, formElement, inputElement, errorMessage) => {
  // находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage; // Показываем сообщение об ошибке
  errorElement.classList.add(object.errorClass); // Замена содержимого span с ошибкой на переданный параметр
};

// Функция, которая удаляет класс с ошибкой.
const hideInputError = (object, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // находим элемент ошибки
  inputElement.classList.remove(object.inputErrorClass);
  errorElement.classList.add(object.errorClass); //почему не remove?
  errorElement.textContent = ''; //Скрываем сообщение об ошибке
};

// Ищем невалидные поля. Функция принимает массив полей формы и вернет true, если хотя бы одно поле не валидно, и false, если все валидны.
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => { //Функция принимает массив полей формы и вернет true, если хотя бы одно поле не валидно, и false, если все валидны
    return !inputElement.validity.valid; //Eсли поле не валидно, вернет true. Обход массива остановится и вся фкнуция вернет true
  });
};

// Функции, которые создают неактивную и активную кнопки отправки.
const disabledSubmitBtm = (object, buttonElement) => {
  buttonElement.classList.add(object.inactiveButtonClass);
  buttonElement.disabled = true;
};

const activeSubmitBtm = (object, buttonElement) => {
  buttonElement.classList.remove(object.inactiveButtonClass);
  buttonElement.disabled = false;
};

// Функция, которая проверяет валидность полей и отключает или включает кнопку отправки.
const toggleButtonState = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) { //если хотя бы один невалидный инпут, кнопка неактивна
    disabledSubmitBtm(object, buttonElement);
  } else {
    activeSubmitBtm(object, buttonElement);
  }
};

// Функция, которая проверяет валидность поля. Принимает formElement и inputElement, не берет их из внешней области видимости.
// * функция isValid принимает сразу два параметра:
// formElement — html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
// inputElement — проверяемое поле ввода.*
const isValid = (object, formElement, inputElement) => {
  if (!inputElement.validity.valid) { // Если поле не проходит валидацию, покажем ошибку передаем сообщение об ошибке вторым аргументом
    showInputError( //ShowInputError теперь получает параметром форму, в которой находится проверяемое поле, и само это поле.
      object,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(object, formElement, inputElement); // Если поле прошло валидацию, скроем ошибку // hideInputError теперь получает параметром форму, в которой находится проверяемое полу, и само это поле.
  }
};

// Функция, которая добавляет обработчик для всех полей формы
const setEventListeners = (object, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(object.inputSelector) //Находим все поля внутри формы, делаем из них массив через Array.from
  );
  const buttonElement = formElement.querySelector(object.submitButtonSelector); // Находим в текущей форме кнопку отправки
  toggleButtonState(object, inputList, buttonElement); //Вызываем toggleButtonState, чтобы не ждать ввода данных в поля

  inputList.forEach((inputElement) => { //Обходим все элементы массива, полученного выше
    inputElement.addEventListener('input', function () { //Каждому полю добавляем обработчик события input
      isValid(object, formElement, inputElement); //Внутри колбэка вызываем isVslid, передав форму и инпут
      toggleButtonState(object, inputList, buttonElement); //Вызываем toggleButtonState и передача ей массива полей и кнопки
    });
  });
};

// Функция, которая найдет, переберет все формы на странице и добавит всем формам обработчик
const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector)); //Находим все формы с указанным классом в DOM, делаем из них массив через Array.from
  formList.forEach((formElement) => { //Перебираем полученный массив
    formElement.addEventListener('submit', disabledSubmit);
    setEventListeners(object, formElement); // Для каждой формы вызываем функцию setEventListeners, передав ей элемент формы
  });
};

enableValidation(obj);
