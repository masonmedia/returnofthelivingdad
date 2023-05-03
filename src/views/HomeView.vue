<script setup>
// import posts from '../data/data.json'
import posts from '../content/frontaid.content.json'

// image paths
function getImageUrl(name, ext) {
  return new URL(`../assets/img/${name}.${ext}`, import.meta.url).href
}
</script>

<template>
  <main>
    <div class="container-fluid" :style="{'background' : 'url('+ getImageUrl('splatter', 'png') +') center right no-repeat', 'background-size' : ''}">
      <div class="row min-vh-100 mt-5">
        <div class="col-lg-8 offset-lg-2 d-flex flex-column my-auto p-5">
          <h5>A Dad Magazine</h5>
          <h1 class="text-uppercase" style="filter: drop-shadow(20px 20px 10px darkred); line-height: 0.8; letter-spacing: -5px; font-weight: 900; font-size: 20vmin;">Return of the living Dad</h1>
          <p class="h4 mt-3">I'm a Dad. Yes, it is like a Zombie movie. <br>These are my stories.</p>
        </div>
      </div>

      <section>
        <div class="row">
          <div class="col-lg-8 p-5">
            <h1 class="display-1 fw-bold lh-1 ls-1">A parent mag for people who care about their kids. </h1>
            <p class="h4">Conversations on parenting, insights into challenging behaviour, raw exposees on the realities of utter fatigue and relentless tantrums, and stories that (try to) help you understand the big strange world we live in.</p>
          </div>
        </div>
      </section>

      <section>
        <div class="row m-3">
          <!-- latest -->
          <h2 class="display-2 fw-bold lh-1 ls-1 border-bottom border-dark my-3 p-2">Latest</h2>
          <div class="col-lg-4 p-0" v-for="(post, index) in posts.blog" :key="index">
            <div class="m-2 bg-dark text-light rounded-3 shadow">
              <img :src="post.imageUrl" class="w-100" alt="">
              <div class="p-5" style="min-height: 350px;">
                <h5>{{ post.date }}</h5>
                <h2>{{ post.title }}</h2>
                <p v-html="post.body.slice(0,175) + '...'"></p>
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
