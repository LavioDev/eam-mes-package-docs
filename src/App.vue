<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter, useRoute, RouterView } from 'vue-router'
import { theme as antdTheme } from 'ant-design-vue'
import { useTheme } from './composables/useTheme'
import { useLocale } from './composables/useLocale'
import { useSidebar } from './composables/useSidebar'

import HeaderNav from './components/HeaderNav.vue'
import SidebarNav from './components/SidebarNav.vue'

// Extend global window type for typescript
declare global {
  interface Window {
    mermaid?: any;
  }
}

const { isDark } = useTheme()
const { antdLocale, t } = useLocale()
const { isSidebarOpen, isMobile, closeSidebar } = useSidebar()
const router = useRouter()
const route = useRoute()

// Strictly show sidebar only on /docs/... pages
const showSidebar = computed(() => {
  return route.path.startsWith('/docs') && !route.meta.hideSidebar
})

// Page Loading Progress Bar State
const isLoading = ref(false)
const progress = ref(0)
let loadingTimer: any = null

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    isLoading.value = true
    progress.value = 35
    clearInterval(loadingTimer)
    loadingTimer = setInterval(() => {
      if (progress.value < 88) {
        progress.value += Math.random() * 18 + 8
      }
    }, 60)
  }
  next()
})

router.afterEach(() => {
  clearInterval(loadingTimer)
  progress.value = 100
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  setTimeout(() => {
    isLoading.value = false
    progress.value = 0
  }, 150)
})

// Toast Notification State
const showToast = ref(false)
const toastMessage = ref('')

const triggerToast = (msg?: string) => {
  toastMessage.value = msg || t('common.copied')
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

const copySnippet = (id: string) => {
  if (typeof id !== 'string') return
  const element = document.getElementById(id)
  if (!element) return
  const text = element.innerText
  navigator.clipboard.writeText(text).then(() => {
    triggerToast()
  }).catch((err) => {
    console.error('Clipboard copy failed:', err)
  })
}

const copyToClipboard = (text: unknown) => {
  if (typeof text !== 'string') return
  navigator.clipboard.writeText(text).then(() => {
    triggerToast()
  }).catch((err) => {
    console.error('Clipboard copy failed:', err)
  })
}

// Watch route change to trigger Mermaid render dynamically
watch(() => route.path, () => {
  if (isMobile.value) {
    closeSidebar()
  }
  nextTick(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    if (window.mermaid) {
      try {
        const elements = document.querySelectorAll('.mermaid[data-processed]')
        elements.forEach(el => el.removeAttribute('data-processed'))
        window.mermaid.run({
          querySelector: '.mermaid'
        })
      } catch (e) {
        try {
          window.mermaid.init(undefined, document.querySelectorAll('.mermaid'))
        } catch (err) {
          console.error('Mermaid render error:', err)
        }
      }
    }
  })
})
</script>

<template>
  <a-config-provider
    :locale="antdLocale"
    :theme="{
      algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        colorPrimary: '#2563eb',
        colorError: '#dc2626',
        borderRadius: 6
      }
    }"
  >
    <!-- Top Route Loading Progress Bar -->
    <div
      v-if="isLoading"
      class="route-loading-bar"
      :style="{ width: progress + '%' }"
    >
      <div class="route-loading-glow" />
    </div>

    <!-- Header Bar Component -->
    <HeaderNav />

    <!-- Main App Container -->
    <div 
      class="container" 
      :class="{ 
        'landing-container': !showSidebar,
        'sidebar-collapsed': !isSidebarOpen && !isMobile
      }"
    >
        <!-- Mobile Sidebar Backdrop Overlay -->
        <div
          v-if="showSidebar && isSidebarOpen && isMobile"
          class="sidebar-backdrop"
          @click="closeSidebar"
        />

        <!-- Sidebar Component (Only on Docs pages) -->
        <SidebarNav v-if="showSidebar" />

        <!-- Main Dynamic Content Views via Vue Router -->
        <main :class="{ 'landing-main': !showSidebar }">
            <RouterView v-slot="{ Component }">
              <component 
                :is="Component" 
                :key="route.path"
                class="page-reload-view"
                :copy-snippet="copySnippet"
                @copy-text="copyToClipboard" 
              />
            </RouterView>
        </main>
    </div>

    <!-- Toast Notification -->
    <div class="toast" :class="{ show: showToast }">{{ toastMessage }}</div>
  </a-config-provider>
</template>

<style>
/* Top Loading Bar */
.route-loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #2563eb 0%, #38bdf8 60%, #60a5fa 100%);
  z-index: 99999;
  pointer-events: none;
  transition: width 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.8), 0 0 4px rgba(37, 99, 235, 0.9);
}

.route-loading-glow {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 80px;
  box-shadow: 0 0 10px #38bdf8, 0 0 4px #38bdf8;
  opacity: 1;
}

/* Page Reload Transition (Instant swap at top, clean fade-in without stutter) */
.page-reload-view {
  animation: pageReloadFadeIn 0.14s ease-out;
}

@keyframes pageReloadFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.container {
  display: flex;
  margin-top: 64px;
  min-height: calc(100vh - 64px);
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.landing-container {
  display: block;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}

.landing-main {
  margin-left: 0 !important;
  padding: 0 !important;
  max-width: 100% !important;
  width: 100%;
}

.container.sidebar-collapsed main {
  margin-left: 0 !important;
  max-width: 100% !important;
}

.sidebar-backdrop {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 150;
  animation: backdropFadeIn 0.2s ease;
}

@keyframes backdropFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
