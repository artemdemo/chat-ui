import {htmlSanitize} from '../vendor/html-sanitizer';

export const sanitize = (userInput) => {
    return htmlSanitize(userInput);
};
