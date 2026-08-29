import { createI18n } from 'vue-i18n'
import viVN from 'ant-design-vue/es/locale/vi_VN'
import enUS from 'ant-design-vue/es/locale/en_US'

import viCommon from './vi/common'
import viOverview from './vi/overview'
import viEngine from './vi/engine'
import viDatabase from './vi/database'
import viDeploy from './vi/deploy'
import viApis from './vi/apis'
import viSchema from './vi/schema'
import viLanding from './vi/landing'

import enCommon from './en/common'
import enOverview from './en/overview'
import enEngine from './en/engine'
import enDatabase from './en/database'
import enDeploy from './en/deploy'
import enApis from './en/apis'
import enSchema from './en/schema'
import enLanding from './en/landing'

export type SupportedLocale = 'vi' | 'en'
export const LOCALE_KEY = 'eam_docs_locale'

const getInitialLocale = (): SupportedLocale => {
  const saved = localStorage.getItem(LOCALE_KEY) as SupportedLocale | null
  if (saved === 'vi' || saved === 'en') {
    return saved
  }
  return 'en'
}

export const messages = {
  vi: {
    common: viCommon,
    overview: viOverview,
    engine: viEngine,
    database: viDatabase,
    deploy: viDeploy,
    apis: viApis,
    schema: viSchema,
    landing: viLanding
  },
  en: {
    common: enCommon,
    overview: enOverview,
    engine: enEngine,
    database: enDatabase,
    deploy: enDeploy,
    apis: enApis,
    schema: enSchema,
    landing: enLanding
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages
})

export const getAntdLocale = (locale: string) => {
  return locale === 'en' ? enUS : viVN
}

export const updateDocumentMeta = (locale: string) => {
  document.documentElement.setAttribute('lang', locale)
  document.title = locale === 'en' 
    ? 'Technical Documentation - EAM MES Package' 
    : 'Tài liệu kỹ thuật - EAM MES Package'
}

// Initial sync
updateDocumentMeta(i18n.global.locale.value)

export default i18n
