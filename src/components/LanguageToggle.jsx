import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'

function LanguageToggle() {
  const { i18n, t } = useTranslation()

  const toggleLanguage = () => {
    const nextLanguage = i18n.language.startsWith('ar') ? 'en' : 'ar'
    i18n.changeLanguage(nextLanguage)
  }

  return (
    <button type="button" onClick={toggleLanguage}>
      <Languages size={16} aria-hidden="true" />
      {t('language_toggle')}
    </button>
  )
}

export default LanguageToggle
