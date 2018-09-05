<template>
    <table>
        <thead>
        <tr>
            <th>{{config.name}}</th>
            <th v-if="config.actionName === 'Remove'" class="action action--red" @click="action">Remove all</th>
            <th v-else>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="config.filtered">
            <td class="filter">
                <input type="text" v-model="search">
            </td>
            <td></td>
        </tr>
        <tr
                v-for="(item, index) in filteredData"
                :key="index"
        >
            <td>{{item}}</td>
            <td  :class="['action', {'action--red': config.actionName === 'Remove'}]" @click="action(item, index)">{{config.actionName}}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: "TableList",
        props: ['config', 'action'],
        data() {
            return {
                search: ''
            }
        },
        computed: {
            filterByInput() {
                if (this.search === '') return this.config.data;
                return this.config.data.filter(item => {
                    return item.toLowerCase().includes(this.search.toLowerCase());
                });
            },

            filteredData() {

                if (!this.config.selected) return this.filterByInput;

                return  this.filterByInput.filter(item => {
                    return !this.config.selected.includes(item);
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    table {
        width: 100%;
        background: #ffffff;
        border-collapse: collapse;

        th {
            text-align: left;
            font-weight: 400;
            border: 1px solid $borderColor;
            padding: 15px 20px;
            font-size: 18px;

            &:last-child {
                text-align: center;
            }
        }

        td {
            border: 1px solid $borderColor;
            padding: 10px 20px;
            color: lighten($textColor, 20);
            font-size: 15px;

            &.filter {

                input {
                    width: 300px;
                }
            }

            &:last-child {
                width: 135px;
                text-align: center;
            }
        }

        .action {
            cursor: pointer;
            color: $colorGreen;

            &--red {
                color: $colorRed;
            }
        }


    }

</style>