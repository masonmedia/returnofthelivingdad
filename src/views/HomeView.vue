<script setup>
// import posts from '../data/data.json'
import { computed } from 'vue'
import posts from '../content/frontaid.content.json';
import Layout from '../components/TheLayout.vue';
import useImageLoader from '../stores/useImageLoader';
const { isLoaded } = useImageLoader();

// const post = computed(() => {
//   return posts.blog.find(post => post.id === route.params.id)
// })

const postWithId = computed(() => {
  // var arr = [{name: "John"}, {name: "Jane"}];
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

function postId() {
  let arr = posts.blog;
  for (var i = 0; i < arr.length; i++) {
    arr[i].id = i + 1;
  }
  console.log(arr);
}
postId();

</script>

<template>
  <main>
    <Layout>
      <div class="container-fluid" :style="{'background' : 'url('+ getImageUrl('splatter_yellow', 'png') +') center right no-repeat', 'background-size' : 'cover'}">        
        <div class="row min-vh-100 mt-3 mt-lg-5" :style="{'background' : 'url('+ getImageUrl('splatter_yellow', 'png') +') center right no-repeat'}">
          <div class="col-xl-8 col-lg-10 d-flex flex-column my-auto p-5">
            <h5 class="h4 fw-bold mt-5 mt-lg-0">A Dad Magazine</h5>
            <h1 class="text-uppercase" style="-webkit-text-stroke: 1px #FFCC00; filter: drop-shadow(15px 15px 5px goldenrod); line-height: 0.8; letter-spacing: -5px; font-weight: 900; font-size: 26vmin;">Return of the living Dad</h1>
            <p class="h4 fw-bold mt-4 pt-2 ls-base">I'm a Dad. Yes, it is like a Zombie movie. <br>These are my stories.</p>
          </div>
        </div>

        <section>
          <div class="row min-vh-100 bg-dark text-light">
            <div class="col-lg-8 d-flex flex-column my-auto p-5">
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
                <h2 class="display-2 fw-bold lh-1 ls-1 border-bottom border-dark p-2 py-4">About ROTLD</h2>
            </div>
          </div>

          <div class="row min-vh-100 bg-dark text-warning rounded-3 rounded-start-0 shadow m-3">
            <div class="col-lg-6 p-0 position-relative">
              <TransitionGroup name="fade">
                  <div :key="1" @load="loadImage" v-show="!isLoaded" class="page-fade w-100 h-100 object-fit bg-secondary" style="min-height: 500px"></div>
                  <img :key="2" @load="loadImage" v-show="isLoaded" :src="posts.blog[6].imageUrl" class="fade-in w-100 h-100 object-fit" style="min-height: 250px" :alt="posts.blog[6].title" >
                  <!-- posts.blog.slice(-1)[0].title -->
                </TransitionGroup>
            </div>
            <div class="col-lg-6 d-flex my-auto">
                <div class="p-5" style="min-height: 300px;">
                  <img style="width: 150px;" :src="getImageUrl('splatter_yellow', 'png')" alt="">
                  <h5>{{ posts.blog.slice(-1)[0].date }}</h5>
                  <h2 class="display-2 ls-1 fw-900 text-uppercase">{{ posts.blog[6].title }}</h2>
                  <p class="h5 fw-bold my-4" v-html="posts.blog[6].body.substr(0,320) + '...'"></p>
                  <router-link :to="'/blog/' + posts.blog[6].id">
                    <button class="btn btn-outline-warning px-4">More</button>
                  </router-link>
                </div>
            </div>
          </div>
        </section>

        <section>
          <div class="row m-3 mb-0 pb-5 position-relative">
            <!-- latest -->
            <h2 class="display-2 fw-bold lh-1 ls-1 border-bottom border-dark my-4 p-2 pb-4">Latest</h2>
            <!-- check if post is published -->
            <div class="col-lg-4 p-0" v-for="(post, index) in postWithId" :key="index" :class="post.published !== 'true' ? 'd-none' : ''">
              <div class="m-2 bg-dark rounded-3 shadow position-relative" v-if="post.slug != 'the-genesis'">
                <TransitionGroup name="fade">
                  <div :key="1" @load="loadImage" v-show="!isLoaded" class="fade-in w-100 bg-secondary" style="min-height: 250px"></div>
                  <img :key="2" @load="loadImage" v-show="isLoaded" :src="post.imageUrl" class="fade-in w-100 h-100 object-fit" style="min-height: 250px" :alt="post.title" >
                </TransitionGroup>
                <div class="p-5 bg-warning rounded-bottom" style="min-height: 360px;">
                  <h5>{{ post.date }}</h5>
                  <h2 class="fs-1 ls-base mb-3">{{ post.title }}</h2>
                  <p v-html="shorten(post.body, 175) + '...'"></p>
                  <router-link :to="'/blog/' + post.id">
                    <button class="btn btn-dark px-4">More</button>
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
