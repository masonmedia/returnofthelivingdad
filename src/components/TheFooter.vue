
<script setup>
import posts from '../content/frontaid.content.json'
// reduce length of string to closest full word
function shorten(text, max) {
  return text && text.length > max ? text.slice(0, max).split(' ').slice(0, -1).join(' ') : text
}
function getImageUrl(name, ext) {
  return new URL(`../assets/img/${name}.${ext}`, import.meta.url).href
}
</script>

<template>
    <div class="container-fluid p-0 border-top border-warning">
        <div class="row text-warning p-4">
            <div class="col-lg-3 col-md-6 p-4">
                <img :src="getImageUrl('splatter_yellow','png')" class="w-25 mb-3" alt="">
                <h1 class="display-3 fw-bold text-uppercase lh-1 ls-base">Return of the Living Dad</h1>
            </div>
            <div class="col-lg-3 col-md-6 p-4">
                <p><span class="fw-bold">Return of the Living Dad</span> is a parenting blog by Designer, Frontend Developer, Musician, and Dad, <a class="fw-bold" href="https://andrewmasonmedia.com" target="_blank">Andrew Mason</a>. It began from a need to record and communicate the pure, destruction waged on the core of my humanity from two small, difficult humans. It grew to be a format for me to offer genuine, comedic perspective on parenting when it isn't glossy, isn't glamorous, and isn't at all what the internet says it should be.</p>
            </div>
            <div class="col-lg-3 col-md-6 d-flex flex-column align-items-start justify-content-start p-4">
                <h3 class="ls-base fw-900 text-uppercase mt-0">{{ posts.blog.slice(-1)[0].title }}</h3>
                <p class="p fw-bold my-2" v-html="shorten(posts.blog.slice(-1)[0].body, 150) + '...'"></p>
                <router-link :to="'/blog/' + posts.blog.slice(-1)[0].id">
                  <button class="btn btn-sm btn-outline-warning px-4">More</button>
                </router-link>
            </div>
            <div class="col-lg-3 col-md-6 p-4">
                <img loading="lazy" :src="posts.blog.slice(-1)[0].imageUrl" class="fade-in rounded-3 w-100" style="min-height: 200px" :alt="posts.blog.slice(-1)[0].title">
            </div>
            <div class="col-lg-6 offset-lg-3 text-center py-3">
                <h4 class="fw-bold font-antonio">&copy; {{ new Date().getFullYear() }} ROTLD</h4>
            </div>
        </div>
    </div>
</template>
