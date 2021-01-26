import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import domtoimage from 'dom-to-image'
import './assets/index.scss'



createApp(App).use(router).mount('#app')
