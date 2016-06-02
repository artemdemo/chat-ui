
import {Component} from './Component';
import {LIB_NAME} from '../constants/general';
import {IS_TYPING, SIDE_USER, SIDE_CHAT, CLEAR_DIALOG, ADD_PHRASE, USER_SEND_MESSAGE} from '../constants/dialog';
import {templateEngine} from '../services/templateEngine';
import {componentRender} from '../services/componentRender';
import {dialogList} from '../services/dialogList';
import {chatSettings} from '../services/chatSettings';
import {eventEmitter} from '../services/eventEmitter';
import {sanitize} from '../services/sanitize';
import {DialogBubble} from './DialogBubble';

export class Dialog extends Component {
    constructor() {
        super();

        this.dialogListEl = null;

        /**
         * Add phrase to the dialog
         * @param data {Object}
         * @param data.side {string}
         * @param data.message {string}
         * @param data.type {string}
         */
        this.addPhrase = (data) => {
            if (!this.dialogListEl) {
                const dialogEl = this.refs.dialogEl;
                const $$dialogListEl = dialogEl.getElementsByClassName(`${LIB_NAME}-dialog-list`);
                if ($$dialogListEl) {
                    this.dialogListEl = $$dialogListEl[0];
                }
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
                message = sanitize(typeof data === 'string' ? data : data.message);
            }
            const bubbleComponent = componentRender(DialogBubble, {
                side,
                message,
                type: data.type
            });
            if (temporaryPhrase && side !== temporaryPhrase.side) {
                this.dialogListEl.insertBefore(bubbleComponent, temporaryPhrase.ref);
            } else {
                if (temporaryPhrase) {
                    temporaryPhrase.ref.parentNode.removeChild(temporaryPhrase.ref);
                }
                this.dialogListEl.appendChild(bubbleComponent);
            }
            if (side === SIDE_USER) {
                eventEmitter.emit(USER_SEND_MESSAGE, data.message);
            }
            this.scrollDialogDown();
        };
    }

    scrollDialogDown() {
        this.refs.dialogEl.scrollTop = this.refs.dialogEl.scrollHeight;
    }

    addEvents() {
        eventEmitter.addListener(ADD_PHRASE, this.addPhrase);
        eventEmitter.addListener(IS_TYPING, () => {
            this.addPhrase({
                type: IS_TYPING
            });
        });
        eventEmitter.on(CLEAR_DIALOG, () => {
            this.dialogListEl.innerHTML = '';
            dialogList.clearDialog();
        });
    }

    render() {
        const id = `${LIB_NAME}-dialog`;
        const innerTemplate = `
            <div class="${LIB_NAME}-dialog-list">
            </div>
        `;

        this.addEvents();
        return {
            div: {
                id,
                innerHTML: templateEngine(innerTemplate, {}),
                ref: 'dialogEl'
            }
        };
    }
}
