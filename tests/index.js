import jsdom from 'jsdom';
import './services/templateEngine.spec';
import './services/templateTreeRender.spec';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;
