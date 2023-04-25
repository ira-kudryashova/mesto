/** Section отвечает за отрисовку элементов на странице, у него нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер. */
class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer; //функция, которая отвечает за создание и отрисовку данных на странице
    //this._container = document.querySelector(containerSelector); //сюда добавляются созданные элементы
    this._container = container; //сюда добавляются созданные элементы
  }

  renderItems(items) {
    //метод, отвечающий за отрисовку всех элементов функцией renderer
    items.forEach(item => {this._renderer(item)});
  };

  addItem(element) {
    //публичный метод, который принимат DOM-элемент и добавляет в начало контейнера
    this._container.prepend(element);
  }
}

export { Section };