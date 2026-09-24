import { useTranslation } from 'react-i18next'
import LanguageToggle from '../../components/LanguageToggle'

function LoginPage() {
  const { t } = useTranslation()

  return (
    <section>
      <LanguageToggle />
      <h1>{t('login')}</h1>
    </section>
  )
}

export default LoginPage
