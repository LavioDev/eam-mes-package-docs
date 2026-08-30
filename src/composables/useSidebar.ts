import { ref } from 'vue'

const isMobile = ref(typeof window !== 'undefined' ? window.innerWidth < 900 : false)
// Desktop: open by default (true); Mobile: closed by default (false)
const isSidebarOpen = ref(typeof window !== 'undefined' ? window.innerWidth >= 900 : true)

if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    const mobile = window.innerWidth < 900
    if (mobile !== isMobile.value) {
      isMobile.value = mobile
      // On switch from mobile to desktop, open; on switch to mobile, close
      isSidebarOpen.value = !mobile
    }
  })
}

export function useSidebar() {
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
  }

  const openSidebar = () => {
    isSidebarOpen.value = true
  }

  const closeSidebar = () => {
    isSidebarOpen.value = false
  }

  return {
    isSidebarOpen,
    isMobile,
    toggleSidebar,
    openSidebar,
    closeSidebar
  }
}
