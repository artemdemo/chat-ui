import sanitizeHtml from 'sanitize-html';
import {eventEmitter} from './eventEmitter';
import {LIB_NAME} from '../constants/general';
import {SETTINGS_CHANGED} from '../constants/settings';

export const chatSettings = (() => {
    let settings = {
        // Chat title or name of the consultant
        title: 'John Doe',
        // Position or consultant description
        subtitle: 'consultant',
        // Avatar image of the consultant - string or boolean
        avatar: false,
        // Text for "send" button in chat window
        sendText: 'Send',
        // Placeholder text on the input
        inputPlaceholder: 'Enter your message',
        // Message that operator is typing
        isTyping: `
            <div class="${LIB_NAME}-dots-loading">
                <span class="dots-loading__dot">&#8226;</span>
                <span class="dots-loading__dot">&#8226;</span>
                <span class="dots-loading__dot">&#8226;</span>
            </div>
        `,
        // Updated sanitize options
        sanitizeOptions: {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            allowedAttributes: {
                a: sanitizeHtml.defaults.allowedAttributes.a,
                img: sanitizeHtml.defaults.allowedAttributes.img.concat(['class']),
                div: ['class']
            }
        }
    };

    return {
        setSettings: (newSettings) => {
            let settingsChanged = false;
            for (const key in newSettings) {
                if (settings.hasOwnProperty(key)) {
                    settings[key] = newSettings[key];
                    settingsChanged = true;
                }
            }
            if (settingsChanged) {
                eventEmitter.emit(SETTINGS_CHANGED);
            }
        },

        getProperty: (property) => settings[property]
    };
})();
