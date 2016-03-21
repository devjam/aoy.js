/**
 * スクロールを発生させずに要素にフォーカスする
 * @param {Object} element フォーカスする要素
 */
const noScrollFocus = function noScrollFocus(element) {
    var x = window.scrollX || window.pageXOffset;
    var y = window.scrollY || window.pageYOffset;
    element.focus();
    window.scroll(x, y);
};

export default noScrollFocus
