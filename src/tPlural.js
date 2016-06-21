import i18next from 'i18next'
import t from './t'

// Formats a pluralized string
const tPlural = (messages, options = {}) => {
  if (!Number.isInteger(options.count)) {
    console.error('[react-globe] tPlural requires a integer "count" option')
    return null
  }

  if (!messages.one || !messages.many) {
    console.error('[react-globe] tPlural requires a "one" and "many" strings')
    return null
  }

  // Manually generate english pluralisation based on gettext style
  if (i18next.language === 'en' || !i18next.exists(messages.one)) {
    return englishPlural(messages, options)
  }

  // Return an extra string for 0 counts
  if (options.count === 0) {
    return t(messages.zero || messages.one, options)
  }

  // The translation function figures out plurals for us
  return t(messages.one, options)
}

const englishPlural = (messages, options) => {
  if (options.count === 0) {
    return t(messages.zero || messages.many, options)
  }

  if (options.count === 1) {
    return t(messages.one, options)
  }

  return t(messages.many, options)
}

export default tPlural
