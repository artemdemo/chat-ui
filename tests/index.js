import jsdom from 'jsdom';
import './services/templateEngine.spec';
import './services/templateTreeRender.spec';
import './services/utils.spec';
import './services/sanitize.spec';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;
