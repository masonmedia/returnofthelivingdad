<script setup>

import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import posts from '../data/data.json'

const route = useRoute();

const postId = parseInt(route.params.id)

const post = computed(() => {
  return posts.find(post => post.id === postId)
})

// const post = ref({});

// const base_url = "https://jsonplaceholder.typicode.com/posts/";
// async function getPostDetail() {
//     let response = await fetch(base_url + route.params.id);
//     post.value = await response.json();
//     console.log(post.value)
//   }

//   getPostDetail();

</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
         <h1>{{ post.title }}</h1>
         <p>{{ post.body }}</p>
       </div>
    </div>
  </div>
</template>