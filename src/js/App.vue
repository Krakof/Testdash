<template>
    <div class="container">
        <app-sidebar></app-sidebar>
        <div class="content">
            <router-view v-if="!loading"></router-view>
            <div class="loading" v-if="loading">
                Загрузка...
            </div>
        </div>
    </div>
</template>

<script>
    import { getData } from './services/http'
    import Sidebar from './components/Sidebar.vue';

    export default {
        name: "app",
        components: {
            'app-sidebar': Sidebar
        },
        data() {
            return {
                loading: true
            }
        },
        async beforeCreate() {
            try {
                const response = await getData();
                const data = await response.json();

                this.$store.commit('setData', data);

                console.log(data)

            } catch (e) {
                console.log(e)
            }

            this.loading = false;

        }
    }
</script>

<style lang="scss">
    /*@import "~normalize-scss/sass/normalize/import-now";*/
    @import "../sass/preset";

    .container {
        display: grid;
        grid-template-columns: 120px auto;
        grid-template-rows: auto;
        grid-template-areas: 'sidebar body';
        height: 100%;
    }

    .content {
        padding: 15px;
        background: $mainBackground;
    }
</style>