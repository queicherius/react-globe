const debug = require('debug')('react-localize:translate')
import {translate as _translate} from 'react-i18next'
import pure from 'recompose/pure'

// Export a higher order component wrapper, that handles
// synchronising translations and shallow comparison for performance
const translate = (element, pureWrapper = true) => {
  debug('wrapping component')

  if (pureWrapper) {
    return pure(_translate()(element))
  }

  return _translate()(element)
}

export default translate
