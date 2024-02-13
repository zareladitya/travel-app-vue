import './assets/main.css'
import './assets/style/layout.css'
import './assets/style/text.css'
import './assets/Style/alert.css'
import './assets/Style/backgroundStyle.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
