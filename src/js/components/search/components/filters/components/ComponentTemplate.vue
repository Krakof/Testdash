<template>
    <div class="filter">
        <div class="filter__status">
            <RadioButton
                    :changeStatus="setFilterStateStatus"
                    :propStatus="searchFilter.status"
                    :statusList="statusList"
            ></RadioButton>
        </div>
        <p class="notice"><span>Note:</span>To get data for all filter items please left 'Selected' table empty.</p>
        <div v-if="initialData.length !== searchFilter.values.length" class="filter__table">
            <TableList
                    :config="{
                        data: initialData,
                         name: 'Available',
                          actionName: 'Add',
                           selected: searchFilter.values,
                           filtered: isTableFiltered
                    }"
                    :action="add"
            ></TableList>
        </div>
        <div v-if="searchFilter.values.length" class="filter__table">
            <TableList
                    :config="{
                        data: searchFilter.values,
                         name: 'Selected',
                          actionName: 'Remove'
                    }"
                    :action="remove"
            ></TableList>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { mapMutations } from 'vuex';
    import TableList from './BaseTable.vue'
    import RadioButton from './BaseRadioButton.vue'

    export default {
        name: "component-template",
        components: {
            TableList,
            RadioButton
        },
        props: {
            stateName : {
                type: String
            },
            initialData: {
                type: Array
            },
            statusList: {
                type: Array
            },
            isTableFiltered: {
                type: Boolean
            },
        },
        computed: {
            ...mapState({
                filters: state => state.searchSettings.filters
            }),

            searchFilter() {
                return this.filters.data[this.stateName]
            }
        },
        methods: {
            ...mapMutations([
                'setSearchFilterData',
                'setSearchFilterStatus'
            ]),

            add(item) {
                let values = [...this.searchFilter.values];

                values.push(item);

                this.setFilterStateData(values)
            },

            remove(item, index) {
                if (this.searchFilter.values.length) {
                    let values;

                    if (index === undefined) {

                        values = [];
                    } else {
                        values = [...this.searchFilter.values];
                        values.splice(index, 1);
                    }

                    this.setFilterStateData(values)
                }
            },

            setFilterStateStatus(data) {
                this.setSearchFilterStatus({
                    filterName: this.stateName,
                    data
                })
            },

            setFilterStateData(data) {
                this.setSearchFilterData({
                    filterName: this.stateName,
                    data
                })
            }
        },
    }
</script>

<style scoped lang="scss">
    .filter {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        padding: 20px 0;

        &__status {
            margin-bottom: 30px;
        }

        &__table {
            width: 80%;
            margin: 10px 0;
            max-height: 400px;
            overflow: auto;
        }
    }
</style>