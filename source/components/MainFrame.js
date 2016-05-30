import {LIB_NAME} from '../constants/general';
import {CLOSE_CHAT, OPEN_CHAT, CHAT_CLOSED, CHAT_CLOSED_SOURCE_CHAT} from '../constants/header';
import {Component} from '../components/Component';
import {Header} from '../components/Header';
import {Dialog} from '../components/Dialog';
import {Input} from '../components/Input';
import {eventEmitter} from '../services/eventEmitter';
import {domHelper} from '../services/domHelper';

export class MainFrame extends Component {
    constructor() {
        super();
        this.openChatClass = `${LIB_NAME}-mainframe_open`;
    }

    addEvents() {
        eventEmitter.on(CLOSE_CHAT, (data) => {
            const closeSource = data && data.source ? data.source : CHAT_CLOSED_SOURCE_CHAT;
            domHelper.removeClass(this.refs.mainframe, this.openChatClass);
            eventEmitter.emit(CHAT_CLOSED, {source: closeSource});
        });

        eventEmitter.on(OPEN_CHAT, () => {
            domHelper.addClass(this.refs.mainframe, this.openChatClass);
        });
    }

    render() {
        this.addEvents();

        return {
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
    }
}
