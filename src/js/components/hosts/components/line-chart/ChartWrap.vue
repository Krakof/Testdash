<template>
    <div class="host">
        <h2>{{graphFilters.host}}</h2>
        <div class="filters">
            <div>
                <span>Select author:</span>
                <select
                        name="author"
                        v-model="graphFilters.author"
                        @change="changeFilterAuthor"
                >
                    <option :disabled="authors.length === 1" value="">All</option>
                    <option
                            v-for="person in authors"
                            :key="person.id"
                            :value="person.id"
                    >{{person.name}}</option>
                </select>
            </div>
            <div>
                <span>Select article:</span>
                <select
                        v-if="getArticles.length"
                        name="article"
                        v-model="graphFilters.article"
                        @change="changeFilterArticle"
                >
                    <option :disabled="getArticles.length === 1" value="">All</option>
                    <option
                            v-for="post in getArticles"
                            :value="post.key"
                    >{{post.title}}</option>
                </select>
            </div>
            <button class="btn btn--green btn--back" @click="resetFilters">Reset filters</button>
        </div>
        <line-chart class="chart" :chartData="graphData"></line-chart>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
    import LineChart from './LineChart.vue';
    import { formatDate, formChartConfig, convertFilteredData, isObjectInArray, sortArrayOfObjects }
    from '@/services/utils';

    export default {
        name: "chart-wrap",
        components: {
            LineChart
        },
        props: ['data', 'authors', 'resetFilters'],
        data() {
            return {
                graphData: {},
                chartLegend: 'Value',
                style: {
                    backgroundColor: '#12b47d57',
                    pointBackgroundColor: '#12b47d',
                    borderColor: '#12b47d',
                },
            }
        },
        computed: {
            ...mapState([
                'graphFilters'
            ]),

            getArticles() {
                let articles = [];

                this.data.details
                    .filter(this.isAuthorSelected)
                    .map(author => {

                        author.data.forEach(day => {

                            day.data.forEach(article => {

                                articles = this.storeAllArticlesData(articles, article, author.key)
                            })
                        })
                    });

                return sortArrayOfObjects(articles, 'title');
            }
        },
        methods: {
            ...mapMutations([
                'setGraphFilterAuthor',
                'setGraphFilterArticle'
            ]),

            changeFilterAuthor(e) {
                const authorId = e.target.value ? parseInt(e.target.value) : '';

                this.setGraphFilterAuthor(authorId);

                if (this.getArticles.length === 1) {
                    const [article] = this.getArticles;
                    this.setGraphFilterArticle(article.key);
                }

                this.selectFilter();
            },

            changeFilterArticle(e) {
                const articleId = e.target.value ? parseInt(e.target.value) : '';

                if (!this.graphFilters.author) {

                    const authorId = this.getArticleAuthor(articleId);

                    this.setGraphFilterAuthor(authorId);
                }

                this.setGraphFilterArticle(articleId);

                this.selectFilter();
            },

            selectFilter() {
                switch(true) {
                    case (!!this.graphFilters.article):
                        return this.filterByArticle();
                    case (!!this.graphFilters.author):
                        return this.filterByAuthor();
                    default:
                        return this.defaultFilter();
                }
            },

            defaultFilter() {
                let summary = {}, data, labels;

                this.data.details.map(author => {
                    return author.data.map(day => {

                        const formattedDate = formatDate(day.key);

                        summary[formattedDate] = (summary[formattedDate] || 0) + day.value;
                    });
                });

                [labels, data] = convertFilteredData(summary);

                this.graphData = formChartConfig(labels, data, this.chartLegend, this.style)
            },

            filterByAuthor() {
                let summary = {}, data, labels;

                const [author] = this.data.details.filter(this.isAuthorSelected);

                if (author) {

                    author.data.map(day => {
                        const formattedDate = formatDate(day.key);
                        summary[formattedDate] = day.value
                    });

                    // console.log(summary);

                    [labels, data] = convertFilteredData(summary);

                    this.graphData = formChartConfig(labels, data, this.chartLegend, this.style);

                } else {

                    this.graphData = null;
                }
            },

            filterByArticle() {
                let summary = {}, data, labels;

                this.data.details
                    .filter(this.isAuthorSelected)
                    .map(author => {

                        author.data.forEach(day => {

                            day.data.forEach(article => {
                                summary = this.storeSingleArticleData(summary, article, day.key)
                            })
                        })
                    });

                // console.log(summary);

                [labels, data] = convertFilteredData(summary);

                this.graphData = formChartConfig(labels, data, this.chartLegend, this.style);

            },

            storeAllArticlesData(stored, article, authorId) {
                if (!isObjectInArray(stored, article, 'key')) {

                    stored.push({
                        authorId: authorId,
                        key: article.key,
                        title: article.title
                    })
                }

                return stored;
            },

            storeSingleArticleData(stored, article, date) {
                if (article.key === this.graphFilters.article) {

                    const formattedDate = formatDate(date);

                    stored[formattedDate] = article.value
                }

                return stored;
            },

            isAuthorSelected(author) {
                return !this.graphFilters.author || author.key === this.graphFilters.author
            },

            getArticleAuthor(articleId) {

                const [selectedArticle] = this.getArticles
                    .filter(article => article.key === articleId);

                return selectedArticle.authorId;
            }
        },
        beforeMount() {
            this.selectFilter();
        }
    }
</script>

<style scoped lang="scss">
    .host {
        /*padding: 0 30px;*/
    }

    .filters {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: flex-start;
        width: 70%;

        div {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            width: 100%;

            span {
                margin-right: 20px;
            }

            select {
                margin: 10px 0;
                white-space: nowrap;
                text-overflow: ellipsis;

                &[name='author'] {
                    width: 150px;
                }

                &[name='article'] {
                    width: 60%;
                    max-width: 600px;
                }
            }
        }

        .btn {
            color: #ffffff;
            margin: 20px 0;
        }
    }

    .chart {
        width: 60%;
        height: 600px
    }

</style>