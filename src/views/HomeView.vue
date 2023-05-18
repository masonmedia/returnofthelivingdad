<script setup>
// import posts from '../data/data.json'
import { computed } from 'vue'
import { useSeoMeta } from 'unhead'
import posts from '../content/frontaid.content.json';
import Layout from '../components/TheLayout.vue';
import useImageLoader from '../stores/useImageLoader';
const { isLoaded } = useImageLoader();

// const post = computed(() => {
//   return posts.blog.find(post => post.id === route.params.id)
// })

// seo/head
useSeoMeta({
  title: 'Return of the Living Dad',
  description: "Return of the Living Dad is a parent blog centered on life with two (difficult) kids. It focuses on the relentless crushing defeat of daily life and the underlying joys that go along with it (sometimes).",
  ogDescription: 'Return of the Living Dad is a parent blog centered on life with two (difficult) kids. It focuses on the relentless crushing defeat of daily life and the underlying joys that go along with it (sometimes).',
  ogTitle: 'Return of the Living Dad',
  ogImage: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  twitterCard: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
})

// generate dynamic id to each post so don't need manual field in CMS
const postWithId = computed(() => {
  let arr = posts.blog;
  for (var i = 0; i < arr.length; i++) {
    arr[i].id = i + 1;
  }
  return arr;
})

// image paths
function getImageUrl(name, ext) {
  return new URL(`../assets/img/${name}.${ext}`, import.meta.url).href
}

// reduce length of string to closest full word
function shorten(text, max) {
  return text && text.length > max ? text.slice(0, max).split(' ').slice(0, -1).join(' ') : text
}

// get first two sentences for latest post descriptions
function postDescription(arr) {
  const sentences = arr.match(/[^\.!\?]+[\.!\?]+/g);
  // Concatenate the first two sentences
  const firstTwoSentences = sentences.slice(0, 2).join(" ");
  return firstTwoSentences;
}

function oddOrEven(arr) {
  const even = arr.length % 2 === 0;
  return even;
}

</script>

<template>
  <main>
    <Layout>
      <div class="container-fluid" :style="{'background' : 'url('+ getImageUrl('splatter_yellow', 'png') +') center right no-repeat', 'background-size' : 'cover'}">        
        <div class="row mt-5" style="padding: 6% 0;" :style="{'background' : 'url('+ getImageUrl('splatter_yellow', 'png') +') 83% 40% no-repeat'}">
          <div class="col-xl-10 offset-xl-1 col-lg-12 d-flex flex-column justify-content-center align-items-start p-5">
            <h5 class="h4 fw-bold">A Dad Magazine</h5>
            <h1 class="text-uppercase" style="-webkit-text-stroke: 1px #FFCC00; filter: drop-shadow(15px 15px 5px goldenrod); line-height: 0.8; letter-spacing: -5px; font-weight: 900; font-size: 25vmin;">Return of the living Dad</h1>
            <p class="h4 fw-bold mt-4 pt-2 ls-base">I'm a Dad. Yes, it is like a Zombie movie. <br>These are my stories.</p>
          </div>
        </div>

        <section>
          <div class="row min-vh-100 bg-dark text-light">
            <div class="col-lg-8 d-flex flex-column justify-content-center align-items-start p-5">
              <h5>I'm a Dad. Yes, it's like a zombie movie.</h5>
              <h1 class="display-1 fw-bold lh-1 ls-1 my-3">A parent mag for people who spend 60% of their time sick, 20% handling tantrums, 10% buying groceries, 9% cleaning the house, and 1% sleeping.</h1>
              <!-- <h1 class="display-1 fw-bold lh-1 ls-1 my-3">A parent mag for people who know what it's like to wake up every day for a year and a half to a screaming baby but who don't say anything because it's too f*cking tiring.</h1> -->
              <!-- <h1 class="display-1 fw-bold lh-1 ls-1 my-3">A parent mag for people who care about their (mental health) I mean, kids. </h1> -->
              <p class="h4 py-3">Conversations on parenting, insights into challenging behaviour, raw exposees on the realities of utter fatigue and relentless tantrums, and stories that (try to) help you understand the big strange world we live in.</p>
            </div>
          </div>
        </section>

        <section>
          <div class="row">
            <!-- about -->
            <div class="col-lg-12 pt-5">
                <!-- <h2 class="display-2 fw-bold lh-1 ls-1 border-bottom border-dark p-2 py-4">About ROTLD</h2> -->
                <h2 class="display-2 fw-bold lh-1 ls-1 border-bottom border-warning my-4 p-2 pb-4" style="color: #FFCC00; -webkit-text-stroke: 1px #000; filter: drop-shadow(5px 5px 1px #000);">About ROLTD</h2>
            </div>
          </div>

          <div class="row min-vh-100 bg-dark text-warning rounded-3 rounded-start-0 shadow m-3">
            <div class="col-lg-6 p-0 position-relative">
              <TransitionGroup name="fade">
                  <div :key="1" @load="loadImage" v-show="!isLoaded" class="page-fade w-100 h-100 object-fit bg-secondary" style="min-height: 500px"></div>
                  <img :key="2" @load="loadImage" v-show="isLoaded" :src="postWithId[0].imageUrl" class="fade-in w-100 h-100 object-fit" style="min-height: 250px" :alt="postWithId[0].title" >
                  <!-- posts.blog.slice(-1)[0].title -->
                </TransitionGroup>
            </div>
            <div class="col-lg-6 d-flex my-auto">
                <div class="p-4 p-lg-5" style="min-height: 300px;">
                  <img style="width: 150px;" :src="getImageUrl('splatter_yellow', 'png')" alt="">
                  <h5>{{ postWithId[0].date }}</h5>
                  <h2 class="display-2 ls-1 fw-900 text-uppercase">{{ postWithId[0].title }}</h2>
                  <div class="h5 fw-bold my-4" v-html="postWithId[0].body.substr(0,320) + '...'"></div>
                  <router-link :to="'/' + postWithId[0].id + '/' + postWithId[0].slug">
                    <button class="btn btn-outline-warning px-4">More</button>
                  </router-link>
                </div>
            </div>
          </div>
        </section>

        <section>
          <div class="row m-3 mb-0 pb-5 position-relative">
            <!-- latest -->
            <h2 class="display-2 fw-bold lh-1 ls-1 border-bottom border-warning my-4 p-2 pb-4" style="color: #FFCC00; -webkit-text-stroke: 1px #000; filter: drop-shadow(5px 5px 1px #000);">Latest posts</h2>
            <!-- check if post is published -->
            <!-- :class="oddOrEven(postWithId) ? 'col-lg-4 col-md-6' : 'col-lg-6'" -->
            <div 
            class="col-lg-4 col-md-6 p-0" v-for="(post, index) in postWithId" :key="index" 
            v-show="post.published === 'true' && post.published !== '' && post.slug !== 'the-genesis'">
              <div class="m-2 bg-dark rounded-3 shadow position-relative">
                <TransitionGroup name="fade">
                  <div :key="1" @load="loadImage" v-show="!isLoaded" class="fade-in w-100 bg-secondary" style="min-height: 250px"></div>
                  <img :key="2" @load="loadImage" v-show="isLoaded" :src="post.imageUrl" class="fade-in w-100 h-100 object-fit" style="min-height: 250px" :alt="post.title" >
                </TransitionGroup>
                <div class="p-5 bg-warning rounded-bottom" style="min-height: 360px;">
                  <h5>{{ post.date }}</h5>
                  <h2 class="fs-1 ls-base mb-3">{{ post.title }}</h2>
                  <!-- <div v-html="postDescription(post.body)"></div> -->
                  <div v-html="shorten(post.body, 175) + '...'"></div>
                  <router-link :to="'/' + post.id + '/' + post.slug">
                    <button class="btn btn-dark px-4 rounded-3">More</button>
                  </router-link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

    </Layout>
  </main>
</template>
