/**
 * Nano Templates - https://github.com/trix/nano
 * @param template {string}
 * @param data {object}
 * @returns {string}
 * @constructor
 */
export const TemplateEngine = (template, data) => {
    return template.replace(/\{([\w\.]*)}/g, function(str, key) {
        var keys = key.split('.'), v = data[keys.shift()];
        for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
        return (typeof v !== 'undefined' && v !== null) ? v : '';
    });
};
