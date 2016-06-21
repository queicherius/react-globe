const debug = require('debug')('react-globe:translate')
import {translate as _translate} from 'react-i18next'
import pure from 'recompose/pure'

// Export a higher order component wrapper, that handles
// synchronising translations and shallow comparison for performance
const translate = (element, pureWrapper = true) => {
  debug('wrapping component')

  if (pureWrapper) {
    return _translate()(pure(element))
  }

  return _translate()(element)
}

export default translate
