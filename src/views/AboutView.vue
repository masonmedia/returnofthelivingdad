<script setup>
// import posts from '../data/data.json'
import { computed } from 'vue';
import posts from '../content/frontaid.content.json';
import Layout from '../components/TheLayout.vue';
import useImageLoader from '../stores/useImageLoader';
const { isLoaded } = useImageLoader();

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
            <h5 class="h4 fw-bold mt-5 mt-lg-0">A Dad Magazine</h5>
            <h1 class="text-uppercase" style="-webkit-text-stroke: 1px #FFCC00; filter: drop-shadow(5px 5px 1px goldenrod); line-height: 0.8; letter-spacing: -5px; font-weight: 900; font-size: 26vmin;">About me</h1>
            <p class="h4 fw-bold mt-4 pt-2 ls-base">I'm a Dad. Yes, it is like a Zombie movie. <br>These are my stories.</p>
          </div>
        </div>

        <section>
          <div class="row min-vh-100 bg-dark text-warning rounded-3 rounded-start-0 shadow m-3">
            <div class="col-lg-6 p-0">
              <img class="w-100 h-100 object-fit" :src="getImageUrl('zombie_transparent', 'png')" alt="">
            </div>
            <div class="col-lg-6 d-flex my-auto">
                <div class="p-5" style="min-height: 300px;">
                  <img style="width: 150px;" :src="getImageUrl('splatter_yellow', 'png')" alt="">
                  <h5>About me</h5>
                  <h2 class="display-2 ls-1 fw-900 text-uppercase">Dad, zombie, and a couple other things.</h2>
                  <p class="h4 fw-bold my-4">I'm Andrew. I'm a musician, frontend developer, designer, and writer, I'm also a Dad. It's the single greatest challenge I've undertaken as a human.</p>
                  <p class="h5">People don't say this enough. Or they don't say it this way. I mean there's a lot of the usual social media style "Parenting is my greatest achievement" bullshit but it's usually embroidered on a throw pillow in a filtered photo of smiles by the seaside with cucumber water and a yoga mat. The challenge I'm talking about is a grimy, crushing world of constant sickness, noise, and fatigue. There's no polish. There's no seaside. There's no cucumber water. There's the tap, screaming, and toys everywhere.</p>
                </div>
            </div>
          </div>
        </section>

        <section>
          <div class="row min-vh-100 bg-dark text-light">
            <div class="col-lg-10 d-flex flex-column my-auto p-5">
              <h1 class="display-2 fw-bold lh-1 ls-1 my-3">Going to space, sustainable energy, climate action, curing diseases - ya, these are all great things. Hard things. But none of them involve a screaming, defiant, tantrumming child. <span class="text-warning">And no sleep.</span></h1>
              <p class="h4 py-3">Now I'm not saying, you know, outright, that parenting is harder than engineering a rocket to go to Mars. I'm just saying, that engineering a rocket to go to Mars is easier than parenting. Because engineering a rocket to go to Mars doesn't require you to wrestle an angry, screaming, wriggling, kicking, punching, crying, whining toddler into a car seat he doesn't want to go into. And THEN taking that same angry, screaming, wriggling, kicking, punching, crying, whining toddler for a quiet, calming drive to get groceries. Engineering a rocket to go to Mars must be done in a quiet room. With no kids of any kind. Within 100 kilometers. Oh, and you also need sleep.</p>
            </div>
          </div>
        </section>
        
        <section>
          <div class="row min-vh-100 m-3 p-3 rounded-3" style="background: #FFCC00">
            <div class="col-lg-4 bg-dark p-0 rounded-3">
              <img class="w-100 h-100 object-fit" :src="getImageUrl('splatter_yellow', 'png')" alt="">

            </div>
            <div class="col-lg-8 d-flex flex-column my-auto p-5">
              <h1 class="display-2 fw-bold lh-1 ls-1 my-3">I have two beautiful, unique, creative, amazing, difficult, defiant, persistent, determined, and funny boys.</h1>
              <p class="h4 py-3">I am thankful for them every day. I am also destroyed by them evey day. And it is this destruction that fuels my writing. This blog is an outlet to rant about my life and experience as a Dad. But it's also, I hope, something that might give other parents like me out there a bit of ease, a bit of support, knowing that the reality belies the internet. Raising kids is brutal. It's f*#$ed.</p>
            </div>
          </div>
        </section>

        <section>
          <div class="row m-3 mb-0 pb-5">
            <!-- latest -->
            <h2 class="display-2 fw-bold lh-1 ls-1 border-bottom border-warning my-4 p-2 pb-4" style="color: #FFCC00; -webkit-text-stroke: 1px #000; filter: drop-shadow(5px 5px 1px #000);">Latest posts</h2>
            <!-- check if post is published -->
            <div class="col-lg-4 p-0" v-for="(post, index) in postWithId.slice(0,4)" :key="index" :class="post.published != 'true' ? 'd-none' : ''">
              <div class="m-2 bg-warning rounded-3 shadow position-relative" v-if="post.id != 0" :class="post.published == 'false' || post.slug == 'the-genesis'  ? 'd-none' : ''">
                <TransitionGroup name="fade">
                  <div :key="1" @load="loadImage" v-show="!isLoaded" class="fade-in w-100 bg-secondary" style="min-height: 250px"></div>
                  <img :key="2" @load="loadImage" v-show="isLoaded" :src="post.imageUrl" class="fade-in w-100 h-100 object-fit" style="min-height: 250px" :alt="post.title" >
                </TransitionGroup>
                
                <div class="p-5" style="min-height: 360px;">
                  <h5>{{ post.date }}</h5>
                  <h2 class="fs-1 ls-base mb-3">{{ post.title }}</h2>
                  <p v-html="shorten(post.body, 175) + '...'"></p>
                  <router-link :to="'/' + post.id + '/' + post.slug">
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
