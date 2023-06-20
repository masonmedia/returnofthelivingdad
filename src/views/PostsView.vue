<script setup>
// import posts from '../data/data.json'
import { computed } from 'vue';
import { useSeoMeta } from 'unhead'
import posts from '../content/frontaid.content.json';
import Layout from '../components/TheLayout.vue';
import useImageLoader from '../stores/useImageLoader';
const { isLoaded } = useImageLoader();

useSeoMeta({
  title: 'Return of the Living Dad | About',
  description: "Return of the Living Dad is a parent blog centered on life with two (difficult) kids. It focuses on the relentless crushing defeat of daily life and the underlying joys that go along with it (sometimes).",
  ogDescription: 'Return of the Living Dad is a parent blog centered on life with two (difficult) kids. It focuses on the relentless crushing defeat of daily life and the underlying joys that go along with it (sometimes).',
  ogTitle: 'Return of the Living Dad | About',
  ogImage: getImageUrl('zombie','jpeg'),
  twitterCard: getImageUrl('zombie','jpeg'),
})

// image paths
function getImageUrl(name, ext) {
  return new URL(`../assets/img/${name}.${ext}`, import.meta.url).href
}

// reduce length of string to closest full word
function shorten(text, max) {
  return text && text.length > max ? text.slice(0, max).split(' ').slice(0, -1).join(' ') : text
}

// generate dynamic id to each post so don't need manual field in CMS
const postWithId = computed(() => {
  let arr = posts.blog;
  for (var i = 0; i < arr.length; i++) {
    arr[i].id = i + 1;
  }
  return arr;
})

</script>

<template>
  <main>
    <Layout>
      <div class="container-fluid" :style="{'background' : 'url('+ getImageUrl('splatter_yellow', 'png') +') center center no-repeat', 'background-size' : 'cover'}">
        <div class="row min-vh-100 mt-3 mt-lg-5" :style="{'background' : 'url('+ getImageUrl('splatter_yellow', 'png') +') center 10% no-repeat'}">
          <div class="col-lg-12 d-flex flex-column text-center my-auto p-5">
            <h5 class="h4 fw-bold mt-5 mt-lg-0">Return of the Living Dad</h5>
            <h1 class="text-uppercase" style="-webkit-text-stroke: 1px #FFCC00; filter: drop-shadow(5px 5px 1px goldenrod); line-height: 0.8; letter-spacing: -5px; font-weight: 900; font-size: 26vmin;">Posts</h1>
            <p class="h4 fw-bold mt-4 pt-2 ls-base">I'm a Dad. Yes, it is like a Zombie movie. <br>These are my stories.</p>
          </div>
        </div>

        <section>
          <div class="row m-3 mb-0 pb-5">
            <!-- latest -->
            <h2 class="display-2 fw-bold lh-1 ls-1 border-bottom border-warning my-4 p-2 pb-4" style="color: #FFCC00; -webkit-text-stroke: 1px #000; filter: drop-shadow(5px 5px 1px #000);">All posts</h2>
            <!-- check if post is published -->
            <div class="col-xl-4 col-md-6 p-0" v-for="(post, index) in postWithId" :key="index" 
            v-show="post.published === 'true' && post.published !== '' && post.slug !== 'the-genesis'">
              <div class="m-2 bg-dark text-warning rounded-3 shadow position-relative" v-if="post.id != 0" :class="post.published == 'false' || post.slug == 'the-genesis'  ? 'd-none' : ''">
                <TransitionGroup name="fade">
                  <div :key="1" @load="loadImage" v-show="!isLoaded" class="fade-in w-100 bg-secondary" style="min-height: 250px"></div>
                  <img :key="2" @load="loadImage" v-show="isLoaded" :src="post.imageUrl" class="fade-in w-100 h-100 object-fit" style="min-height: 250px" :alt="post.title" >
                </TransitionGroup>
                
                <div class="p-5" style="min-height: 380px;">
                  <h5>{{ post.date }}</h5>
                  <h2 class="fs-1 ls-base mb-3">{{ post.title }}</h2>
                  <div v-html="shorten(post.body, 175) + '...'"></div>
                  <router-link :to="'/' + post.id + '/' + post.slug">
                    <button class="btn btn-outline-warning px-4">Read</button>
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
