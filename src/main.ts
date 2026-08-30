import 'ant-design-vue/dist/reset.css'
import './assets/style.css'

import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import { i18n } from './locales'

// Disable automatic browser scroll restoration on SPA route changes
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

const app = createApp(App)

app.use(Antd)
app.use(router)
app.use(i18n)

router.isReady().then(() => {
  app.mount('#app')
})
