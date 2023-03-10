/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import App from './App.vue' // Components
import { createApp } from 'vue' // Composables
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import axios from 'axios' 
import VueAxios from 'vue-axios'
import { registerPlugins } from '@/plugins' // Plugins
import router from './router'
import './style/index.css'

const app = createApp(App)

registerPlugins(app)

app.use(router, VueAxios, axios).mount('#app')