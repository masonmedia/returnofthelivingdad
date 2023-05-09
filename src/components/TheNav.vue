<template>
    <div class="w-100">
        <div class="container-fluid px-0 pt-0 text-secondary w-100 d-lg-none d-flex position-relative z-1">
            <router-link class="font-antonio fw-bold p-3 fs-2" to="/">ROTLD</router-link>
            <!-- menu -->
            <button class="btn ms-auto my-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-justify-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </button>
        </div>
        <!-- nav -->
        <nav class="navbar p-3 fixed-top d-none d-lg-block bg-white w-100 border-bottom">
            <div class="container-fluid">
                <router-link class="fs-2" to="/">🅼</router-link>
                <ul class="nav justify-content-end fs-5">
                    <router-link class="nav-link" v-for="(route, index) in router.options.routes" :key="index"
                    :to="route.path">
                        {{ route.name }}
                    </router-link>
                    <a class="nav-link" href="mailto:bassfx@duck.com">Contact</a>
                </ul>
            </div>   
        </nav>

        <div class="offcanvas offcanvas-end border-bottom w-100 font-antonio" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title fs-3">🅼</h5>
                <button class="btn pt-0 pe-0" role="button" data-bs-dismiss="offcanvas" aria-label="Close">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </button>
            </div>
            <div class="offcanvas-body d-flex flex-column align-items-start justify-content-end py-5">
                <ul class="nav">
                    <li class="lh-1 ls-1 fw-900"
                    data-bs-dismiss="offcanvas">
                        <router-link class="nav-link pb-1" v-for="(route, index) in router.options.routes.slice(0,5)" :key="index"
                        :to="route.path">
                            {{ route.name }}
                        </router-link>
                        <a class="nav-link" href="mailto:bassfx@duck.com">Contact</a>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script setup>

import { useRoute, useRouter } from "vue-router";
const location = useRoute();
const router = useRouter();

</script>

<style scoped>

a {
    color: inherit;
    text-decoration: none;
}

a:hover {
    color: rgb(221, 184, 146);
}

.nav-link, 
.navbar-brand, 
.nav-item,
.nav-link:focus {
    font-weight: bold;
}

.offcanvas-body .nav-link {
    font-size: 8vmin;
    font-weight: 900;
    /* line-height: 8vmin; */
}

.btn-close, .offcanvas-header .btn-close {
    color: #7F5539 !important;
}

nav a.router-link-exact-active {
  color: grey;
}

nav a.router-link-exact-active:hover {
  color: lightgrey;
}

</style>