import './assets/main.css'
// import '@/assets/global.scss';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import planet from './planet.vue'
import router from './router'

const app = createApp(planet)

app.use(createPinia())
app.use(router)

app.mount('#app')
