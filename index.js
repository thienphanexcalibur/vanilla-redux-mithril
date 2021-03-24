// Init the store as side effects
require('./store.js');
import App from './views/app';
import m from 'mithril';

const root = document.querySelector('#app');

m.mount(root, App);










