export const extend = function(obj, ...rest) {
    let out = obj || {};

    for (let i = 0; i < rest.length; i++) {
        if (!rest[i]) {
            continue;
        }
        for (const key in rest[i]) {
            if (rest[i].hasOwnProperty(key)) {
                out[key] = rest[i][key];
            }
        }
    }

    return out;
};
