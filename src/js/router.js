'use strict';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: () => import( './components/authors/Authors.vue'),
        },
        {
            path: '/author/:id',
            component: () => import( './components/authors/components/AuthorDetails.vue'),
        },
        {
            path: '/hosts',
            component: () => import('./components/hosts/Hosts.vue')
        },
        {
            path: '/search',
            component: () => import('./components/search/Search.vue')
        }
    ]
})