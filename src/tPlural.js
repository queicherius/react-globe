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

  if (options.count === 0) {
    return handleZero(messages, options)
  }

  // Manually generate english pluralisation based on gettext style
  if (i18next.language === 'en' || !i18next.exists(messages.one, options)) {
    return englishPlural(messages, options)
  }

  // The translation function figures out plurals for us
  return t(messages.one, options)
}

const handleZero = (messages, options) => {
  // When the language is no english, fallback to the 'one' string,
  // because the "t" translation function will pick the correct plural that way
  var fallback = i18next.language === 'en' || !i18next.exists(messages.one, options)
    ? messages.many
    : messages.one

  return t(messages.zero || fallback, options)
}

const englishPlural = (messages, options) => {
  if (options.count === 1) {
    return t(messages.one, options)
  }

  return t(messages.many, options)
}

export default tPlural
