import i18next from 'i18next'
import t from './t'

// Formats a pluralized string
const tPlural = (singular, plural, options = {}) => {
  if (!Number.isInteger(options.count)) {
    console.error('[react-globe] tPlural expects a integer "count" option')
    return null
  }

  // Manually generate english pluralisation based on gettext style
  if (i18next.language === 'en') {
    return englishPlural(singular, plural, options)
  }

  // The translation function figures out plurals for us
  return t(singular, options)
}

const englishPlural = (singular, plural, options) => {
  if (options.count === 1) {
    return t(singular, options)
  }

  return t(plural, options)
}

export default tPlural
