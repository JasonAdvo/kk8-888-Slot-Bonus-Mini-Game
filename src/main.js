import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n';
import 'material-design-icons-iconfont/dist/material-design-icons.css'



createApp(App).use(i18n).mount('#app');
