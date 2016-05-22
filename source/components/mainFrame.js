import {LIB_NAME} from '../constants/general';
import {templateTreeRender} from '../services/templateTreeRender';
import {header} from '../components/header';
import {dialog} from '../components/dialog';
import {input} from '../components/input';

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

    return {
        renderElement: (newSettings) => {
            if (!renderedMainFrame) {
                renderedMainFrame = templateTreeRender(mainFrameObject);
                updateContainer('header', header.renderElement(newSettings).fragment);
                updateContainer('dialog', dialog.renderElement({}).fragment);
                updateContainer('input', input.renderElement({}).fragment);
                return renderedMainFrame;
            }
            throw new Error('mainFrame already exists in DOM');
        }
    };
};
