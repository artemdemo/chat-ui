import sanitizeHtml from 'sanitize-html';
import {LIB_NAME} from '../constants/general';
import {IS_TYPING, SIDE_USER, SIDE_CHAT, CLEAR_DIALOG} from '../constants/dialog';
import {templateEngine} from '../services/templateEngine';
import {templateTreeRender} from '../services/templateTreeRender';
import {dialogList} from '../services/dialogList';
import {chatSettings} from '../services/chatSettings';
import {eventEmitter} from '../services/eventEmitter';
import {dialogBubble} from './dialogBubble';

export const dialog = (() => {
    const id = `${LIB_NAME}-dialog`;
    const innerTemplate = `
        <div class="${LIB_NAME}-dialog-list">
        </div>
    `;

    let dialogListEl = null;
    let dialogEl = null;

    const scrollDialogDown = function() {
        dialogEl.scrollTop = dialogEl.scrollHeight;
    };

    const addEvents = () => {
        eventEmitter.on(CLEAR_DIALOG, () => {
            dialogListEl.innerHTML = '';
            dialogList.clearDialog();
        });
    };

    return {
        renderElement: (data) => {
            const dialogRendered = templateTreeRender({
                div: {
                    id,
                    innerHTML: templateEngine(innerTemplate, data || {}),
                    ref: 'dialogEl'
                }
            });
            dialogEl = dialogRendered.refs.dialogEl;
            const $$dialogListEl = dialogEl.getElementsByClassName(`${LIB_NAME}-dialog-list`);
            if ($$dialogListEl) {
                dialogListEl = $$dialogListEl[0];
            }
            addEvents();
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
                console.warn('There is already "is-typing" phrase in the dialog. You can\'t add another one.');
                return;
            }
            const side = data.side === SIDE_USER ? SIDE_USER : SIDE_CHAT;
            if (data.type === IS_TYPING) {
                message = chatSettings.getProperty('isTyping');
            } else {
                message = sanitizeHtml(
                    typeof data === 'string' ? data : data.message,
                    chatSettings.getProperty('sanitizeOptions')
                );
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
            scrollDialogDown();
        }
    };
})();

