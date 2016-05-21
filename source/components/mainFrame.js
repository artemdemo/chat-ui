import {LIB_NAME} from '../constants';
import {templateEngine} from '../services/templateEngine';

const mainFrame = (data) => {
    const template = `
        <div id="${LIB_NAME}-mainframe">
            <div class="${LIB_NAME}-header-container">
                <% data.header %>
            </div>
            <div class="${LIB_NAME}-dialog-container">
                <% data.dialog %>
            </div>
            <div class="${LIB_NAME}-input-container">
                <% data.input %>
            </div>
        </div>
    `;

    return templateEngine(template, data);
};

export default mainFrame;
