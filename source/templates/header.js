import {LIB_NAME} from '../constants';
import {templateEngine} from '../services/templateEngine';

const header = (data) => {
    const template = `
        <div id="${LIB_NAME}-header">
            <div class="${LIB_NAME}-header__close"></div>
            <div class="${LIB_NAME}-header__cell">
                <div class="${LIB_NAME}-header__image">
                    <% if (data.avatar) { %>
                    <img src="<% data.avatar %>">
                    <% } %>
                </div>
            </div>
            <div class="${LIB_NAME}-header__cell">
                <div class="${LIB_NAME}-header__title">
                    <% data.title %>
                </div>
                <div class="${LIB_NAME}-header__subtitle">
                    <% data.subtitle %>
                </div>
            </div>
        </div>
    `;

    return templateEngine(template, data);
};

export default header;
