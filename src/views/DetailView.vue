<script setup>

import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
// import posts from '../data/data.json'
import posts from '../content/frontaid.content.json'

const route = useRoute();

// const postId = parseInt(route.params.id)

const post = computed(() => {
  return posts.blog.find(post => post.id === route.params.id)
})

// const post = ref({});

// const base_url = "https://jsonplaceholder.typicode.com/posts/";
// async function getPostDetail() {
//     let response = await fetch(base_url + route.params.id);
//     post.value = await response.json();
//     console.log(post.value)
//   }

//   getPostDetail();

// get word count

// function countWords(str) {
//   return str.split(/\s+/).length;
// }

// my code
function wordCount(str) {
  // return str.match(/(\w+)/g).length;
  const words = str.match(/(\w+)/g).length;
  const readMins = Math.trunc(words / 250);
  return readMins;
}

// AI code
function readingTime(str) {
  const wpm = 250;
  const words = str.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}

// fb share btn
const fbShare = "https://www.facebook.com/sharer/sharer.php?u=";
const url = window.location.href.slice(7);
const shareButton = fbShare + url;

// twitter share btn
function tweetCurrentPage(title) {
  const twShare = "https://twitter.com/share?url=";
  const url = encodeURIComponent(window.location.href.slice(7));
  const twShareButton = twShare + url + '&text=' + title;
  return twShareButton;
}

</script>

<template>
  <div class="container-fluid">
    <div class="row min-vh-100 text-secondary">
      <div class="col-lg-6 d-flex flex-column justify-content-center align-items-center text-center p-5">
        <h5 class="fs-5 lh-1 mb-0">Return of the Living Dad</h5>
         <h1 class="display-3 fw-900 lh-1 ls-1 my-3 text-dark">{{ post.title }}</h1>
         <p class="lh-1 mb-1">Written by <span class="fw-bold">Andrew Mason</span></p>
         <p class="lh-1">On <span class="fw-bold">{{ post.date }}</span></p>
         <div class="d-flex">
          <span class="badge text-bg-secondary me-1" v-for="(tag, index) in post.tags" :key="index">{{ tag.category }}</span>
         </div>
       </div>
       
      <div class="col-lg-6 p-0" style="min-height: 50vh;">
         <img :src="post.imageUrl" class="w-100 h-100" style="object-fit: cover;" alt="" />
       </div>
      </div>

       <div class="container">
        <div class="row py-5">
          <!-- sidebar -->
          <div class="col-lg-3 text-end px-4 pb-3 mb-4">
            <div class="row sidebar">
              <div class="col-sm-12">
                <p><span class="fw-bold">Return of the Living Dad</span> is a parenting blog by Designer, Frontend Developer, Musician, and Dad, Andrew Mason. It began out of a need to communicate the pure, destruction waged on the core of my being from two small, difficult humans. It grew to be a format for me to offer real, genuine perspective on parenting when it isn't glossy, isn't glamorous, and isn't at all what the internet says it should be.</p>
              </div>
              
              <hr class="my-3">

              <div class="col-sm-12 p-3 border-bottom" v-for="(item, index) in posts.blog.slice(0,2)" :key="index">
                <div class="pb-3">
                  <h3 class="fw-bold m-0" style="letter-spacing: -1px;">{{ item.title }}</h3>
                  <p class="mb-3 text-secondary">{{ item.date }}</p>
                  <p class="mb-0" v-html="item.body.slice(0,100) + '...'"></p>
                  <router-link :to="'/blog/' + item.id">
                    <button class="btn btn-sm btn-outline-dark">More</button>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- post body -->
          <div class="col-lg-9">
            <h1 class="display-4 fw-900 lh-1 ls-1 mb-3">{{ post.title }}</h1>
            <h5 class="h6 fw-bold text-secondary border-bottom pb-4 mb-4">{{ 'Estimated read time ' + readingTime(post.body + post.title) + ' mins' }}</h5>
            <!-- <h5 class="mb-3 text-secondary fst-italic">{{ 'Estimated read time ' + wordCount(post.body) + ' mins' }}</h5> -->
            <p class="fs-5" v-html="post.body"></p>
            <div class=" d-flex py-3 mt-4 border-top">
              <a :href="shareButton" target="_blank">
                <button class="btn btn-outline-dark p-2 fw-900 fs-5 me-2" style="width: 50px; height: 50px; border-radius: 50%">
                  f
                </button>
              </a>
              <a :href="tweetCurrentPage(post.title)" target="_blank" alt="Tweet this page">
                <button class="btn btn-outline-dark p-2 fw-900 fs-5" style="width: 50px; height: 50px; border-radius: 50%">
                  t
                </button>
              </a>
            </div>
          </div>
    </div>

    <div class="row">
      <div class="col-sm-12 p-5">
        <h2>More</h2>
      </div>
    </div>
  </div>
       
  </div>
</template>

<style scoped>
  h3 {
    margin: 20px 0;
  }

.sidebar {
  position: sticky;
  top: 6rem;
  max-height: calc(100vh - 9rem);
  overflow-y: auto;
}
</style>