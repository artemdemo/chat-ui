import {Component} from './Component';
import {LIB_NAME} from '../constants/general';
import {IS_TYPING} from '../constants/dialog';
import {templateEngine} from '../services/templateEngine';
import {dialogList} from '../services/dialogList';

export class DialogBubble extends Component {
    constructor() {
        super();

        this.side = '';
        this.message = '';
        this.type = null;
    }

    componentWillMount() {
        dialogList.addPhrase({
            side: this.side,
            message: this.message,
            ref: this.type === IS_TYPING ? this.refs.bubbleContainer : null,
            type: this.type
        });
    }

    /**
     * Render bubble element
     * @param data {Object}
     * @param data.side {String} - 'user', 'chat'
     * @param data.message {String}
     * @param data.type {String} - 'is-typing'
     * @returns {Object}
     */
    render(data) {
        const bubbleClass = `${LIB_NAME}-dialog-bubble`;
        const bubbleContainerClass = `${LIB_NAME}-dialog-bubble-container`;
        const innerTemplate = `
            <div class="<% bubbleClass %>">
                <div class="${LIB_NAME}-dialog-bubble__text">
                    <% message %>
                </div>
            </div>
        `;

        this.side = data.side;
        this.message = data.message;
        this.type = data.type;

        let bubbleClasses = [];
        bubbleClasses.push(bubbleClass);
        if (data.side) {
            bubbleClasses.push(`${bubbleClass}_${data.side}`);
        }
        if (data.type) {
            bubbleClasses.push(`${bubbleClass}_${data.type}`);
        }
        data.bubbleClass = bubbleClasses.join(' ');

        return {
            div: {
                className: bubbleContainerClass,
                innerHTML: templateEngine(innerTemplate, data),
                ref: 'bubbleContainer'
            }
        };
    }
}
