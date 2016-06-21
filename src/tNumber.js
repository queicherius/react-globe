const debug = require('debug')('react-globe:tNumber')
import React from 'react'
import {FormattedNumber} from 'react-intl'

// Formats a number
const tNumber = (number, options = {}) => {
  debug(`formatting number: ${number}`)
  return <FormattedNumber value={number} {...options} />
}

export default tNumber
