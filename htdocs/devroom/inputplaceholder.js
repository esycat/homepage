/**
 * Input placeholder handler
 *
 * @author Eugene Janusov <esycat@gmail.com>
 * @param Event event -- ������ �������
 * @param HTMLInputElement el -- ������ ��������
 * @param String className -- �������� ������
 */
var inputPlaceholder = function(event, el, className) {
    event = event || window.event;
    el = el || this;
    className = className || 'placeholder';

    /**
     * ���� ��� �������� �� ��������� (����������� ������������),
     * �� ���������� ���������.
     */
    if (el.defaultValue == '') return false;

    /**
     * ���� ������� �������� ������������ ���������� ����,
     * � ��� �������� ����� �������� �� ���������,
     * �� �������� ����� ����������� �� ������ ������.
     *
     * ���� ������� �������� ������� ������ ���������� ����,
     * � ��� �������� ����� ������ ������, �� � �������� ������
     * ��������� �������� �� ���������.
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
     * � ����������� �� �������� �������� �������� ����������.
     */
    if (el.value == el.defaultValue) {
      $(el).addClass(className);
    }
    else {
      $(el).removeClass(className);
    }
  }

/**
 * �� ������� �������� ��������� ��������� ��������� �������,
 * ������� �������� ��� �������� � ������� placeholder
 * � ��������� ���� ��������� ����������� ������� focus, blur
 * � change, ������� ��������� ������� inputPlaceholder.
 *
 * �������� ����� ���� ������������, ������� � ������ ������
 * ����� ���������� ��� �������� ����� inputPlaceholder.
 */
$(document).ready(function() {
    $(".placeholder").focus(inputPlaceholder);
    $(".placeholder").blur(inputPlaceholder);
    $(".placeholder").change(inputPlaceholder);
    $(".placeholder").each(inputPlaceholder);
});
