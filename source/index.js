import {MainFrame} from './components/MainFrame';
import {Dialog} from './components/Dialog';
import {eventEmitter} from './services/eventEmitter';
import {chatSettings} from './services/chatSettings';
import {componentRender} from './services/componentRender';

const ChatUI = (chatData) => {

    return {
        render: (querySelector, componentName) => {
            const baseEl = document.querySelector(querySelector);
            if (!baseEl) {
                throw new Error(`Given selector ${querySelector} is not match to any element`);
            }
            chatSettings.setSettings(chatData);
            switch (componentName) {
                case 'dialog':
                    baseEl.appendChild(componentRender(Dialog));
                    break;
                case 'mainFrame':
                default:
                    baseEl.appendChild(componentRender(MainFrame));
                    break;
            }
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
