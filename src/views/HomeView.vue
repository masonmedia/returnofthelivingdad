<script setup>
import posts from '../data/data.json'

// image paths
function getImageUrl(name, ext) {
  return new URL(`../assets/img/${name}.${ext}`, import.meta.url).href
}
</script>

<template>
  <main>
    <div class="container-fluid" :style="{'background' : 'url('+ getImageUrl('splatter', 'png') +') center right no-repeat', 'background-size' : ''}">
      <div class="row min-vh-100 mt-5">
        <div class="col-lg-8 offset-lg-2 d-flex flex-column my-auto p-5">
          <h1 class="text-uppercase" style="filter: drop-shadow(20px 20px 10px darkred); line-height: 0.8; letter-spacing: -5px; font-weight: 900; font-size: 20vmin;">Return of the living Dad</h1>
          <p class="h4 mt-3">I'm a Dad. Yes, it is like a Zombie movie. <br>These are my stories.</p>
        </div>
      </div>

      <div class="row m-3">
        <div class="col-lg-4 p-0" v-for="(post, index) in posts" :key="index">
          <div class="p-5 m-2 bg-dark text-light rounded-3 shadow">
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
            <router-link :to="'/blog/' + post.id">
              <button class="btn btn-outline-dark">More</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
