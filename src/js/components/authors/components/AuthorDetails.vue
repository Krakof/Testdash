<template>
    <div class="details">
        <div class="info">
            <div class="author">
                <img  class="author__avatar" :src="getAuthor.avatar">
                <span class="author__name">{{getAuthor.name}}</span>
            </div>
            <router-link to="/" tag="a" class="nav-back btn btn--green btn--back">Back</router-link>
        </div>
        <div
                class="summary"
                v-for="day in getAuthorHistory"
                :key="day.key"
                v-if="day.details.length"
        >
            <div class="date">
                <span class="date__day">{{new Date(day.key).getUTCDate()}}</span>
                <span class="date__month">{{getMonthName(day.key)}} {{new Date(day.key).getFullYear()}}</span>
                <span class="date__weekday">{{getDayName(day.key)}}</span>
            </div>
            <div class="list">
                <div
                        class="list__item"
                        v-for="article in day.details"
                        :key="article.key"
                >
                    <div class="article">
                        <div class="article__title">{{parseArticleTitle(article.fields.title)}}</div>
                        <div class="article__stats">
                            <div class="stat" v-for="(value, key) in article.metrics">
                                <span>{{value}}</span>
                                <label>{{key}}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {htmlEntitiesDecode, dayName, monthName} from '@/services/utils';

    export default {
        name: "author-details",
        data() {
            return {
                authorId: parseInt(this.$route.params.id)
            }
        },
        computed: {
            getAuthorHistory() {
                const authotId = parseInt(this.authorId);

                return this.$store.getters.getAuthorArticles(authotId);
            },

            getAuthor() {
                return this.$store.getters.getAuthor(this.authorId)
            },
        },

        methods: {
            parseArticleTitle(title) {
                return htmlEntitiesDecode(title)
            },

            getDayName(date) {
                return dayName(date);
            },

            getMonthName(date) {
                return monthName(date);
            }
        }
    }
</script>

<style scoped lang="scss">
    .details {
        padding: 0 10px;
    }
    .info {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        margin-bottom: 20px;

        .author {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            &__avatar {
                border-radius: 50%;
                width: 70px
            }

            &__name {
                margin-left: 20px;
                font-size: 18px;
                font-weight: 600;
            }
        }

        .nav-back {
            color: #ffffff;
        }
    }
    .summary {
        display: flex;
        flex-flow: row nowrap;
        padding: 0 30px 0 0;
        border-radius: $borderRadius;
        margin-bottom: 30px;
        box-shadow: $shadow;
        background: #fff;
    }

    .date {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        min-width: 125px;
        padding: 0 30px;
        text-align: center;
        border-right: 1px solid $borderColor;

        &__day {
            font-size: 50px;
            font-weight: 200;
        }

        &__month {
            font-size: 15px;
            font-weight: 400;
            word-break: break-all;
        }

        &__weekday {
            font-style: italic;
            line-height: 1.8;
            font-size: 13px;
        }
    }

    .list {
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-start;
        width: 100%;

        &__item {
            width: 100%;
            padding: 20px 0 20px 30px;
            border-bottom: 1px solid $borderColor;

            &:last-child {
                border: none;
            }
        }
    }

    .article {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        &__title {
            flex: 3;
            padding-right: 20px;
            line-height: 1.4;
        }

        &__stats {
            flex: 1;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-around;

            .stat {
                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                color: $colorGreen;
            }

            span {
                font-size: 24px;
                font-weight: 300;
            }

            label {
                font-size: 13px;
                color: $otherTextColor;
                margin: 5px 0;
            }
        }
    }
</style>