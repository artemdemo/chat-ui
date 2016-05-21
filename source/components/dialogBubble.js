import {LIB_NAME} from '../constants';
import {templateEngine} from '../services/templateEngine';
import {templateTreeRender} from '../services/templateTreeRender';

export const dialogBubble = (() => {
    const className = `${LIB_NAME}-dialog-bubble`;
    const innerTemplate = `
        <div class="${LIB_NAME}-dialog-bubble__text">
            <% text %>
        </div>
    `;
    const template = `
        <div class="${className}">
            ${innerTemplate}
        </div>
    `;

    return {
        renderTemplate: (data) => {
            return templateEngine(template, data);
        },

        /**
         * Render bubble element
         * @param data {Object}
         * @param data.side {String} - 'user', 'chat'
         * @param data.message {String}
         * @returns {Object}
         */
        renderElement: (data) => {
            let bubbleClass = [];
            bubbleClass.push(className);
            if (data.side) {
                bubbleClass.push(`${className}_${data.side}`);
            }
            return templateTreeRender({
                div: {
                    className: bubbleClass.join(' '),
                    innerHTML: templateEngine(innerTemplate, data)
                }
            });
        }
    };
})();

