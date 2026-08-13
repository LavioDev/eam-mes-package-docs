<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

const submenuOpen = ref({
  eam: true,
  schema: true
})

const toggleSubmenu = (section: 'eam' | 'schema') => {
  submenuOpen.value[section] = !submenuOpen.value[section]
}
</script>

<template>
  <aside>
      <!-- Module EAM Collapsible Section -->
      <div class="nav-section">
          <div class="nav-title">Nghiệp vụ cốt lõi</div>
          <div class="nav-item">
              <button class="nav-btn" :class="{ open: submenuOpen.eam }" @click="toggleSubmenu('eam')">
                  <span>Module EAM</span>
                  <svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
              </button>
              <ul class="nav-submenu" :class="{ open: submenuOpen.eam }">
                  <li class="submenu-item">
                      <RouterLink to="/architecture" class="submenu-link" :class="{ active: route.path === '/architecture' || route.path === '/' }">Thiết kế &amp; kiến trúc</RouterLink>
                  </li>
                  <li class="submenu-item">
                      <RouterLink to="/deployment" class="submenu-link" :class="{ active: route.path === '/deployment' }">Quy trình triển khai</RouterLink>
                  </li>

              </ul>
          </div>
      </div>

      <!-- Customization Collapsible Section -->
      <div class="nav-section">
          <div class="nav-title">Tùy biến cấu trúc</div>
          <div class="nav-item">
              <button class="nav-btn" :class="{ open: submenuOpen.schema }" @click="toggleSubmenu('schema')">
                  <span>Mở rộng Schema</span>
                  <svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
              </button>
              <ul class="nav-submenu" :class="{ open: submenuOpen.schema }">
                  <li class="submenu-item">
                      <RouterLink to="/schema/class" class="submenu-link" :class="{ active: route.path === '/schema/class' }">Mở rộng qua Class PHP</RouterLink>
                  </li>
                  <li class="submenu-item">
                      <RouterLink to="/schema/api" class="submenu-link" :class="{ active: route.path === '/schema/api' }">Mở rộng qua API Endpoint</RouterLink>
                  </li>
                  <li class="submenu-item">
                      <RouterLink to="/schema/generator" class="submenu-link" :class="{ active: route.path === '/schema/generator' }">Trình sinh Code</RouterLink>
                  </li>
                  <li class="submenu-item">
                      <RouterLink to="/schema/api-generator" class="submenu-link" :class="{ active: route.path === '/schema/api-generator' }">Trình sinh qua API</RouterLink>
                  </li>
              </ul>
          </div>
      </div>
  </aside>
</template>
