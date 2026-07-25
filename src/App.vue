<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useRoute, RouterView } from 'vue-router'

import HeaderNav from './components/HeaderNav.vue'
import SidebarNav from './components/SidebarNav.vue'

// Extend global window type for typescript
declare global {
  interface Window {
    mermaid?: any;
  }
}

const route = useRoute()

// Toast Notification State
const showToast = ref(false)
const toastMessage = ref('Đã sao chép!')

const triggerToast = (msg = 'Đã sao chép!') => {
  toastMessage.value = msg
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2000)
}

const copySnippet = (id: string) => {
  const element = document.getElementById(id)
  if (!element) return
  const text = element.innerText
  navigator.clipboard.writeText(text).then(() => {
    triggerToast()
  })
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    triggerToast()
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
  <!-- Header Bar Component -->
  <HeaderNav />

  <!-- Main App Container -->
  <div class="container">
      
      <!-- Sidebar Component -->
      <SidebarNav />

      <!-- Main Dynamic Content Views via Vue Router -->
      <main>
          <RouterView v-slot="{ Component }">
              <component 
                :is="Component" 
                :copy-snippet="copySnippet"
                @copy="copyToClipboard" 
              />
          </RouterView>
      </main>
  </div>

  <!-- Toast Notification -->
  <div class="toast" :class="{ show: showToast }">{{ toastMessage }}</div>
</template>

<style>
/* Reset and style additions specifically for Vue template bindings */
.active-tab {
  border-bottom: 2px solid var(--color-accent);
}
</style>
