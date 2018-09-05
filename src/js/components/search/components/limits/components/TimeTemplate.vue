<template>
    <div class="time">
        <h4 class="title">{{title}}</h4>
        <div class="data">
            <input
                    type="number"
                    v-model="periodValue"
            >
            <select
                    name="period"
                    v-model="periodName"
            >
                <option
                        v-for="period in periodNameList"
                        :key="period.name"
                        :value="period.slug"
                >{{period.name}}</option>
            </select>
        </div>
        <p v-if="error" class="error">Entered value must be a number and greater than 0!</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {
        name: "interval",
        props:{
            stateName: {
                type: String
            },
            title: {
                type: String
            },
            componentIndex: {
                type: Number
            },
            setError: {
                type: Function
            }
        },
        data() {
            return {
                periodNameList: [
                    {
                        name: 'minute(s)',
                        slug: 'm'
                    },
                    {
                        name: 'hour(s)',
                        slug: 'h'
                    },
                    {
                        name: 'day(s)',
                        slug: 'd'
                    },
                    {
                        name: 'week(s)',
                        slug: 'w'
                    },
                    {
                        name: 'month(s)',
                        slug: 'mo'
                    },
                    {
                        name: 'year(s)',
                        slug: 'y'
                    },
                ],
                error: false,
            }
        },
        computed: {
            ...mapGetters([
                'getSearchItem'
            ]),

            getInterval() {

                const {value, name} = this.getSearchItem(this.stateName).period;
                return {value, name};
            },

            periodValue: {
                set(input) {
                    const  value  = parseInt(input);

                    this.error = !this.isValid(value);

                    this.setError(this.componentIndex, this.error);

                    this.setSearchTimePeriodValue({
                        type: this.stateName,
                        value: input
                    })
                },

                get() {
                    return this.getInterval.value;
                }
            },

            periodName: {
                set(value) {
                    this.setSearchTimePeriodName({
                        type: this.stateName,
                        value
                    })
                },

                get() {
                    return this.getInterval.name;
                }
            }
        },
        methods: {
            ...mapMutations([
                'setSearchTimePeriodName',
                'setSearchTimePeriodValue'
            ]),

            isValid(value) {
                return !(isNaN(value) || value <= 0);
            }
        },
        created() {
            this.error = !this.isValid(parseInt(this.getInterval.value));

            this.setError(this.componentIndex, this.error);
        }
    }
</script>

<style scoped lang="scss">
    .time {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        padding: 20px 0 30px;

        select {
            margin-left: 10px;
            font-size: 15px;
            color: $otherTextColor;
        }

        input {
            max-width: 100px;
        }

        .title {
            flex: 1;
            min-width: 200px;
        }

        .data {
            flex: 2;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: stretch;
            padding-left: 40px;
        }

        .error {
            position: absolute;
            bottom: 0;
            margin: 0;
            font-size: 14px;
            color: $colorRed;
        }
    }

</style>