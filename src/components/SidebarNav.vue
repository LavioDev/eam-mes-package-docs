<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useLocale } from '../composables/useLocale'

const route = useRoute()
const { t } = useLocale()

const submenuOpen = ref({
  eam: true,
  schema: true
})

const toggleSubmenu = (section: 'eam' | 'schema') => {
  submenuOpen.value[section] = !submenuOpen.value[section]
}
</script>

<template>
  <aside class="sidebar-aside">
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
            <RouterLink to="/overview" class="submenu-link" :class="{ active: route.path === '/overview' || route.path === '/architecture' }">
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
            <RouterLink to="/module-engine" class="submenu-link" :class="{ active: route.path === '/module-engine' }">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="link-icon">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              {{ t('common.nav.moduleEngine') }}
            </RouterLink>
          </li>
          <li class="submenu-item">
            <RouterLink to="/database" class="submenu-link" :class="{ active: route.path === '/database' || route.path === '/submodules' }">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="link-icon">
                <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
              </svg>
              {{ t('common.nav.database') }}
            </RouterLink>
          </li>
          <li class="submenu-item">
            <RouterLink to="/deployment" class="submenu-link" :class="{ active: route.path === '/deployment' }">
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
            <RouterLink to="/schema/class" class="submenu-link" :class="{ active: route.path === '/schema/class' }">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="link-icon">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              {{ t('common.nav.schemaClass') }}
            </RouterLink>
          </li>
          <li class="submenu-item">
            <RouterLink to="/schema/api" class="submenu-link" :class="{ active: route.path === '/schema/api' }">
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
            <RouterLink to="/schema/generator" class="submenu-link" :class="{ active: route.path === '/schema/generator' }">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="link-icon">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
              </svg>
              {{ t('common.nav.schemaGenerator') }}
            </RouterLink>
          </li>
          <li class="submenu-item">
            <RouterLink to="/schema/api-generator" class="submenu-link" :class="{ active: route.path === '/schema/api-generator' }">
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
  transition: background-color 0.2s, border-color 0.2s;
  z-index: 50;
  box-sizing: border-box;
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
