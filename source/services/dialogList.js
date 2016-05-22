import {IS_TYPING} from '../constants/dialog';

export const dialogList = (() => {
    let dialog = [];

    return {
        addPhrase: (newPhrase) => {
            dialog.push({
                side: newPhrase.side,           // 'chat', 'user'
                message: newPhrase.message,     // text of the message
                ref: newPhrase.ref || null,     // bubble element reference
                type: newPhrase.type            // 'temporary'
            });
        },

        getTemporaryPhrase: () => {
            for (let i = 0, len = dialog.length; i < len; i++) {
                if (dialog[i].type === IS_TYPING) {
                    return dialog[i];
                }
            }
            return null;
        }
    };
})();
