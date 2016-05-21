import assert from 'assert';
import {templateEngine} from '../../source/services/templateEngine';

describe('templateEngine', () => {
    describe('render variables', () => {
        it('render strings', () => {
            const template = `
                <div class="block__title"><% title %></div>
                <div class="block__subtitle"><% subtitle %></div>
            `;
            const data = {
                title: 'This is title',
                subtitle: 'This is subtitle'
            };
            const renderedTemplate = templateEngine(template, data);

            assert.equal(renderedTemplate.indexOf('<% title %>') === -1, true);
            assert.equal(renderedTemplate.indexOf('<% subtitle %>') === -1, true);
            assert.equal(renderedTemplate.indexOf(data.title) > -1, true);
            assert.equal(renderedTemplate.indexOf(data.subtitle) > -1, true);
        });
    });

    describe('render statements', () => {
        it('render with "if" statement', () => {
            const template = `
                <% if (title) { %>
                    <div class="block__title"><% title %></div>
                <% } %>
                <% if (subtitle) { %>
                    <div class="block__subtitle"><% subtitle %></div>
                <% } %>
            `;
            const data = {
                title: 'This is title',
                subtitle: false
            };
            const renderedTemplate = templateEngine(template, data);

            assert.equal(renderedTemplate.indexOf('<% title %>') === -1, true);
            assert.equal(renderedTemplate.indexOf('<% subtitle %>') === -1, true);
            assert.equal(renderedTemplate.indexOf(data.title) > -1, true);
            assert.equal(renderedTemplate.indexOf('block__subtitle') === -1, true);
        });
    });
});
