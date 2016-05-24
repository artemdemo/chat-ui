import {LIB_NAME} from '../constants/general';
import {CLOSE_CHAT, OPEN_CHAT} from '../constants/header';
import {templateTreeRender} from '../services/templateTreeRender';
import {header} from '../components/header';
import {dialog} from '../components/dialog';
import {input} from '../components/input';
import {eventEmitter} from '../services/eventEmitter';
import {domHelper} from '../services/domHelper';

let renderedMainFrame = null;

export const mainFrame = () => {
    const mainFrameParts = ['header', 'dialog', 'input'];
    const mainFrameObject = {
        div: {
            id: `${LIB_NAME}-mainframe`,
            ref: 'mainframe',
            children: [
                {
                    div: {
                        className: `${LIB_NAME}-header-container`,
                        ref: 'header'
                    }
                },
                {
                    div: {
                        className: `${LIB_NAME}-dialog-container`,
                        ref: 'dialog'
                    }
                },
                {
                    div: {
                        className: `${LIB_NAME}-input-container`,
                        ref: 'input'
                    }
                }
            ]
        }
    };

    const updateContainer = (containerName, newElement) => {
        if (mainFrameParts.indexOf(containerName) > -1) {
            renderedMainFrame.refs[containerName].appendChild(newElement);
            return renderedMainFrame.refs[containerName];
        }
        throw new Error(`There is no "${containerName}" container in mainFrame`);
    };

    const addEvents = (mainFrameEl) => {
        const openChatClass = `${LIB_NAME}-mainframe_open`;

        eventEmitter.on(CLOSE_CHAT, () => {
            domHelper.removeClass(mainFrameEl, openChatClass);
        });

        eventEmitter.on(OPEN_CHAT, () => {
            domHelper.addClass(mainFrameEl, openChatClass);
        });
    };

    return {
        renderElement: (newSettings) => {
            if (!renderedMainFrame) {
                renderedMainFrame = templateTreeRender(mainFrameObject);
                updateContainer('header', header.renderElement(newSettings).fragment);
                updateContainer('dialog', dialog.renderElement({}).fragment);
                updateContainer('input', input.renderElement({}).fragment);
                addEvents(renderedMainFrame.refs.mainframe);
                return renderedMainFrame;
            }
            throw new Error('mainFrame already exists in DOM');
        }
    };
};
