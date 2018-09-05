<template>
    <div class="component">
        <div class="title">
            <h4>{{stateName}}:</h4>
            <span>{{desc}}</span>
        </div>
        <ul class="component__list">
            <li
                    v-for="item in initialData"
                    :key="item.name"
                    :class="['component__item btn',{'btn--green': isItemAdded(item.name)}]"
                    @click="toggleItem(item.name)"
            >{{item.title}}</li>
        </ul>
    </div>

</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapMutations } from 'vuex';

    export default {
        name: "fields",
        props: {
            desc: {
                type: String
            },

            initialData: {
                type: Array
            },
            stateName: {
                type: String
            }
        },
        computed: {
            ...mapGetters([
                'getSearchItem'
            ]),

            getItemData() {
                return this.getSearchItem(this.stateName);
            }
        },
        methods: {
            ...mapMutations([
                'setSearchItem'
            ]),

            isItemAdded(item) {
                return this.getItemData.values.includes(item);
            },

            toggleItem(item) {
                this.setSearchItem({
                    name: this.stateName,
                    item,
                    index: this.getItemData.values.indexOf(item),
                    isAdded: this.isItemAdded(item)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .component {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 40px;

        .title {
            flex: 1;
            max-width: 200px;

            h4 {
                text-transform: capitalize;
                margin-bottom: 4px;
            }

            span {
                color: $otherTextColor;
                font-size: 13px;
            }
        }

        &__list{
            flex: 2;
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            align-items: flex-start;
            list-style: none;
            margin: 0;
        }

        &__item {
            padding: 10px 25px;
            margin: 0 5px 10px;
            border: 1px solid $borderColor;
        }
    }
</style>