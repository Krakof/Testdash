<template>
    <div class="sidebar">
        <ul class="nav">
            <li class="nav__item"><router-link to="/" tag="a" exact>Authors</router-link></li>
            <li class="nav__item"><router-link to="/hosts" tag="a">Hosts</router-link></li>
            <li class="nav__item"><router-link to="/search" tag="a">Search</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "sidebar"
    }
</script>

<style scoped lang="scss">
    .sidebar {
        grid-area: sidebar;
        background: $sidebarBackground;

        .router-link-exact-active{
            background: #fff;
            color: $textColor;
            border-bottom-color: $borderColor;
        }
    }

    .nav {
        list-style: none;
        padding: 0;
        margin: 60px 0 0;
        text-align: center;
        border-top: 1px solid $borderColor;

        &__item {
            border-bottom: 1px solid $borderColor;
            a {
                display: block;
                padding: 15px;
                color: #ffffff;
            }
        }
    }

</style>