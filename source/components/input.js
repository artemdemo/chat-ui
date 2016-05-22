import {LIB_NAME} from '../constants/general';
import {ADD_PHRASE, SIDE_USER, USER_SEND_MESSAGE} from '../constants/dialog';
import {templateEngine} from '../services/templateEngine';
import {templateTreeRender} from '../services/templateTreeRender';
import {eventEmitter} from '../services/eventEmitter';
import {chatSettings} from '../services/chatSettings';

export const input = (() => {
    const id = `${LIB_NAME}-input`;
    const inputClass = `${LIB_NAME}-input__input-field`;
    const innerTemplate = `
        <div class="${LIB_NAME}-input__cell">
            <input type="text" class="${inputClass}" placeholder="<% inputPlaceholder %>" />
        </div>
        <div class="${LIB_NAME}-input__cell">
            <button type="submit" class="${LIB_NAME}-input__send">
                <% sendText %>
            </button>
        </div>
    `;

    const onSubmit = (event) => {
        event.preventDefault();
        if (inputEl.value !== '') {
            eventEmitter.emit(ADD_PHRASE, {
                side: SIDE_USER,
                message: inputEl.value
            });
            eventEmitter.emit(USER_SEND_MESSAGE, inputEl.value);
            inputEl.value = '';
        }
    };

    let inputEl = null;

    return {
        renderElement: () => {
            const data = {
                sendText: chatSettings.getProperty('sendText'),
                inputPlaceholder: chatSettings.getProperty('inputPlaceholder')
            };
            const inputFormRendered = templateTreeRender({
                form: {
                    id,
                    innerHTML: templateEngine(innerTemplate, data),
                    ref: 'inputForm'
                }
            });
            inputFormRendered.refs.inputForm.addEventListener('submit', onSubmit);
            const $$inputEl = inputFormRendered.refs.inputForm.getElementsByClassName(inputClass);
            if ($$inputEl) {
                inputEl = $$inputEl[0];
            }
            return inputFormRendered;
        }
    };
})();

