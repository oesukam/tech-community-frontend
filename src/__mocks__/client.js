import { JSDOM } from 'jsdom';

const DOM = new JSDOM();
global.document = DOM.window.document;
global.window = DOM.window;
