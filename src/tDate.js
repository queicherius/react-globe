const debug = require('debug')('react-localize:tDate')
import React from 'react'
import {FormattedDate, FormattedRelative} from 'react-intl'

// Formats a number
const tDate = (date, options = {}) => {
  debug(`formatting date: ${date}`)

  if (options.relative === true) {
    return <FormattedRelative value={date} {...options} />
  }

  return <FormattedDate value={date} {...options} />
}

export default tDate
