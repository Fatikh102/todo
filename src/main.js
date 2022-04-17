import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize'
import 'material-icons/iconfont/material-icons.css'

createApp(App).use(router).mount('#app')
M.AutoInit()
