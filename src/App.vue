<script setup>
import { useRoute, RouterView } from 'vue-router'
import Nav from './components/TheNav.vue'
const route = useRoute();
</script>

<template>
  <div class="page-fade">
    <header>
      <Nav></Nav>
    </header>

  <router-view v-slot="{ Component }">
    <Transition 
    name="slide-fade"
    mode="out-in">
    <!-- <transition 
    mode="out-in"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"> -->
      <component :is="Component" :key="route.fullPath" />
    </Transition>
  </router-view>
  </div>
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
