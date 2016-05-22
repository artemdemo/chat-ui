import {LIB_NAME} from '../constants/general';
import {IS_TYPING} from '../constants/dialog';
import {templateEngine} from '../services/templateEngine';
import {templateTreeRender} from '../services/templateTreeRender';
import {dialogList} from '../services/dialogList';
import {chatSettings} from '../services/chatSettings';
import {dialogBubble} from './dialogBubble';

export const dialog = (() => {
    const id = `${LIB_NAME}-dialog`;
    const innerTemplate = `
        <div class="${LIB_NAME}-dialog-list">
        </div>
    `;

    let dialogListEl = null;

    return {
        renderElement: (data) => {
            const dialogRendered = templateTreeRender({
                div: {
                    id,
                    innerHTML: templateEngine(innerTemplate, data || {}),
                    ref: 'dialogEl'
                }
            });
            const $$dialogListEl = dialogRendered.refs.dialogEl.getElementsByClassName(`${LIB_NAME}-dialog-list`);
            if ($$dialogListEl) {
                dialogListEl = $$dialogListEl[0];
            }
            return dialogRendered;
        },

        /**
         * Add phrase to the dialog
         * @param data {Object}
         * @param data.side {string}
         * @param data.message {string}
         * @param data.type {string}
         */
        addPhrase: (data) => {
            if (!dialogListEl) {
                throw new Error('Dialog component in not rendered');
            }
            const temporaryPhrase = dialogList.getTemporaryPhrase();
            let message;
            if (temporaryPhrase && data.type === IS_TYPING) {
                throw new Error('There is already temporary phrase in the dialog. You can\'t add another one.');
            }
            const side = data.side === 'user' ? 'user' : 'chat';
            if (data.type === IS_TYPING) {
                message = chatSettings.getProperty('isTyping');
            } else {
                message = typeof data === 'string' ? data : data.message;
            }
            const renderedBubble = dialogBubble.renderElement({
                side,
                message,
                type: data.type
            });
            if (temporaryPhrase && side !== temporaryPhrase.side) {
                dialogListEl.insertBefore(renderedBubble.fragment, temporaryPhrase.ref);
            } else {
                if (temporaryPhrase) {
                    temporaryPhrase.ref.parentNode.removeChild(temporaryPhrase.ref);
                }
                dialogListEl.appendChild(renderedBubble.fragment);
            }
            dialogList.addPhrase({
                side,
                message,
                ref: data.type === IS_TYPING ? renderedBubble.refs.bubbleContainer : null,
                type: data.type
            });
        }
    };
})();

