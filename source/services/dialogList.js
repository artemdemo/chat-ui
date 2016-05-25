import {IS_TYPING} from '../constants/dialog';

export const dialogList = (() => {
    let dialog = [];

    return {
        addPhrase: (newPhrase) => {
            let temporaryPhrase;
            let temporaryPhraseIndex;
            for (let i = 0, len = dialog.length; i < len; i++) {
                if (dialog[i].type === IS_TYPING) {
                    temporaryPhrase = dialog[i];
                    temporaryPhraseIndex = i;
                }
            }
            if (temporaryPhrase && newPhrase.side !== temporaryPhrase.side) {
                // insert before
                dialog.splice(temporaryPhraseIndex, 0, newPhrase);
            } else {
                if (temporaryPhrase) {
                    dialog.splice(temporaryPhraseIndex, 1);
                }
                dialog.push({
                    side: newPhrase.side,           // 'chat', 'user'
                    message: newPhrase.message,     // text of the message
                    ref: newPhrase.ref || null,     // bubble element reference
                    type: newPhrase.type            // 'is-typing'
                });
            }
        },

        getTemporaryPhrase: () => {
            for (let i = 0, len = dialog.length; i < len; i++) {
                if (dialog[i].type === IS_TYPING) {
                    return dialog[i];
                }
            }
            return null;
        },

        clearDialog: () => {
            dialog = [];
        }
    };
})();
