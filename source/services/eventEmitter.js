import EventEmitter from 'wolfy87-eventemitter';

let ee = null;

export const eventEmitter = (() => {
    ee = ee || new EventEmitter();
    return ee;
})();
