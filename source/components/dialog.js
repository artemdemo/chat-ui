import {LIB_NAME} from '../constants';
import {templateEngine} from '../services/templateEngine';
import {templateTreeRender} from '../services/templateTreeRender';
import {dialogBubble} from './dialogBubble';

export const dialog = (() => {
    const id = `${LIB_NAME}-dialog`;
    const innerTemplate = `
        <div class="${LIB_NAME}-dialog-list">
        </div>
    `;
    const template = `
        <div id="${id}">
            ${innerTemplate}
        </div>
    `;
    let dialogListEl = null;

    return {
        renderTemplate: (data) => {
            return templateEngine(template, data || {});
        },

        renderElement: (data) => {
            const dialogRendered = templateTreeRender({
                div: {
                    id,
                    innerHTML: templateEngine(innerTemplate, data || {}),
                    ref: 'dialogEl'
                }
            });
            dialogListEl = dialogRendered.refs.dialogEl.querySelector(`${LIB_NAME}-dialog-list`);
            return dialogRendered;
        },

        addPhrase: (data) => {
            if (!dialogListEl) {
                throw new Error('Dialog component in not rendered');
            }
            dialogListEl.appendChild(dialogBubble.renderElement(data));
        }
    };
})();

