import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en.json'
import es from '../locales/es.json'
import fr from '../locales/fr.json'

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
]

function initialLanguage() {
  try {
    const saved = localStorage.getItem('lang')
    if (LANGUAGES.some((l) => l.code === saved)) return saved
  } catch {
    // storage unavailable
  }
  return 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    fr: { translation: fr },
  },
  lng: initialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

const syncHtmlLang = (lng) => {
  document.documentElement.lang = lng
}
syncHtmlLang(i18n.language)
i18n.on('languageChanged', syncHtmlLang)

export default i18n
