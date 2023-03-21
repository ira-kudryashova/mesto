class Card {
  constructor(data, templateSelector, viewPopupImage) {
    this._name = data.name;
    this._link = data.link;
    this._viewPopupImage = viewPopupImage;
    this._templateSelector = templateSelector;
  }

  /** добавляем классу метод _getTemplate, который: */
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector) // найдёт template-элемент (используем селектор, который передаем их index.js при создании карточки. Конструктор становится универсальным для разных template-элементов)
      .content.querySelector(".card") // извлечет его содержимое и в содержимом найдёт элемент с классом card
      .cloneNode(true); // клонирует его

    return cardElement; // вернёт клонированный элемент
  }

  /** добавляем классу метод, который вставит данные в разметку и подготовит карточку к публикации */
  generateCard() {
    this._element = this._getTemplate(); // запишем в разметку приватное поле _cardElement (у др.элементов появится доступ к ней)

    /** добавим данные */
    this._elementImage = this._element.querySelector(".card__pic");
    this._elementName = this._element.querySelector(".card__name");
    this._elementLike = this._element.querySelector(".card__like");
    this._elementTrash = this._element.querySelector(".card__trash");

    this._setEventListeners();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._link;
    this._elementName.textContent = this._name;

    return this._element; // вернем наружу
  }

  /** лайк карточки */
  _like() {
    this._elementLike.classList.toggle("card__like_active");
  }

  /** удаление карточки */
  _trash() {
    this._element.remove();
    this._element = null;
  }

  /** метод добавления всех обработчиков в одном месте*/
  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._viewPopupImage(this._name, this._link);
    });

    this._elementLike.addEventListener("click", () => this._like());
    this._elementTrash.addEventListener("click", () => this._trash());
  }
}

/** публикация карточки */
// initialCards.forEach((item) => { // обходим весь массив и для каждого элемента:
//     const card = new Card(item, '#card__template'); // создаем экз. класса Card
//     const cardElement = card.generateCard(); // готовим карточку к публикации
//     document.querySelector('.cards').append(cardElement); // публикуем в секцию .cards DOM-дерева
// });

export { Card };
