import assert from 'assert';
import {sanitize} from '../../source/services/sanitize';

describe('sanitize html', () => {
    it('plain text, without html', () => {
        const inputText = 'Some long text &lt;div&gt;inner text&lt;/div&gt;';
        assert.equal(sanitize(inputText) === inputText, true);
    });

    it('text with image', () => {
        const inputText = `Some long text
                           <img src="./smile.png" class="something">
                           <div class="another">Inner text</div>`;
        assert.equal(sanitize(inputText) === inputText, true);
    });

    it('text with "script" tags', () => {
        const inputText = [
            'Some long text',
            '<img src="./smile.png" class="something">',
            '<script>alert("Danger!");</script>',
            '<div class="another">Inner text</div>'
        ].join('');
        const sanitizedText = [
            'Some long text',
            '<img src="./smile.png" class="something">',
            '<div class="another">Inner text</div>'
        ].join('');
        assert.equal(sanitize(inputText) === sanitizedText, true);
    });

    it('text with "iframe" tags', () => {
        const inputText = [
            'Some long text',
            '<img src="./smile.png" class="something">',
            '<iframe src="some html">',
            '<div class="another">Inner text</div>'
        ].join('');
        const sanitizedText = [
            'Some long text',
            '<img src="./smile.png" class="something">',
            '<div class="another">Inner text</div>'
        ].join('');
        assert.equal(sanitize(inputText) === sanitizedText, true);
    });
});
