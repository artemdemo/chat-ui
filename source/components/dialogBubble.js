import {LIB_NAME} from '../constants/general';
import {templateEngine} from '../services/templateEngine';
import {templateTreeRender} from '../services/templateTreeRender';

export const dialogBubble = (() => {
    const bubbleClass = `${LIB_NAME}-dialog-bubble`;
    const bubbleContainerClass = `${LIB_NAME}-dialog-bubble-container`;
    const innerTemplate = `
        <div class="<% bubbleClass %>">
            <div class="${LIB_NAME}-dialog-bubble__text">
                <% message %>
            </div>
        </div>
    `;

    return {
        /**
         * Render bubble element
         * @param data {Object}
         * @param data.side {String} - 'user', 'chat'
         * @param data.message {String}
         * @param data.type {String} - 'temporary'
         * @returns {Object}
         */
        renderElement: (data) => {
            let bubbleClasses = [];
            bubbleClasses.push(bubbleClass);
            if (data.side) {
                bubbleClasses.push(`${bubbleClass}_${data.side}`);
            }
            if (data.type) {
                bubbleClasses.push(`${bubbleClass}_${data.type}`);
            }
            data.bubbleClass = bubbleClasses.join(' ');
            return templateTreeRender({
                div: {
                    className: bubbleContainerClass,
                    innerHTML: templateEngine(innerTemplate, data),
                    ref: 'bubbleContainer'
                }
            });
        }
    };
})();

