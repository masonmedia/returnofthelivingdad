<script setup>
// import Nav from '../components/TheNav.vue'
import Footer from '../components/TheFooter.vue'
</script>

<template>
    <div class="overflow-hidden">
        <!-- <Nav></Nav> -->
            <slot></slot>
        <Footer></Footer>
    </div>
</template>