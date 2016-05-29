/**
 * Template Tree Render
 * {
 *     div: {
 *         children: [
 *              {
 *                  span: {
 *                      // ...
 *                  }
 *              }
 *         ],
 *         className: "header__title header__title_important"
 *         ref: 'reference-name'    // reference object to the node
 *         text: '',                // text node
 *         innerHtml: '',           // inner html, can't be with "text" in the same element
 *         click: function() {}     // event handler
 *     }
 * }
 * @param tree {Object}
 * @returns {Object}
 */

export const templateTreeRender = (tree) => {
    let fragment = document.createDocumentFragment();
    let refs = {};

    const createElement = (tagName, elementData) => {
        let element = document.createElement(tagName);
        const events = ['click', 'submit'];
        if (elementData.hasOwnProperty('text') && elementData.hasOwnProperty('innerHtml')) {
            throw new Error(`Element "${tagName}" has both "text" and "innerHtml" in object. Should be one`);
        }
        for (const key in elementData) {
            switch (true) {
                case key === 'text':
                    element.createTextNode(elementData[key]);
                    break;
                case key === 'innerHTML':
                    element.innerHTML = elementData[key];
                    break;
                case key === 'children':
                    for (let i = 0, len = elementData[key].length; i < len; i++) {
                        for (const subKey in elementData[key][i]) {
                            element.appendChild(createElement(subKey, elementData[key][i][subKey]));
                        }
                    }
                    break;
                case key === 'className':
                    element.setAttribute('class', elementData[key]);
                    break;
                case key === 'ref':
                    refs[elementData[key]] = element;
                    break;
                case events.indexOf(key) > -1:
                    element.addEventListener(key, elementData[key]);
                    break;
                default:
                    element.setAttribute(key, elementData[key]);
            }
        }
        return element;
    };

    for (const key in tree) {
        let el = createElement(key, tree[key]);
        fragment.appendChild(el);
    }

    return {
        fragment,
        refs
    };
};
