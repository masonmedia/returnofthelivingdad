<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/TheNav.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Nav></Nav>
    </div>
  </header>

  <router-view v-slot="{ Component }">
    <transition 
    name="slide-fade"
    mode="out-in">
    <!-- <transition 
    mode="out-in"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"> -->
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
