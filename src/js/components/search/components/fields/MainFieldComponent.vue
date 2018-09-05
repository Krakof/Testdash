<template>
    <div class="fields">
        <div v-for="item in components">
            <component
                    :is="item.component"
                    :desc="item.legend"
                    :stateName="item.stateName"
                    :initialData="item.data"
            ></component>
        </div>
    </div>
</template>

<script>
    import Template from './components/ComponentTemplate.vue'

    const fieldsList = [
            {
                name: 'published',
                title: 'Published'
            },
            {
                name: 'title',
                title: 'Title'
            },
            {
                name: 'segment.slug',
                title: 'Segment slug'
            },
            {
                name: 'segment.path',
                title: 'Segment path'
            },
            {
                name: 'referrer.host',
                title: 'Referrer host'
            }
        ];

    const metricsList = [
            {
                name: 'hits',
                title: 'Hits'
            },
            {
                name: 'sessions',
                title: 'Sessions'
            },
            {
                name: 'bounce-rate',
                title: 'Bounce rate'
            }
        ];
    const breakdownList = [
            {
                name: 'author.id',
                title: 'Author ID'
            },
            {
                name: 'date',
                title: 'Date'
            },
            {
                name: 'article.id',
                title: 'Article ID'
            }
        ];
    const enclosuresList = [
        {
            name: 'author',
            title: 'Author'
        },
        {
            name: 'article',
            title: 'Article'
        }
    ];

    export default {
        name: "main-component",
        data() {
            return {
                components: [
                    {
                        legend: 'return data for',
                        stateName: 'fields',
                        data: fieldsList,
                        component: Template
                    },
                    {
                        legend: 'calculated fields',
                        stateName: 'metrics',
                        data: metricsList,
                        component: Template
                    },
                    {
                        legend: 'fields to breakdown results for',
                        stateName: 'breakdowns',
                        data: breakdownList,
                        component: Template
                    },
                    {
                        legend: 'fields that isn\'t nested in the individual rows of data',
                        stateName: 'enclosures',
                        data: enclosuresList,
                        component: Template
                    },
                ]
            }
        },
    }
</script>

<style lang="scss">
</style>