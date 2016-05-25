import {LIB_NAME} from '../constants/general';
import {CLOSE_CHAT, CHAT_CLOSED_SOURCE_USER} from '../constants/header';
import {templateEngine} from '../services/templateEngine';
import {templateTreeRender} from '../services/templateTreeRender';
import {eventEmitter} from '../services/eventEmitter';

export const header = (() => {
    const id = `${LIB_NAME}-header`;
    const closeBtnClass = `${LIB_NAME}-header__close`;
    const innerTemplate = `
        <div class="${closeBtnClass}"></div>
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

    const onClose = () => {
        // Event for mainframe to close the chat (remove 'open' class)
        eventEmitter.emit(CLOSE_CHAT, {source: CHAT_CLOSED_SOURCE_USER});
    };

    return {
        renderElement: (data) => {
            const renderedHeader = templateTreeRender({
                div: {
                    id,
                    innerHTML: templateEngine(innerTemplate, data),
                    ref: 'header'
                }
            });
            renderedHeader.refs.header.addEventListener('click', onClose);
            return renderedHeader;
        }
    };
})();
