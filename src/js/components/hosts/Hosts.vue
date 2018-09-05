<template>
    <div class="charts">
        <div v-if="graphFilters.host">
            <line-chart :data="filterDataByHost" :authors="getHostAuthors" :resetFilters="resetGraphFilters"/>
        </div>
        <div v-else>
            <div class="header">
                <h1>Hosts chart rating</h1>
            </div>
            <p class="notice"><span>Note:</span>Please click on host to view detailed report.</p>
            <bar-chart class="bar-chart" :hostsData="getHostsTotalData" :setHost="setHost"/>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapState } from 'vuex';
    import { mapMutations } from 'vuex';
    import LineChart from './components/line-chart/ChartWrap.vue';
    import BarChart from './components/BarChart.vue';
    import { filterDataByHostHelper } from '@/services/utils'

    export default {
        name: "hosts",
        components: {
            BarChart,
            LineChart
        },
        data() {
            return {
                hostData: {}
            }
        },

        computed: {
            ...mapGetters([
                'getHostsTotalData',
                'getHostsDetailedData',
                'getAuthorList'
            ]),

            ...mapState([
                'graphFilters'
            ]),

            filterDataByHost() {
                    return filterDataByHostHelper(this.getHostsDetailedData, this.graphFilters.host);
            },

            getHostAuthors() {
                let authors = [];

                this.filterDataByHost.details.forEach(author => {
                    const [matched] = this.getAuthorList.filter(item => item.id === author.key);

                    authors.push(matched);
                });

                return authors;
            }
        },

        methods: {
            ...mapMutations([
                'setGraphFilterHost',
                'resetGraphFilters'
            ]),

            setHost(hostName) {
                this.resetGraphFilters();
                this.setGraphFilterHost(hostName);
            }
        }
    }
</script>

<style scoped lang="scss">
    .charts {
        padding: 20px;

        .bar-chart {
            width: 80%;
            height: 1000px
        }

    }
</style>