import {Component} from './Component';
import {LIB_NAME} from '../constants/general';
import {CLOSE_CHAT, CHAT_CLOSED_SOURCE_USER} from '../constants/header';
import {templateEngine} from '../services/templateEngine';
import {eventEmitter} from '../services/eventEmitter';
import {chatSettings} from '../services/chatSettings';

export class Header extends Component {
    constructor() {
        super();

        this.onClose = () => {
            // Event for mainframe to close the chat (remove 'open' class)
            eventEmitter.emit(CLOSE_CHAT, {source: CHAT_CLOSED_SOURCE_USER});
        };
    }

    render() {
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
        const chatData = {
            avatar: chatSettings.getProperty('avatar'),
            title: chatSettings.getProperty('title'),
            subtitle: chatSettings.getProperty('subtitle')
        };

        return {
            div: {
                id,
                innerHTML: templateEngine(innerTemplate, chatData),
                click: this.onClose
            }
        };
    }
}
