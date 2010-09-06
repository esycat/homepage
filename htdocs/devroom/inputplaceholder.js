/**
 * Input placeholder handler
 *
 * @author Eugene Janusov <esycat@gmail.com>
 * @param Event event -- объект события
 * @param HTMLInputElement el -- объект элемента
 * @param String className -- название класса
 */
var inputPlaceholder = function(event, el, className) {
    event = event || window.event;
    el = el || this;
    className = className || 'placeholder';

    /**
     * Если нет значения по умолчанию (являющегося заполнителем),
     * то прекращаем обработку.
     */
    if (el.defaultValue == '') return false;

    /**
     * Если событие является фокусировкой текстового поля,
     * а его значение равно значению по умолчанию,
     * то заменяем текст заполнителя на пустую строку.
     *
     * Если событие является потерей фокуса текстового поля,
     * а его значение равно пустой строке, то в качестве текста
     * указываем значение по умолчанию.
     */
    if (event) {
      if (event.type == 'focus' && el.value == el.defaultValue) {
        el.value = '';
      }
      else if (event.type == 'blur' && el.value == '') {
        el.value = el.defaultValue;
      }
    }

    /**
     * В зависимости от значения элемента изменяем оформление.
     */
    if (el.value == el.defaultValue) {
      $(el).addClass(className);
    }
    else {
      $(el).removeClass(className);
    }
  }

/**
 * На событие загрузки документа добавляем анонимную функцию,
 * которая выбирает все элементы с классом placeholder
 * и добавляем этим элементам обработчики событий focus, blur
 * и change, которые выполняют функцию inputPlaceholder.
 *
 * Документ может быть перезагружен, поэтому с самого начала
 * нужно пропустить все элементы через inputPlaceholder.
 */
$(document).ready(function() {
    $(".placeholder").focus(inputPlaceholder);
    $(".placeholder").blur(inputPlaceholder);
    $(".placeholder").change(inputPlaceholder);
    $(".placeholder").each(inputPlaceholder);
});
