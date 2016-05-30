import {LIB_NAME} from '../constants/general';
import {CLOSE_CHAT, OPEN_CHAT, CHAT_CLOSED, CHAT_CLOSED_SOURCE_CHAT} from '../constants/header';
import {templateTreeRender} from '../services/templateTreeRender';
import {Header} from '../components/Header';
import {Dialog} from '../components/Dialog';
import {Input} from '../components/Input';
import {eventEmitter} from '../services/eventEmitter';
import {domHelper} from '../services/domHelper';

let renderedMainFrame = null;

export const mainFrame = () => {
    const mainFrameObject = {
        div: {
            id: `${LIB_NAME}-mainframe`,
            ref: 'mainframe',
            children: [
                {
                    div: {
                        className: `${LIB_NAME}-header-container`,
                        component: Header
                    }
                },
                {
                    div: {
                        className: `${LIB_NAME}-dialog-container`,
                        component: Dialog
                    }
                },
                {
                    div: {
                        className: `${LIB_NAME}-input-container`,
                        component: Input
                    }
                }
            ]
        }
    };
    const openChatClass = `${LIB_NAME}-mainframe_open`;

    const addEvents = (mainFrameEl) => {
        eventEmitter.on(CLOSE_CHAT, (data) => {
            const closeSource = data && data.source ? data.source : CHAT_CLOSED_SOURCE_CHAT;
            domHelper.removeClass(mainFrameEl, openChatClass);
            eventEmitter.emit(CHAT_CLOSED, {source: closeSource});
        });

        eventEmitter.on(OPEN_CHAT, () => {
            domHelper.addClass(mainFrameEl, openChatClass);
        });
    };

    return {
        renderElement: () => {
            if (!renderedMainFrame) {
                renderedMainFrame = templateTreeRender(mainFrameObject);
                addEvents(renderedMainFrame.refs.mainframe);
                return renderedMainFrame;
            }
            throw new Error('mainFrame already exists in DOM');
        }
    };
};
