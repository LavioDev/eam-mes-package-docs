<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useLocale } from '../composables/useLocale'
import { useSidebar } from '../composables/useSidebar'

const route = useRoute()
const { t } = useLocale()
const { isSidebarOpen, isMobile, closeSidebar } = useSidebar()

const submenuOpen = ref({
  eam: true,
  schema: true
})

const toggleSubmenu = (section: 'eam' | 'schema') => {
  submenuOpen.value[section] = !submenuOpen.value[section]
}

const handleNavClick = () => {
  if (isMobile.value) {
    closeSidebar()
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}
</script>

<template>
  <aside 
    class="sidebar-aside" 
    :class="{ 
      'mobile-open': isSidebarOpen && isMobile, 
      'collapsed': !isSidebarOpen && !isMobile 
    }"
  >
    <!-- Mobile header with brand & close button -->
    <div v-if="isMobile" class="sidebar-mobile-header">
      <div class="sidebar-mobile-brand">
        <svg class="favicon-icon" viewBox="0 0 24 24" fill="none" style="width: 18px; height: 18px;" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sidebarMobileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#3b82f6" />
              <stop offset="100%" stop-color="#60a5fa" />
            </linearGradient>
          </defs>
          <rect x="3.5" y="5.5" width="17" height="3" rx="1.5" fill="url(#sidebarMobileGrad)" />
          <rect x="3.5" y="10.5" width="11" height="3" rx="1.5" fill="url(#sidebarMobileGrad)" />
          <rect x="3.5" y="15.5" width="17" height="3" rx="1.5" fill="url(#sidebarMobileGrad)" />
        </svg>
        <span class="sidebar-mobile-title">EAM MES PACKAGE</span>
      </div>
      <button class="sidebar-close-btn" @click="closeSidebar" aria-label="Close sidebar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="close-icon">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Module EAM Collapsible Section -->
    <div class="nav-section">
      <div class="nav-title">{{ t('common.nav.coreBusiness') }}</div>
      <div class="nav-item">
        <button class="nav-btn" :class="{ open: submenuOpen.eam }" @click="toggleSubmenu('eam')">
          <span class="nav-btn-label">
            <svg class="nav-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            {{ t('common.nav.moduleEam') }}
          </span>
          <svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <ul class="nav-submenu" :class="{ open: submenuOpen.eam }">
          <li class="submenu-item">
            <RouterLink to="/docs/overview" class="submenu-link" :class="{ active: route.path.includes('overview') || route.path.includes('architecture') }" @click="handleNavClick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="link-icon">
                <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                <rect x="3" y="14" width="7" height="7" rx="1"></rect>
              </svg>
              {{ t('common.nav.overview') }}
            </RouterLink>
          </li>
          <li class="submenu-item">
            <RouterLink to="/docs/module-engine" class="submenu-link" :class="{ active: route.path.includes('module-engine') }" @click="handleNavClick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="link-icon">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              {{ t('common.nav.moduleEngine') }}
            </RouterLink>
          </li>
          <li class="submenu-item">
            <RouterLink to="/docs/database" class="submenu-link" :class="{ active: route.path.includes('database') || route.path.includes('submodules') }" @click="handleNavClick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="link-icon">
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
              {{ t('common.nav.database') }}
            </RouterLink>
          </li>
          <li class="submenu-item">
            <RouterLink to="/docs/deployment" class="submenu-link" :class="{ active: route.path.includes('deployment') }" @click="handleNavClick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="link-icon">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              {{ t('common.nav.deployment') }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Customization Collapsible Section -->
    <div class="nav-section">
      <div class="nav-title">{{ t('common.nav.schemaCustomization') }}</div>
      <div class="nav-item">
        <button class="nav-btn" :class="{ open: submenuOpen.schema }" @click="toggleSubmenu('schema')">
          <span class="nav-btn-label">
            <svg class="nav-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            {{ t('common.nav.schemaExtension') }}
          </span>
          <svg class="nav-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        
        <ul class="nav-submenu" :class="{ open: submenuOpen.schema }">
          <li class="submenu-item">
            <RouterLink to="/docs/schema/class" class="submenu-link" :class="{ active: route.path.includes('schema/class') }" @click="handleNavClick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="link-icon">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              {{ t('common.nav.schemaClass') }}
            </RouterLink>
          </li>
          <li class="submenu-item">
            <RouterLink to="/docs/schema/api" class="submenu-link" :class="{ active: (route.path.endsWith('/schema/api') || route.path.endsWith('/schema/api/')) && !route.path.includes('api-generator') }" @click="handleNavClick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="link-icon">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              {{ t('common.nav.schemaApi') }}
            </RouterLink>
          </li>
          <li class="submenu-item">
            <RouterLink to="/docs/schema/generator" class="submenu-link" :class="{ active: route.path.includes('schema/generator') }" @click="handleNavClick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="link-icon">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
              </svg>
              {{ t('common.nav.schemaGenerator') }}
            </RouterLink>
          </li>
          <li class="submenu-item">
            <RouterLink to="/docs/schema/api-generator" class="submenu-link" :class="{ active: route.path.includes('schema/api-generator') }" @click="handleNavClick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="link-icon">
                <line x1="4" y1="21" x2="4" y2="14"></line>
                <line x1="4" y1="10" x2="4" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="3"></line>
                <line x1="20" y1="21" x2="20" y2="16"></line>
                <line x1="20" y1="12" x2="20" y2="3"></line>
                <line x1="1" y1="14" x2="7" y2="14"></line>
                <line x1="9" y1="8" x2="15" y2="8"></line>
                <line x1="17" y1="16" x2="23" y2="16"></line>
              </svg>
              {{ t('common.nav.schemaApiGenerator') }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-aside {
  width: 280px;
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  position: fixed;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  padding: 24px 16px 48px;
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s, border-color 0.2s;
  z-index: 50;
  box-sizing: border-box;
  transform: translateX(0);
}

.sidebar-aside.collapsed {
  transform: translateX(-100%);
}

.sidebar-mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-bottom: 18px;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-mobile-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.favicon-icon {
  flex-shrink: 0;
  display: block;
}

.sidebar-mobile-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
}

.sidebar-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0;
  transition: all 0.15s ease;
}

.sidebar-close-btn:hover {
  background-color: var(--bg-hover);
  color: var(--color-accent);
  border-color: var(--border-hover);
}

.close-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 900px) {
  .sidebar-aside {
    top: 64px;
    bottom: 0;
    left: 0;
    z-index: 200;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
    transform: translateX(-100%);
  }

  .sidebar-aside.mobile-open {
    transform: translateX(0);
  }
}

.nav-section {
  margin-bottom: 22px;
}

.nav-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
  padding-left: 8px;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-btn {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  padding: 8px 10px;
  font-size: 13.5px;
  font-weight: 600;
  font-family: var(--font-sans);
  color: var(--text-primary);
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.15s ease;
}

.nav-btn:hover {
  background-color: var(--bg-hover);
}

.nav-btn-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn-icon {
  width: 16px;
  height: 16px;
  color: var(--color-accent);
}

.nav-chevron {
  width: 13px;
  height: 13px;
  transition: transform 0.2s ease;
  stroke: var(--text-muted);
}

.nav-btn.open .nav-chevron {
  transform: rotate(90deg);
  stroke: var(--text-primary);
}

.nav-submenu {
  display: none;
  list-style: none;
  padding-left: 8px;
  margin-top: 4px;
  border-left: 1.5px solid var(--border-color);
  margin-left: 16px;
}

.nav-submenu.open {
  display: block;
}

.submenu-item {
  margin-bottom: 2px;
}

.submenu-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--font-sans);
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 7px;
  transition: all 0.15s ease;
}

.link-icon {
  width: 14px;
  height: 14px;
  opacity: 0.7;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.submenu-link:hover {
  color: var(--text-primary);
  background-color: var(--bg-hover);
}

.submenu-link:hover .link-icon {
  opacity: 1;
  color: var(--color-accent);
}

.submenu-link.active {
  color: var(--color-accent);
  background-color: var(--bg-muted);
  font-weight: 600;
}

.submenu-link.active .link-icon {
  opacity: 1;
  color: var(--color-accent);
}

/* Scrollbar styling for sidebar */
.sidebar-aside::-webkit-scrollbar {
  width: 4px;
}

.sidebar-aside::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

.sidebar-aside::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}
</style>
