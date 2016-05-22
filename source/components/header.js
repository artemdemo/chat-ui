import {LIB_NAME} from '../constants/general';
import {templateEngine} from '../services/templateEngine';
import {templateTreeRender} from '../services/templateTreeRender';

export const header = (() => {
    const id = `${LIB_NAME}-header`;
    const innerTemplate = `
        <div class="${LIB_NAME}-header__close"></div>
        <div class="${LIB_NAME}-header__cell ${LIB_NAME}-header__cell_image">
            <div class="${LIB_NAME}-header__image"
                 <% if (avatar) { %>
                 style="background-image: url('<% avatar %>')"
                 <% } %>
                 >
            </div>
        </div>
        <div class="${LIB_NAME}-header__cell ${LIB_NAME}-header__cell_title">
            <div class="${LIB_NAME}-header__title">
                <% title %>
            </div>
            <div class="${LIB_NAME}-header__subtitle">
                <% subtitle %>
            </div>
        </div>
    `;
    const template = `
        <div id="${id}">
            ${innerTemplate}
        </div>
    `;

    return {
        renderTemplate: (data) => {
            return templateEngine(template, data);
        },

        renderElement: (data) => {
            return templateTreeRender({
                div: {
                    id,
                    innerHTML: templateEngine(innerTemplate, data)
                }
            });
        }
    };
})();
