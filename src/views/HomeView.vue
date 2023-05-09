<script setup>
// import posts from '../data/data.json'
import posts from '../content/frontaid.content.json'
import useImageLoader from '../stores/useImageLoader';
const { isLoaded, loadImage } = useImageLoader();

// image paths
function getImageUrl(name, ext) {
  return new URL(`../assets/img/${name}.${ext}`, import.meta.url).href
}

// reduce length of string to closest full word
function shorten(text, max) {
  return text && text.length > max ? text.slice(0, max).split(' ').slice(0, -1).join(' ') : text
}
</script>

<template>
  <main>
    <div class="container-fluid" :style="{'background' : 'url('+ getImageUrl('splatter', 'png') +') center right no-repeat', 'background-size' : 'cover'}">
      <div class="row min-vh-100 mt-5" :style="{'background' : 'url('+ getImageUrl('splatter', 'png') +') center right no-repeat'}">
        <div class="col-lg-8 offset-lg-2 d-flex flex-column my-auto p-5">
          <h5>A Dad Magazine</h5>
          <h1 class="text-uppercase" style="filter: drop-shadow(20px 20px 10px darkred); line-height: 0.8; letter-spacing: -5px; font-weight: 900; font-size: 26vmin;">Return of the living Dad</h1>
          <p class="h4 fw-light mt-4">I'm a Dad. Yes, it is like a Zombie movie. <br>These are my stories.</p>
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

        <div class="row min-vh-100 bg-light shadow m-3">
          <div class="col-lg-6 p-0">
            <img :src="posts.blog.slice(-1)[0].imageUrl" class="w-100 h-100 object-fit" alt="">
          </div>
          <div class="col-lg-6 d-flex my-auto">
              <div class="p-5" style="min-height: 300px;">
                <img style="width: 150px;" :src="getImageUrl('splatter', 'png')" alt="">
                <h5>{{ posts.blog.slice(-1)[0].date }}</h5>
                <h2 class="display-2 ls-1 fw-900 text-uppercase">{{ posts.blog.slice(-1)[0].title }}</h2>
                <p class="h5 fw-bold text-secondary my-4" v-html="posts.blog.slice(-1)[0].body.substr(0,320) + '...'"></p>
                <router-link :to="'/blog/' + posts.blog.slice(-1)[0].id">
                  <button class="btn btn-outline-dark px-4">More</button>
                </router-link>
              </div>

          </div>
        </div>
      </section>

      <section>
        <div class="row m-3">
          <!-- latest -->
          <h2 class="display-2 fw-bold lh-1 ls-1 border-bottom border-dark my-4 p-2 pb-4">Latest</h2>
          <div class="col-lg-4 p-0" v-for="(post, index) in posts.blog" :key="index">
            
            <div class="m-2 bg-dark text-light rounded-3 shadow position-relative" v-if="post.id != 0" >
              <TransitionGroup name="fade">
                <!-- <div :key="1" @load="loadImage" v-show="!isLoaded" class="w-100 bg-secondary" style="min-height: 200px"></div> -->
                <img :key="1" @load="loadImage" v-if="!isLoaded" class="fade-in bg-secondary w-100 position-absolute start-0 top-0" src="https://placehold.co/1000x400?text=ROTLD" :alt="post.title">
                <img :key="2" @load="loadImage" v-if="isLoaded" :src="post.imageUrl" class="fade-in w-100" :alt="post.title" >
              </TransitionGroup>
              
              <div class="p-5" style="min-height: 360px;">
                <h5>{{ post.date }}</h5>
                <h2>{{ post.title }}</h2>
                <p v-html="shorten(post.body, 175) + '...'"></p>
                <router-link :to="'/blog/' + post.id">
                  <button class="btn btn-outline-light">More</button>
                </router-link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  </main>
</template>
