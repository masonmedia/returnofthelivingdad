<script setup>

import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Layout from '../components/TheLayout.vue';
import useImageLoader from '../stores/useImageLoader'
// check image loaded
const { isLoaded, loadImage } = useImageLoader();

import posts from '../content/frontaid.content.json'

const route = useRoute();
const router = useRouter();

// const postId = parseInt(route.params.id)

const post = computed(() => {
  return posts.blog.find(post => post.id === route.params.id)
})

const currentItemIndex = ref(0);

const nextItem = computed(() => {
  return posts.blog[currentItemIndex.value + 1]
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
function readingTime(str) {
  const wpm = 250;
  const words = str.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}

// prev/next

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

</script>

<template>
  <Layout>
    <div class="container-fluid text-light">
      <div class="row min-vh-100">
        <div class="col-lg-6 d-flex flex-column justify-content-center align-items-center text-center p-5">
          <h5 class="fs-5 lh-1 mb-0">Return of the Living Dad</h5>
          <h1 class="display-2 fw-900 lh-1 ls-1 mt-3 mb-4 text-yellow">{{ post.title }}</h1>
          <p class="lh-1 mb-1">Written by <span class="fw-bold">Andrew Mason</span></p>
          <p v-if="post.date" class="lh-1">On <span class="fw-bold">{{ post.date }}</span></p>
          <div class="d-flex">
            <span class="badge text-bg-light me-1" v-for="(tag, index) in post.tags" :key="index">{{ tag.category }}</span>
          </div>
        </div>
        
        <div class="col-lg-6 p-0" style="min-height: 50vh;">
          <TransitionGroup name="fade">
              <img :key="1" @load="loadImage" v-show="!isLoaded" class="fade-in bg-secondary w-100 h-100 object-fit" src="https://placehold.co/600x400?text=ROTLD" :alt="post.title">
              <img :key="2" @load="loadImage" v-show="isLoaded" class="fade-in w-100 h-100 object-fit" :src="post.imageUrl" :alt="post.title">
          </TransitionGroup>
          <!-- <Transition name="fade" mode="out-in">
            <img @load="loadImage" v-show="isLoaded" background="lightgrey" width="100%" height="400px" class="fade-in w-100 h-100 object-fit" :src="post.imageUrl" :alt="post.title">
          </Transition> -->
          </div>
        </div>

        <div class="container">
          <div class="row py-5">
            <!-- sidebar -->
            <div class="col-lg-3 text-end px-4 pb-3 mb-4 order-2 order-lg-1">
              <div class="row sidebar">
                <div class="col-sm-12">
                  <p><span class="fw-bold">Return of the Living Dad</span> is a parenting blog by Designer, Frontend Developer, Musician, and Dad, Andrew Mason. It began from a need to record and communicate the pure, destruction waged on the core of my being from two small, difficult humans. It grew to be a format for me to offer real, genuine perspective on parenting when it isn't glossy, isn't glamorous, and isn't at all what the internet says it should be.</p>
                </div>
                <hr class="my-3">
                <div class="col-sm-12 p-3 border-bottom" v-for="(item, index) in posts.blog.slice(1,4)" :key="index">
                  <div class="pb-3">
                    <h3 class="fw-bold m-0" style="letter-spacing: -1px;">{{ item.title }}</h3>
                    <p class="mb-3 text-grey">{{ item.date }}</p>
                    <p class="mb-0" v-html="item.body.slice(0,100) + '...'"></p>
                    <router-link :to="'/blog/' + item.id">
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
              <div class="d-flex my-4">
                <button v-if="post.id" @click="router.push('/blog/' + --route.params.id)" :class="post.id == 0 ? 'd-none' : ''" class="btn btn-outline-light me-2">Prev</button>

                <button v-if="post.id" :class="post.id == posts.blog[0].id ? 'd-none' : ''" @click="router.push('/blog/' + ++route.params.id)" class="btn btn-outline-dark me-2">Next</button>
              </div>
              <!-- <p>{{ nextItem.title }}</p> -->
              <!-- share -->
              <div class=" d-flex py-4 mt-4 border-top">
                <a :href="shareButton" target="_blank">
                  <button class="btn btn-outline-light p-2 fw-900 fs-5 me-2" style="width: 50px; height: 50px; border-radius: 50%">
                    f
                  </button>
                </a>
                <a :href="tweetCurrentPage(post.title)" target="_blank" alt="Tweet this page">
                  <button class="btn btn-outline-light p-2 fw-900 fs-5 me-2" style="width: 50px; height: 50px; border-radius: 50%">
                    t
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
            </div>
      </div>

      <!-- <div class="row">
        <div class="col-sm-12 p-5">
          <h2>More</h2>
        </div>
      </div> -->
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