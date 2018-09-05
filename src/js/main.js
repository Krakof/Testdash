'use strict';

import Vue from 'vue';
import router from './router';
import { store } from './store/store'
import App from './App.vue';

export const eventBus = new Vue();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});