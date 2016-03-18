/**
 * スクロールを発生させずに要素にフォーカスする
 * @param {Object} element フォーカスする要素
 * @param {Object} [context = window] スクロールをロックするノード
 */
const noScrollFocus = function noScrollFocus(element, context) {
    context = context || window;
    var x = context.pageXOffset;
    var y = context.pageYOffset;
    element.focus();
    context.scroll(x, y);
};

export default noScrollFocus
