<template>
    <div class="limit">
        <div class="title">
            <h4>Set {{stateName}}</h4>
            <span>{{title}}</span>
        </div>
        <div class="data">
            <input
                    type="number"
                    v-model="limitValue"
            >
        </div>
        <p v-if="error" class="error">Entered value must be a number and greater than 0!</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {
        name: "limit",
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
                error: false
            }
        },
        computed: {
            ...mapGetters([
                'getSearchItem'
            ]),

            getLimit() {
                return this.getSearchItem(this.stateName).value;
            },

            limitValue: {
                set(input) {
                    const  value  = parseInt(input);

                    this.error = !this.isValid(value);

                    this.setError(this.componentIndex, this.error);

                    this.setSearchLimit(input)
                },

                get() {
                    return this.getLimit
                }
            },
        },
        methods: {
            ...mapMutations([
                'setSearchLimit'
            ]),

            isValid(value) {
                return !(isNaN(value) || value <= 0);
            }
        },
        created() {
            this.error = !this.isValid(parseInt(this.getLimit));

            this.setError(this.componentIndex, this.error);
        }
    }
</script>

<style scoped lang="scss">
    .limit {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;
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

            span {
                font-size: 14px;
                color: $otherTextColor;
            }
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