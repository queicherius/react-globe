const debug = require('debug')('react-globe:t')
import React from 'react'
import i18next from 'i18next'
import {Interpolate} from 'react-i18next'

// Regular expression for matching interpolated values
const REGEX = /\{\{(.+?)\}\}/g

// Translate normal messages and interpolate strings and react elements inside
const t = (string, options = {}) => {
  debug(`translating string: ${string}`)

  if (options.react === true) {
    return (
      <Interpolate
        i18nKey={string}
        regexp={REGEX}
        options={{count: options.count}}
        {...options}
      />
    )
  }

  return i18next.t(string, options)
}

export default t
