// useCounter.js
import { ref } from "vue";

export default function () {
  let isLoaded = ref(false);
  setTimeout( function loadImage() {
      isLoaded.value = true
  }, 1000)
  return {
    isLoaded
    // loadImage
  }
}