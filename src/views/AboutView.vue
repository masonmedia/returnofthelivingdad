<script setup>

import posts from '../data/data.json'

</script>

<template>
  <main>
    <div class="container-fluid">
      <div class="row min-vh-100">
        <div class="col-lg-12 d-flex my-auto p-5">
          <h1 class="display-1 fw-bold">Blog</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4" v-for="(post, index) in posts" :key="index">
          <div class="p-3 m-3">
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

<!-- <script setup>
import { ref, onMounted } from 'vue';

const postData = ref([]);

const base_url = "https://jsonplaceholder.typicode.com/posts/";
async function getPosts() {
    let response = await fetch(base_url);
    postData.value = await response.json();
    console.log(postData.value)
  }

onMounted(() => {
    getPosts();
})
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-4" v-for="(post, index) in postData.slice(0,8)" :key="index">
        <h1>{{ post.title }}</h1>
        <p>{{ post.body }}</p>

        <router-link :to="'/blog/' + post.id">
          <button>Read more</button>
        </router-link>

        <router-link :to="`/blog/${post.id}`">
          <button>Read more</button>
        </router-link>
      </div>
    </div>
  </div>
</template> -->