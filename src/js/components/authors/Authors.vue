<template>
    <div class="authors">
        <ul class="cards">
            <li
                    class="cards__item"
                    v-for="(item, index) in getAuthors"
                    :key="index"
            >
                <div class="author">
                    <img class="author__image" :src="item.avatar" alt="Author avatar">
                    <div class="author__body">
                        <div class="author__name">{{item.name}}</div>
                        <div class="author__stats">
                            <div
                                    class="stat"
                                    v-for="(value, key, index) in item.metrics"
                                    :key="index" >
                                <span>{{value}}</span>
                                <label>{{key}}</label>
                            </div>
                        </div>
                        <router-link :to="`/author/${item.id}`" tag="a" class="author__report btn btn--green">Details</router-link>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { sortArrayOfObjects } from '@/services/utils'

    export default {
        name: "Authors",
        computed: {
            getAuthors() {
                return sortArrayOfObjects(this.$store.getters.getAuthorList, 'name');
            }
        }
    }
</script>

<style scoped lang="scss">
    .cards {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin: 0;
        padding: 0;

        &__item {
            display: flex;
            padding: 10px;
        }

        .author {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            padding: 25px 15px;
            border-radius: $borderRadius;
            box-shadow: $shadow;
            width: 100%;
            background: #ffffff;

            &__image {
                max-width: 50%;
                border-radius: 50%
            }

            &__body {
                padding-top: 20px;
                text-align: center;
                width: 100%;
            }

            &__name {
                font-size: 20px;
                font-weight: 400;
            }

            &__stats {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-evenly;
                align-items: flex-start;
                margin: 25px 0;

                .stat {
                    display: flex;
                    flex-flow: column nowrap;
                    color: $colorGreen;
                    margin: 0 20px;
                }

                span {
                    font-size: 24px;
                    font-weight: 300;
                }

                label {
                    font-size: 13px;
                    color: $otherTextColor;
                    margin: 10px 0 0;
                }
            }
            &__report {
                display: inline-block;
                color: #ffffff;
                font-size: 14px;
                letter-spacing: 1px;
            }
        }
    }

</style>