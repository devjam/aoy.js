/**
 * フォーカス可能な要素のセレクター文字列
 * @type {string}
 */
const focusableElementsSelectors = `a[href]:not([tabindex^="-"]),
area[href]:not([tabindex^="-"]),
input:not([disabled]):not([tabindex^="-"]),
select:not([disabled]):not([tabindex^="-"]),
textarea:not([disabled]):not([tabindex^="-"]),
button:not([disabled]):not([tabindex^="-"]),
iframe:not([tabindex^="-"]),
object:not([tabindex^="-"]),
embed:not([tabindex^="-"]),
[tabindex]:not([tabindex^="-"]),
[contentEditable]:not([tabindex^="-"])`;

/**
 * フォーカス可能な要素を全て取得する。
 * 取得したものと除外したものの両方を返す
 * @param {String} excludeSelectors 除外するセレクターの文字列
 * @param {Document|Element} [context = document]
 * @returns {{focusable: Array.<Element>, excluded: Array.<Element>}}
 */
const getFocusableElements = function getFocusableElements(excludeSelectors, context) {
    var focusableElementsAll;
    var focusableElements = [];
    var excludeElements = [];

    context = context || document;
    focusableElementsAll = context.querySelectorAll(focusableElementsSelectors);

    if (!excludeSelectors) {
        focusableElements = Array.from(focusableElementsAll);
    } else {
        let i = 0;
        let iz = focusableElementsAll.length;
        for (; i < iz; i = i + 1) {
            let element = focusableElementsAll[i];
            if (element.matches(excludeSelectors)) {
                excludeElements.push(element);
                continue;
            }
            focusableElements.push(element);
        }
    }
    return {
        focusable: focusableElements,
        excluded: excludeElements
    }
};

export default getFocusableElements;
