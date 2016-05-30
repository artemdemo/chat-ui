import {Component} from './Component';
import {LIB_NAME} from '../constants/general';
import {ADD_PHRASE, SIDE_USER, USER_SEND_MESSAGE} from '../constants/dialog';
import {OPEN_CHAT} from '../constants/header';
import {templateEngine} from '../services/templateEngine';
import {eventEmitter} from '../services/eventEmitter';
import {chatSettings} from '../services/chatSettings';

export class Input extends Component {
    constructor() {
        super();

        this.inputClass = `${LIB_NAME}-input__input-field`;
        this.inputEl = null;

        this.onSubmit = (event) => {
            event.preventDefault();
            if (this.inputEl.value !== '') {
                eventEmitter.emit(ADD_PHRASE, {
                    side: SIDE_USER,
                    message: this.inputEl.value
                });
                eventEmitter.emit(USER_SEND_MESSAGE, this.inputEl.value);
                this.inputEl.value = '';
            }
        };
    }

    addEvents() {
        eventEmitter.on(OPEN_CHAT, () => {
            if (!this.inputEl) {
                const $$inputEl = this.refs.inputForm.getElementsByClassName(this.inputClass);
                if ($$inputEl) {
                    this.inputEl = $$inputEl[0];
                }
            }
            setTimeout(() => {
                this.inputEl.focus();
            });
        });
    }

    render() {
        const data = {
            sendText: chatSettings.getProperty('sendText'),
            inputPlaceholder: chatSettings.getProperty('inputPlaceholder')
        };

        const id = `${LIB_NAME}-input`;
        const innerTemplate = `
            <div class="${LIB_NAME}-input__cell">
                <input type="text" class="${this.inputClass}" placeholder="<% inputPlaceholder %>" />
            </div>
            <div class="${LIB_NAME}-input__cell">
                <button type="submit" class="${LIB_NAME}-input__send">
                    <% sendText %>
                </button>
            </div>
        `;

        this.addEvents();

        return {
            form: {
                id,
                innerHTML: templateEngine(innerTemplate, data),
                ref: 'inputForm',
                submit: this.onSubmit
            }
        };
    }
}
