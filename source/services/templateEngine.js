/**
 * Absurd TemplateEngine
 * https://github.com/krasimir/absurd/blob/master/lib/processors/html/helpers/TemplateEngine.js
 * http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
 * @param html {string}
 * @param data {object}
 * @returns {string}
 * @constructor
 */
export const templateEngine = (html, data) => {
    const re = /<%(.+?)%>/g;
    const reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g;
    let code = 'with(obj) { var r=[];\n';
    let cursor = 0;
    let result;
    let match;
    const add = (line, js) => {
        if (js) {
            code += line.match(reExp) ? `${line}\n` : `r.push(${line});\n`;
        } else {
            code += line !== '' ? `r.push("${line.replace(/"/g, '\\"')}");\n` : '';
        }
        return add;
    };
    while (match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code = (`${code}return r.join(""); }`).replace(/[\r\t\n]/g, ' ');
    try {
        result = new Function('obj', code).apply(data, [data]);
    } catch(err) {
        console.error(`'${err.message}'`, ' in \n\nCode:\n', code, '\n');
    }
    return result;
};
