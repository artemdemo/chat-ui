import assert from 'assert';
import {extend} from '../../source/services/utils';

describe('utils', () => {
    it('extending empty object', () => {
        const firstObject = {};
        const secondObject = {
            a: 1,
            b: 2
        };
        const extendedObject = extend(firstObject, secondObject);
        const keys = Object.keys(extendedObject);
        assert.equal(extendedObject.a === 1, true);
        assert.equal(extendedObject.b === 2, true);
        assert.equal(keys.length === 2, true);
    });
    
    it('combine two objects', () => {
        const firstObject = {
            a: 1
        };
        const secondObject = {
            b: 2
        };
        const extendedObject = extend(firstObject, secondObject);
        const keys = Object.keys(extendedObject);
        assert.equal(extendedObject.a === 1, true);
        assert.equal(extendedObject.b === 2, true);
        assert.equal(keys.length === 2, true);
    });
    
    it('extend object properties', () => {
        const firstObject = {
            a: 1,
            c: 0
        };
        const secondObject = {
            a: 5,
            b: 2
        };
        const extendedObject = extend(firstObject, secondObject);
        const keys = Object.keys(extendedObject);
        assert.equal(extendedObject.a === 5, true);
        assert.equal(extendedObject.b === 2, true);
        assert.equal(extendedObject.c === 0, true);
        assert.equal(keys.length === 3, true);
    });
});
