<script setup>

import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import posts from '../content/frontaid.content.json'
import Layout from '../components/TheLayout.vue';
import PostFooter from '../components/ThePostFooter.vue';
import useImageLoader from '../stores/useImageLoader'
// check image loaded
const { isLoaded } = useImageLoader();

const route = useRoute();
const router = useRouter();

// const postId = parseInt(route.params.id)

// let isPublished = posts.blog.every(obj => obj.published === 'true');

// original id as string 
// const post = computed(() => {
//   return posts.blog.find(post => post.id === route.params.id)
// })

// add dynamic id to each post for navigation => to remove need for manual field in JSON => needed to use parseInt as the new id additions were integers not strings as original
const post = computed(() => {
  let arr = posts.blog;
  for (var i = 0; i < arr.length; i++) {
    arr[i].id = i + 1;
  }
  const idInteger = parseInt(route.params.id)
  return arr.find(post => post.id === idInteger)
})

// add dynamic id to posts for display
const postWithId = computed(() => {
  // var arr = [{name: "John"}, {name: "Jane"}];
  let arr = posts.blog;
  for (var i = 0; i < arr.length; i++) {
    arr[i].id = i + 1;
  }
  return arr;
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

// my code
function wordCount(str) {
  const words = str.match(/(\w+)/g).length;
  const readMins = Math.trunc(words / 250);
  return readMins;
}

// AI code
// function readingTime(str) {
//   const wpm = 250;
//   const words = str.trim().split(/\s+/).length;
//   const time = Math.ceil(words / wpm);
//   return time;
// }

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

// link copy
function copyToClipboard() {
  navigator.clipboard.writeText(window.location.href);
}

// email page

function emailPage(title) {
  const href = "mailto:?";
  const url = encodeURIComponent(window.location.href.slice(7));
  const emailShare = href + 'subject=' +  title + '&body=' + 'Check out this great article I found from returnofthelivingdad.com: ' + url;
  return emailShare;
}

// const shuffle = computed(() => {
//   let array = posts.blog;
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// })

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}


</script>

<template>
  <Layout>
    <div class="container-fluid text-light">
      <div class="row min-vh-100 mt-5 mt-lg-0">
        <div class="col-lg-6 d-flex flex-column justify-content-center align-items-center min-vh-50 text-center p-5">
          <h5 class="fs-5 lh-1 mb-0">Return of the Living Dad</h5>
          <h1 class="display-2 fw-900 lh-1 ls-1 mt-3 mb-4 text-yellow">{{ post.title }}</h1>
          <p class="lh-1 mb-1">Written by <span class="fw-bold">Andrew Mason</span></p>
          <p v-if="post.date" class="lh-1">On <span class="fw-bold">{{ post.date }}</span></p>
          <div class="d-flex">
            <span class="badge text-bg-light me-1" v-for="(tag, index) in post.tags" :key="index">{{ tag.category }}</span>
          </div>
        </div>
        
        <div class="col-lg-6 p-0 position-relative" style="min-height: 50vh;">
          <TransitionGroup name="fade">
            <div :key="1" @load="loadImage" v-show="!isLoaded" class="page-fade w-100 h-100 object-fit bg-secondary" style="min-height: 500px"></div>
            <img :key="2" @load="loadImage" v-show="isLoaded" :src="post.imageUrl" class="fade-in w-100 h-100 object-fit" :alt="post.title">
          </TransitionGroup>
          </div>
        </div>

        <div class="container">
          <div class="row py-5">
            <!-- sidebar -->
            <div class="col-lg-3 d-none d-lg-flex text-end px-4 pb-3 mb-4 order-2 order-lg-1">
              <div class="row sidebar">
                <div class="col-sm-12">
                  <p><span class="fw-bold">Return of the Living Dad</span> is a parenting blog by Designer, Frontend Developer, Musician, and Dad, Andrew Mason. It began from a need to record and communicate the pure, destruction waged on the core of my being from two small, difficult humans. It grew to be a format for me to offer real, genuine perspective on parenting when it isn't glossy, isn't glamorous, and isn't at all what the internet says it should be.</p>
                </div>
                <hr class="my-3">
                <div class="col-sm-12 p-3 border-bottom" v-for="(item, index) in postWithId.slice(1, 4)" :key="index" :class="item.id === post.id ? 'd-none' : ''">
                  <div class="pb-3">
                    <h3 class="fw-bold m-0" style="letter-spacing: -1px;">{{ item.title }}</h3>
                    <p class="mb-3 text-grey">{{ item.date }}</p>
                    <p class="mb-0" v-html="item.body.slice(0,100) + '...'"></p>
                    <router-link :to="'/' + item.id + '/' + item.slug">
                      <button class="btn btn-sm btn-outline-light">More</button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>

            <!-- post body -->
            <div class="col-lg-9 px-4 order-1 order-lg-2">
              <h1 class="display-4 fw-900 lh-1 ls-1 mb-3">{{ post.title }}</h1>
              <!-- <h5 class="h6 fw-bold text-secondary border-bottom pb-4 mb-4">{{ 'Estimated read time ' + readingTime(post.body + post.title) + ' mins' }}</h5> -->
              <h5 v-if="wordCount(post.body) <= 1" class="h6 fw-bold text-secondary border-bottom pb-4 mb-4">{{ 'Estimated read time ' + wordCount(post.body) + ' min' }}</h5>
              <h5 v-else class="h6 fw-bold text-grey border-bottom pb-4 mb-4">{{ 'Estimated read time ' + wordCount(post.body) + ' mins' }}</h5>
              <p class="fs-5" v-html="post.body"></p>
              <!-- prev/next -->
              <!-- <div class="d-flex my-4">
                <button v-if="post.id" @click="router.push('/' + --route.params.id + '/' + post.slug)" :class="post.id == 0 ? 'd-none' : ''" class="btn btn-outline-light me-2">Prev</button>

                <button v-if="post.id" :class="post.id == posts.blog.slice(-1)[0].id ? 'd-none' : ''" @click="router.push('/' + ++route.params.id)" class="btn btn-outline-light me-2">Next</button>
              </div> -->
             
              <!-- share -->
              <div class="d-flex py-5 mt-5 border-top">
                <a :href="shareButton" target="_blank">
                  <button class="btn btn-outline-light p-2 fw-900 fs-5 me-2" style="width: 50px; height: 50px; border-radius: 50%">
                    f
                  </button>
                </a>
                <a :href="tweetCurrentPage(post.title)" target="_blank" alt="Tweet this page">
                  <button class="btn btn-outline-light p-2 fw-900 fs-5 me-2" style="width: 50px; height: 50px; border-radius: 50%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </button>
                </a>
                <a :href="emailPage(post.title)">
                  <button class="btn btn-outline-light p-2 fw-900 fs-5 me-2" style="width: 50px; height: 50px; border-radius: 50%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                  </svg>
                  </button>
                </a>

                  <button @click="copyToClipboard" 
                  class="btn btn-outline-light p-2 fw-900 fs-5" style="width: 50px; height: 50px; border-radius: 50%">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                      <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                      <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                    </svg>
                  </button>
              </div>

              <!-- post footer info -->
              <post-footer></post-footer>
            
            </div><!--end post body-->
      </div>

      <!-- footer more posts -->

      <div class="row text-dark pb-5">
        <!-- <p class="text-light" v-for="(p, index) in shuffle" :key="index">{{ p.slug }}</p> -->
        <!-- <p class="text-light" v-for="(item, index) in shuffle(postWithId)" :key="index">{{ item.title }}</p> -->
          <div class="col-lg-4 p-0" v-for="(item, index) in shuffle(postWithId).slice(0,5)" :key="index" :class="item.id === post.id || item.published == 'false' || item.slug == 'the-genesis'  ? 'd-none' : ''">
              <div class="m-2 rounded-3 shadow position-relative">
                <TransitionGroup name="fade">
                  <div :key="1" @load="loadImage" v-show="!isLoaded" class="page-fade w-100 h-100 object-fit bg-secondary" style="min-height: 200px"></div>
                  <img :key="2" @load="loadImage" v-show="isLoaded" :src="item.imageUrl" class="fade-in w-100 h-100 object-fit" :alt="post.title">
                </TransitionGroup>
                <div class="p-4 bg-warning rounded-bottom" style="min-height: 250px;">
                  <h5>{{ item.date }}</h5>
                  <!-- <p> {{ item.published }}</p> -->
                  <h2 class="fs-1 ls-base mb-3">{{ item.title }}</h2>
                  <p class="mb-0" v-html="item.body.slice(0,100) + '...'"></p>
                  <router-link :to="'/' + item.id + '/' + item.slug">
                    <button class="btn btn-sm btn-outline-dark px-4 rounded-3">Read</button>
                  </router-link>
                </div>
              </div>
            </div>

      </div>
    </div>
        
    </div>
  </Layout>
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