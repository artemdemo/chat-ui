import {mainFrame} from './components/mainFrame';
import {dialog} from './components/dialog';
import {eventEmitter} from './services/eventEmitter';
import {ADD_PHRASE, IS_TYPING} from './constants/dialog';

const ChatUI = (chatData) => {

    const addMainFrameEvents = () => {};

    const addDialogEvents = () => {
        eventEmitter.addListener(ADD_PHRASE, dialog.addPhrase);
        eventEmitter.addListener(IS_TYPING, () => {
            dialog.addPhrase({
                type: IS_TYPING
            });
        });
    };

    return {
        render: (querySelector, componentName) => {
            const baseEl = document.querySelector(querySelector);
            if (!baseEl) {
                throw new Error(`Given selector ${querySelector} is not match to any element`);
            }
            switch (componentName) {
                case 'dialog':
                    baseEl.appendChild(dialog.renderElement({}).fragment);
                    break;
                case 'mainFrame':
                default:
                    let mainFrameObj = mainFrame();
                    baseEl.appendChild(mainFrameObj.renderElement(chatData).fragment);
                    break;
            }
            addDialogEvents();
            return {
                on: (eventName, callback) => {
                    eventEmitter.addListener(eventName, callback);
                },
                off: (eventName, callback) => {
                    eventEmitter.removeListener(eventName, callback);
                },
                trigger: (eventName, data) => {
                    eventEmitter.emit(eventName, data);
                }
            };
        }
    };
};

export default ChatUI;
