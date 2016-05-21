import {mainFrame} from './components/mainFrame';
import {dialog} from './components/dialog';

const ChatUI = (chatData) => {

    const addMainFrameEvents = () => {};

    const addDialogEvents = () => {};

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
            return {
                on: (eventName) => {},
                trigger: (eventName) => {}
            };
        }
    };
};

export default ChatUI;
