const debug = require('debug')('react-localize:Provider')
import React from 'react'
import i18next from 'i18next'
import {I18nextProvider} from 'react-i18next'
import {IntlProvider, addLocaleData} from 'react-intl'

// Provider component that gives context to the lower level components
class Provider extends React.Component {
  componentWillMount () {
    debug('initialization')
    let data = this.props.translations

    // Build data in the format we need it
    let localeData = []
    let resources = {}
    for (let key in data) {
      resources[key] = {translation: data[key].messages}
      localeData = localeData.concat(data[key].localeData)
    }

    // Load internationalisation data
    addLocaleData(localeData)

    // Load resources
    i18next.init({
      nsSeparator: false,
      keySeparator: false,
      lng: this.props.lang,
      resources: resources,
      parseMissingKeyHandler: (key) => this.resolveMissingKey(key)
    })
  }

  resolveMissingKey (key) {
    if (i18next.language === 'en') {
      return key
    }

    if (this.props.debug === true) {
      return `[[${key}]]`
    }

    return key
  }

  shouldComponentUpdate (nextProps) {
    let shouldUpdate = this.props.lang !== nextProps.lang

    if (shouldUpdate) {
      debug(`changing language to '${nextProps.lang}'`)
      i18next.changeLanguage(nextProps.lang)
      return true
    }

    return false
  }

  render () {
    return (
      <IntlProvider locale={this.props.lang}>
        <I18nextProvider i18n={i18next}>
          {this.props.children}
        </I18nextProvider>
      </IntlProvider>
    )
  }
}

Provider.propTypes = {
  lang: React.PropTypes.string.isRequired,
  translations: React.PropTypes.object.isRequired,
  debug: React.PropTypes.bool,
  children: React.PropTypes.element.isRequired
}

export default Provider
