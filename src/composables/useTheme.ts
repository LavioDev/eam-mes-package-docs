import { ref, computed } from 'vue'

export type Theme = 'light' | 'dark'

const THEME_KEY = 'eam_docs_theme'

// Read saved preference or detect system preference
const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem(THEME_KEY) as Theme | null
  if (saved === 'light' || saved === 'dark') {
    return saved
  }
  return 'dark'
}

const currentTheme = ref<Theme>(getInitialTheme())

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem(THEME_KEY, theme)
}

// Initial application
applyTheme(currentTheme.value)

export function useTheme() {
  const isDark = computed(() => currentTheme.value === 'dark')

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
    applyTheme(currentTheme.value)
  }

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    applyTheme(theme)
  }

  return {
    theme: currentTheme,
    isDark,
    toggleTheme,
    setTheme
  }
}
