import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const useI18n = (lang?: string) => {
  const { i18n } = useTranslation()

  useEffect(() => {
    if (lang) i18n.changeLanguage(lang)
  }, [lang])
}
