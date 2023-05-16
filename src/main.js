import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from "unhead"
import App from './App.vue'
import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './assets/scss/main.scss'
import './assets/main.css'

// Create a global head instance
const head = createHead()
const app = createApp(App)

app.use(createPinia())
app.use(head)
app.use(router)

app.mount('#app')
