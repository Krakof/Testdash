'use strict';

import Vue from 'vue';
import Vuex from 'vuex';
import { getAuthorMetrics } from '@/services/utils';
import { getData } from '@/services/http';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        graphFilters: {
            host: '',
            author: '',
            article: ''
        },
        data: {},
        searchSettings: {
            filters: {
                param: 'f=',
                data: {
                    'referrer.host': {
                        status: '==',
                        values: []
                    },
                    'device_type': {
                        status: '==',
                        values: []
                    }
                }
            },
            fields: {
                param: 'fields=',
                values: []
            },
            metrics: {
                param: 'metrics=',
                values: []
            },
            from: {
                param: 'from=-',
                period: {
                    value: '1',
                    name: 'd'
                }
            },
            interval: {
                param: 'interval=',
                period: {
                    value: '1',
                    name: 'd'
                }
            },
            limit: {
                param: 'limit=',
                value: '1'
            },
            breakdowns: {
                param: 'b=',
                values: []
            },
            enclosures: {
                param: 'enclosures=',
                values: []
            }

        }
    },
    getters: {

        getAuthorList(state) {
            console.log(state.data.enclosures);
            return Object.keys(state.data.enclosures).map(key => {

                const item = state.data.enclosures[key];

                return {
                    ...item,
                    metrics: getAuthorMetrics(state.data.details, item.id)
                };
            });
        },

        getAuthorArticles(state) {
            return authorId => {
                const [data] = state.data.details.filter(item => {
                    return item.key === authorId;
                });

                return data.details
            }
        },

        getAuthor(state) {
            return authorId => {
                for (let [key, value] of Object.entries(state.data.enclosures)) {

                    if (value.id === authorId) return value;
                }
            }
        },

        getHostsTotalData(state) {
            return state.data.fields['referrer.host'];
        },

        getHostsDetailedData(state) {
            return state.data.details
        },

        getSearchItem(state) {
            return name => {
                return state.searchSettings[name];
            }
        },
    },
    mutations: {
        setData(state, data) {
            state.data = data
        },

        setGraphFilterHost(state, host) {
            state.graphFilters.host = host;
        },

        setGraphFilterAuthor(state, id) {
            state.graphFilters.author = id;
            state.graphFilters.article = '';
        },

        setGraphFilterArticle(state, id) {
            state.graphFilters.article = id;
        },

        resetGraphFilters(state) {
            Object.keys(state.graphFilters).forEach(key => {
                state.graphFilters[key] = '';
            })
        },

        setSearchFilterData(state, payload) {
            state.searchSettings.filters.data[payload.filterName].values = payload.data
        },

        setSearchFilterStatus(state, payload) {
            state.searchSettings.filters.data[payload.filterName].status = payload.data
        },

        setSearchItem(state, payload) {
            if (payload.isAdded) {

                state.searchSettings[payload.name].values.splice(payload.index, 1);

            } else {
                state.searchSettings[payload.name].values.push(payload.item);

            }
        },

        setSearchTimePeriodName(state, payload) {
            state.searchSettings[payload.type].period.name = payload.value
        },

        setSearchTimePeriodValue(state, payload) {
            state.searchSettings[payload.type].period.value = payload.value
        },

        setSearchLimit(state, limit) {
            state.searchSettings.limit.value = limit;
        }
    },
    actions: {
        async fetchData({ commit }) {
            try {
                const response = await getData();
                const data = await response.json();

                commit('setData', data);

                console.log(data);

            } catch (e) {
                console.log(e)
            }

        }
    }
});