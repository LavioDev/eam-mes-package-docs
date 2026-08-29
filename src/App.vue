<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import { theme as antdTheme } from 'ant-design-vue'
import { useTheme } from './composables/useTheme'
import { useLocale } from './composables/useLocale'

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
const route = useRoute()

// Check whether to show sidebar (hidden on pages with hideSidebar meta)
const showSidebar = computed(() => {
  return !route.meta.hideSidebar
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
  nextTick(() => {
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
}, { immediate: true })
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
    <!-- Header Bar Component -->
    <HeaderNav />

    <!-- Main App Container -->
    <div class="container" :class="{ 'landing-container': !showSidebar }">
        
        <!-- Sidebar Component (Only on Docs pages) -->
        <SidebarNav v-if="showSidebar" />

        <!-- Main Dynamic Content Views via Vue Router -->
        <main :class="{ 'landing-main': !showSidebar }">
            <RouterView v-slot="{ Component }">
                <component 
                  :is="Component" 
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
.container {
  display: flex;
  margin-top: 64px;
  min-height: calc(100vh - 64px);
  width: 100%;
}

.landing-container {
  display: block;
  width: 100%;
}

.landing-main {
  margin-left: 0 !important;
  padding: 0 !important;
  max-width: 100% !important;
  width: 100%;
}
</style>
