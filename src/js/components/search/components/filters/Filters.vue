<template>
    <div class="filters">
        <!--<h1>Filters</h1>-->
        <!--<button @click="close()">Close</button>-->
        <div class="header">
            <h4>Select filter:</h4>
            <div class="list">
                <div
                        v-for="(item, key) in filters"
                        :key="key"
                        :class="['list__item btn', {'btn--green': currentFilter.name === item.name}]"
                        @click="currentFilter=item"
                >{{item.name}}</div>
            </div>
        </div>
        <component
                :is="currentFilter.component"
                :stateName="currentFilter.stateName"
                :initialData="currentFilter.data"
                :isTableFiltered="currentFilter.filtered"
                :statusList="currentFilter.statusList"
        ></component>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import ComponentTemplate from './components/ComponentTemplate.vue';

    const deviceTypeList = ['mobile', 'desktop', 'tablet'];
    const filterStatusList = [
            {
                value: '==',
                slug: 'Only'
            },
            {
                value: '!=',
                slug: 'Except'
            }
    ];

    export default {
        name: "filters",
        data() {
            return {
                filters: {
                    hosts: {
                        name: 'Referrer host',
                        component: ComponentTemplate,
                        stateName: 'referrer.host',
                        data: null,
                        filtered: true,
                        statusList: filterStatusList
                    },
                    devices: {
                        name: 'Device type',
                        component: ComponentTemplate,
                        stateName: 'device_type',
                        data: deviceTypeList,
                        filtered: false,
                        statusList: filterStatusList
                    }
                },
                currentFilter: '',
            }
        },
        computed: {
            ...mapGetters([
                'getHostsTotalData',
            ]),

            getHosts() {
                return this.getHostsTotalData.map(host => host.key).sort();
            },
        },
        created() {
            this.filters.hosts.data = this.getHosts;
        }
    }
</script>

<style scoped lang="scss">
    .header {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        padding: 5px 0;
        margin-bottom: 20px;

        h4 {
            padding-right: 20px;
        }

        .list {
            display: flex;
            flex-flow: row wrap;
            padding-left: 10px;

            &__item {
                margin: 5px;
                padding: 10px 25px;
                border: 1px solid $borderColor;
                cursor: pointer;
            }
        }
    }
</style>