import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALE_KEY, getAntdLocale, updateDocumentMeta, type SupportedLocale } from '../locales'

export function useLocale() {
  const { locale, t } = useI18n()

  const currentLocale = computed(() => locale.value as SupportedLocale)
  const isEn = computed(() => locale.value === 'en')
  const antdLocale = computed(() => getAntdLocale(locale.value))

  const setLocale = (newLocale: SupportedLocale) => {
    locale.value = newLocale
    localStorage.setItem(LOCALE_KEY, newLocale)
    updateDocumentMeta(newLocale)
  }

  const toggleLocale = () => {
    const target = locale.value === 'vi' ? 'en' : 'vi'
    setLocale(target)
  }

  return {
    locale: currentLocale,
    isEn,
    antdLocale,
    setLocale,
    toggleLocale,
    t
  }
}
