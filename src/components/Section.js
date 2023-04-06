/** Section отвечает за отрисовку элементов на странице, у него нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер. */
class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items; //массив данных, которые нужно добавить на страницу
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
    this._container = containerSelector; //сюда добавляются созданные элементы
  }

  renderItems() {
    //метод, отвечающий за отрисовку всех элементов функцией renderer
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    //публичный метод, который принимат DOM-элемент и добавляет в начало контейнера
    this._container.prepend(element);
  }
}

export { Section };
