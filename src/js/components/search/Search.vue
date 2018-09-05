<template>
    <div class="search">
        <div class="settings">
            <h1>Search settings</h1>
            <div
                    v-for="tab in tabs"
                    :key="tab.name"
                    :class="['settings__item',
                            { error: tab.error, active: currentTab.name === tab.name}]"
                    @click="changeTab(tab)"
            >
                {{ tab.title || tab.name }}
            </div>
            <button class="btn btn--green" :disabled="isSearchDisabled" @click="searchRequest">Search</button>
        </div>
        <div class="settings__details">
            <component :is="currentTab.component" :sendErrorStatus="setErrorStatus"></component>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Filters from './components/filters/Filters.vue';
    import Fields from './components/fields/MainFieldComponent.vue';
    import Limits from './components/limits/MainComponent.vue'

    export default {
        name: "search",
        data() {
            return {
                tabs: [
                    {
                        name: 'Filters',
                        component: Filters,
                        error: false,
                    },
                    {
                        name: 'Fields',
                        component: Fields,
                        title: 'Fields, Metrics, Breakdowns, Enclosures',

                        error: false,
                    },
                    {
                        name: 'Limits',
                        component: Limits,
                        title: 'Time and Limits',
                        error: false,
                    },
                ],
                currentTab: {},
                urlConfig: {
                    filters: this.prepareFilters,
                    fields: this.prepareClickSelectItem,
                    enclosures: this.prepareClickSelectItem,
                    metrics: this.prepareClickSelectItem,
                    limit: this.prepareLimit,
                    from: this.prepareTimeItem,
                    interval: this.prepareTimeItem,
                    breakdowns: this.prepareClickSelectItem
                }
            }
        },
        computed: {
            ...mapState([
                'searchSettings'
            ]),

            ...mapState({
                searchFilters: state => state.searchSettings.filters,
                searchLimit: state => state.searchSettings.limit,
            }),

            isSearchDisabled() {
                const searchAccess = this.tabs.filter(item => item.error);

                return !!searchAccess.length;
            }
        },
        methods: {
            changeTab(tab) {
                this.currentTab = tab;
            },

            setErrorStatus(err) {
                this.currentTab.error = err;
            },

            prepareFilters() {

                const filters = Object.keys(this.searchFilters.data)
                    .map(key => {

                        const {status, values} = this.searchFilters.data[key];


                        return values.length ? key + status + values.join(',') : '';
                    })
                    .filter(item => item);

                return filters.join(';');
            },

            prepareClickSelectItem(itemType) {

                return this.searchSettings[itemType].values.join(',');
            },

            prepareTimeItem(itemType) {
                const {value, name} = this.searchSettings[itemType].period;

                return value + name;
            },

            prepareLimit() {

                return this.searchLimit.value;
            },

            searchRequest() {
                const searchItems = Object.keys(this.searchSettings)
                    .map(key => {
                        return this.searchSettings[key].param + this.urlConfig[key](key);
                })
                    .join('&');

                console.log(searchItems);
            }
        },
    }
</script>

<style scoped lang="scss">
    .search {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 0 30px;

        .settings {
            min-width: 400px;

            .btn {
                margin-top: 50px;
                border: 1px solid $borderColor;
                letter-spacing: 1px;
                padding: 12px 40px;
                border-radius: $borderRadius;
            }

            &__item {
                padding: 20px;
                font-size: 18px;
                cursor: pointer;
                background: #fff;
                margin-bottom: 20px;
                border-radius: 40px;
                box-shadow: $shadow;

                &.active {
                    background: $colorGreen;
                    color: #ffffff;
                }


                &.error {
                    background: $colorRed;
                    color: #ffffff;
                }
            }

            &__details {
                /*width: 900px;*/
                padding: 95px 0 0 60px;

            }
        }

    }

</style>