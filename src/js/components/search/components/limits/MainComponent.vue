<template>
    <div>
        <div class="component" v-for="(item, index) in components">
            <component
                    :is="item.component"
                    :title="item.title"
                    :stateName="item.stateName"
                    :componentIndex="index"
                    :setError="setErrorStatus"
            ></component>
        </div>
    </div>
</template>

<script>
    import TimeTemplate from './components/TimeTemplate.vue';
    import Limit from './components/Limit.vue';

    export default {
        name: "limits",
        props: {
            sendErrorStatus: {
                type: Function
            },
        },
        data() {
            return {
                components: [
                    {
                        title: 'Set report range:',
                        stateName: 'from',
                        error: false,
                        component: TimeTemplate
                    },
                    {
                        title: 'Set time interval:',
                        stateName: 'interval',
                        error: false,
                        component: TimeTemplate
                    },
                    {
                        title: 'number of unique results to return at each level:',
                        stateName: 'limit',
                        error: false,
                        component: Limit
                    }
                ]
            }
        },
        methods: {
            setErrorStatus(componentIndex, err) {

                this.components[componentIndex].error = err;

                const globalErrorStatus = this.components.filter(item => {
                    return item.error
                });

                this.sendErrorStatus(!!globalErrorStatus.length);
            }
        }
    }
</script>

<style scoped lang="scss">

</style>