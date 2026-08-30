<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import { useLocale } from '../composables/useLocale'
import { useSidebar } from '../composables/useSidebar'

const route = useRoute()
const { isDark, toggleTheme } = useTheme()
const { isEn, toggleLocale, t } = useLocale()
const { isSidebarOpen, toggleSidebar } = useSidebar()

const isDocsActive = computed(() => !route.meta.hideSidebar)
</script>

<template>
  <header class="main-header">
    <div class="header-brand">
      <!-- Sidebar Toggle Button (Only on docs screens) -->
      <button
        v-if="isDocsActive"
        type="button"
        class="sidebar-toggle-btn"
        :class="{ active: isSidebarOpen }"
        :title="isSidebarOpen ? t('common.sidebarToggle.collapse') : t('common.sidebarToggle.open')"
        :aria-label="isSidebarOpen ? t('common.sidebarToggle.collapse') : t('common.sidebarToggle.open')"
        @click="toggleSidebar"
      >
        <svg class="favicon-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="eamToggleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#3b82f6" />
              <stop offset="100%" stop-color="#60a5fa" />
            </linearGradient>
          </defs>
          <rect x="3.5" y="5.5" width="17" height="3" rx="1.5" fill="url(#eamToggleGrad)" />
          <rect x="3.5" y="10.5" width="11" height="3" rx="1.5" fill="url(#eamToggleGrad)" />
          <rect x="3.5" y="15.5" width="17" height="3" rx="1.5" fill="url(#eamToggleGrad)" />
        </svg>
      </button>

      <RouterLink to="/" class="brand-link">
        <!-- Static Favicon Icon on non-docs screens (Landing page) -->
        <svg v-if="!isDocsActive" class="favicon-icon brand-static-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="eamBrandGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#3b82f6" />
              <stop offset="100%" stop-color="#60a5fa" />
            </linearGradient>
          </defs>
          <rect x="3.5" y="5.5" width="17" height="3" rx="1.5" fill="url(#eamBrandGrad)" />
          <rect x="3.5" y="10.5" width="11" height="3" rx="1.5" fill="url(#eamBrandGrad)" />
          <rect x="3.5" y="15.5" width="17" height="3" rx="1.5" fill="url(#eamBrandGrad)" />
        </svg>
        <span class="brand-name">EAM MES PACKAGE</span>
      </RouterLink>
    </div>
    
    <div class="header-actions">
      <!-- Docs Navigation Link -->
      <RouterLink 
        to="/docs/overview" 
        class="header-nav-btn docs-btn"
        :class="{ active: isDocsActive }"
        :title="isEn ? 'Documentation' : 'Tài liệu kỹ thuật'"
      >
        <svg class="nav-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
        </svg>
        <span>Docs</span>
      </RouterLink>

      <!-- Language Switcher Button -->
      <button
        type="button"
        class="lang-toggle-btn"
        :title="t('common.langToggle.title')"
        @click="toggleLocale"
      >
        <svg class="lang-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        <span class="lang-text">{{ isEn ? 'EN' : 'VI' }}</span>
      </button>

      <!-- Dark / Light Theme Toggle Button -->
      <button 
        type="button" 
        class="theme-toggle-btn" 
        :title="isDark ? t('common.themeToggle.toLight') : t('common.themeToggle.toDark')"
        @click="toggleTheme"
      >
        <!-- Sun Icon (when Dark mode is active) -->
        <svg v-if="isDark" class="theme-icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="12" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>

        <!-- Moon Icon (when Light mode is active) -->
        <svg v-else class="theme-icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>

      <!-- GitHub Link -->
      <a href="https://github.com/LavioDev/eam-mes-package" target="_blank" class="github-btn" title="GitHub Repository">
        <svg class="github-icon" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        <span class="github-text">GitHub</span>
      </a>
    </div>
  </header>
</template>

<style scoped>
.main-header {
  height: 64px;
  background-color: var(--bg-header);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px 0 24px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background-color 0.2s, border-color 0.2s;
  max-width: 100vw;
  box-sizing: border-box;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
  padding: 0;
}

.sidebar-toggle-btn:hover {
  background-color: var(--bg-hover);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.sidebar-toggle-btn.active {
  background-color: rgba(37, 99, 235, 0.08);
  border-color: rgba(37, 99, 235, 0.35);
}

.favicon-icon {
  width: 18px;
  height: 18px;
  display: block;
}

.brand-link {
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-name {
  font-size: 16.5px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  transition: color 0.15s ease;
  white-space: nowrap;
}

.brand-link:hover .brand-name {
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .main-header {
    padding: 0 12px;
  }
  .brand-name {
    display: none;
  }
  .header-actions {
    gap: 6px;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-nav-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  height: 34px;
  border-radius: 3px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 13px;
  font-weight: 650;
  transition: all 0.15s ease;
}

.header-nav-btn:hover {
  background-color: var(--bg-hover);
  color: var(--color-accent);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.header-nav-btn.active {
  background-color: rgba(37, 99, 235, 0.1);
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.nav-btn-icon {
  width: 15px;
  height: 15px;
}

.lang-toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  height: 34px;
  border-radius: 3px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 12.5px;
  font-weight: 700;
  transition: all 0.15s ease;
}

.lang-toggle-btn:hover {
  background-color: var(--bg-hover);
  color: var(--color-accent);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.lang-icon {
  width: 15px;
  height: 15px;
}

.lang-text {
  letter-spacing: 0.04em;
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 3px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
}

.theme-toggle-btn:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.theme-icon {
  width: 17px;
  height: 17px;
  transition: transform 0.2s ease;
}

.sun-icon {
  color: #f59e0b;
}

.moon-icon {
  color: #64748b;
}

.theme-toggle-btn:hover .theme-icon {
  transform: rotate(15deg);
}

.github-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  height: 34px;
  border-radius: 3px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.15s ease;
}

.github-btn:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.github-icon {
  width: 16px;
  height: 16px;
}

@media (max-width: 640px) {
  .github-text {
    display: none;
  }
}
</style>
