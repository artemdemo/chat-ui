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
 *         class: "header__title header__title_important"
 *         text: '',       // text node
 *         innerHtml: ''   // inner html, can't be with "text" in the same element
 *     }
 * }
 * @param tree {Object}
 * @returns {DocumentFragment}
 */

export const templateTreeRender = (tree) => {
    let fragment = document.createDocumentFragment();

    for (const key in tree) {
        let element = document.createElement(key);
    }

    return fragment;
};
