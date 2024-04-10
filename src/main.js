import './index.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Popper from "vue3-popper";

const app = createApp(App)

// eslint-disable-next-line vue/multi-word-component-names
app.component("Popper", Popper);
app.mount('#app')
