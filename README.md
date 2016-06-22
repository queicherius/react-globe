# react-globe

> *Painless localising of React applications with translations, plurals, numbers, dates and times.* 🌍<br/>
> *Internationalisation is not fun, so it should be easy.* 😌

- [Gettext](https://www.gnu.org/software/gettext/manual/gettext.html) translation support (keys are the original English text)
- Translation messages can be interpolated with values, including React components
- Internationalisation support for plurals, numbers, dates and times
- Translation messages can be extracted out of the source code automatically
- Translation files can be imported directly via webpack
- Changing language without page reload
- Marking missing translations
- Performant runtime that minimizes re-translating

## Usage

- [Install the module](#install-the-module)
- [Setup the Provider](#setup-the-provider)
  - [Base setup](#base-setup)
  - [Importing your messages](#importing-your-messages)
  - [Example setup with Redux](#example-setup-with-redux)
- [Wrap your translated components](#wrap-your-translated-components)
- [Translate messages](#translate-messages)
  - [Translate a simple message](#translate-a-simple-message)
  - [Interpolate a value](#interpolate-a-value)
  - [Interpolate a React component](#interpolate-a-react-component)
  - [Translate a pluralized string](#translate-a-pluralized-string)
- [Format numbers, dates and times](#format-numbers--dates-and-times)
  - [Format a number](#format-a-number)
  - [Format a date / time](#format-a-date--time)
  - [Format a relative datetime](#format-a-relative-datetime)
- [Extract your messages](#extract-your-messages)
- [Highlight missing messages](#highlight-missing-messages)

### Install the module

```bash
npm install --save react-localize react-intl
```

### Setup the Provider

#### Base setup

First off, you have to wrap your application in the `Provider` component. This does the bootstrapping of the translations and ensures that all translated components are synchronized with the specified language.

```js
import GlobeProvider from 'react-globe'

// Define which language the application uses. You can wrap this 
// provider in a stateful component, that sets the "lang" prop or
// use something like redux (see below) for state management. If this
// value changes, the whole application rerenders on the fly
let lang = 'en'

// Define your translation messages here as well as 
// import the needed localeData for the language
import deLocaleData from 'react-intl/locale-data/de'
const translations = {
  de: {
    localeData: deLocaleData,
    messages: {
      'Message will be translated': 'Nachricht wird übersetzt',
      // ...
    }
  }
}

// (Optional) Specify the debug mode. If set to "true", 
// missing keys in translated languages will be highlighted
// with square brackets: [[This text is missing]]
const debug = true

// Wrap your application
React.render(
  <GlobeProvider 
    lang={lang} 
    translations={translations} 
    debug={debug}>
    // router / application container / ...
  </GlobeProvider>,
  document.getElementById('root')
)
```

#### Importing your messages

Since it is very cumbersome to maintain a list of messages yourself or convert them from `po` files manually, you can import `po` files directly via [webpack](https://github.com/webpack/webpack). First you need to install the loader:

```sh
npm install --save i18next-po-loader
```

Then you need to include the loader in your webpack config:

```js
config.module.loaders = config.module.loaders
  .concat([{test: /\.po$/, loaders: ['i18next-po-loader']}])
```

Now you can just import the messages from `po` files, which will automatically convert them into the format that is expected:

```js
import deMessages from './translations/de.po'
import deLocaleData from 'react-intl/locale-data/de'
const translations = {
  de: {messages: deMessages, localeData: deLocaleData}
}
```

> **Note:** If you wish to import your messages manually, make sure to follow the [i18next message format](http://i18next.com/translate/interpolation/), especially for the naming of plural keys in different languages.

#### Example setup with Redux

```js
import {connect} from 'react-redux'
import GlobeProvider from 'react-globe'

import deMessages from './translations/de.po'
import deLocaleData from 'react-intl/locale-data/de'

// Load the translation data
const translations = {
  de: {messages: deMessages, localeData: deLocaleData}
}

// Use a redux key to set the language state
const mapStateToProps = (state) => ({
  lang: state.settings.language,
  translations: translations,
  debug: true
})

export default connect(mapStateToProps)(GlobeProvider)
```

This wraps the `GlobeProvider` in a container, which you can use like this:

```js
render(
  <Provider store={store}>
    <WrappedGlobeProvider>
      <Routes history={history} />
    </WrappedGlobeProvider>
  </Provider>,
  document.getElementById('root')
)
```

### Wrap your translated components

To ensure that all translated components are in sync and don't get rerendered unnecessary, you have to wrap all your translated components in a higher order component. 

```js
import {translate} from 'react-globe'

class MyComponent extends React.Component {
  // ...
}

export default translate(MyComponent)
```

> **Note:** This will make your component a [pure component](https://facebook.github.io/react/docs/shallow-compare.html), which means you have to ensure that it renders the same result given the same state and props.

> **Note:** You can turn off the "pure rendering" part of the translate wrapper off by passing `false` as the second argument. This will re-translate all of your messages whenever the component containing the translated component updates - only use this when necessary!

### Translate messages

#### Translate a simple message

```js
import {t} from 'react-globe'
t('Message will be translated')
// -> 'Message will be translated' for 'en'
// -> 'Nachricht wird übersetzt' for 'de'

<span>{t('Message in a React component will be translated')}</span>
```

#### Interpolate a value

You can interpolate any values that can be converted to a string in the translated messages.

```js
import {t} from 'react-globe'
t('This {{value}} will be interpolated. This one too: {{num}}',
  {value: 'text', num: 42})
// -> 'This text will be interpolated. This one too: 42'
```

#### Interpolate a React component

```js
import {t} from 'react-globe'
const user = <strong>Bob</strong>
t('Hello {{user}}! How are you?', {react: true, user: user})
// -> <span>Hello <strong>Bob</strong>! How are you?</span>
```

> **Note:** This will return a `<span>` element, whereas the other methods just return a string. You can see the [full list of options you can pass as a second argument here](https://github.com/i18next/react-i18next#interpolate-component).

#### Translate a pluralized string

You can translate a plural with an optional message if the count is zero. This will use the correct pluralisation rules for the selected language.

```js
import {tPlural} from 'react-globe'
tPlural({
  zero: 'This is an optional string is the count is zero',
  one: 'The count is one!',
  many: 'The count is {{count}}!'
}, {
  count: 1
})
```

> **Note:** You can also interpolate values and React components in the plural method, by setting the options like described above.

### Format numbers, dates and times

> **Note:** The formatters return *React components*, not strings, so if you want to use them inside translated strings, make sure you set the option to [interpolate a React component](#interpolate-a-react-component).

#### Format a number

```js
import {tNumber} from 'react-globe'
tNumber(12308.32490, optionalOptions)
```

The options follow the specification for date formatting from [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat).

#### Format a date / time

```js
import {tDate} from 'react-globe'
tDate(new Date(), optionalOptions)
```

The options follow the specification for number formatting from [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).

#### Format a relative datetime

```js
import {tDate} from 'react-globe'
tDate(new Date(), {relative: true})
// -> 'now' / '10 seconds ago' / 'in 2 years'
```

### Extract your messages

To extract the messages from your source code you can install [react-globe-cli](https://github.com/queicherius/react-globe-cli):

```bash
npm install --save-dev react-globe-cli

# Go through all the files and extract the messages into the output file
react-globe-cli --files='./src/**/*.js' --output='templates.pot'
```

> **Note:** Make sure you are running this on unminified source code, since it requires the `t` and `tPlural` function calls to keep their names. It should be fine with parsing es2015 and jsx code, but if you are using bleeding edge (e.g. the `stage-0` babel plugin) you will have to pre-compile that.


### Highlight missing messages

When setting the debug flag in the [provider](#setup-the-provider) missing messages will be highlighted with brackets around them `[[Some missing string]]`. If you want to highlight them more obviously, you can use the following code as a bookmarklet show all missing translation messages with a orange background:

```js
javascript:for(var elements=document.getElementsByTagName("*"),i=0;i!=elements.length;i++){var element=elements[i];element.innerHTML.match(/^\[\[.*\]\]$/)&&(element.style+=";background-color:orange !important")}
```

## Troubleshooting

> It feels laggy when I have a lot of components.

1. Make sure you wrapped all your translated components with the [higher order component](#wrap-your-translated-components) and they are small, [pure components](https://facebook.github.io/react/docs/shallow-compare.html) with as little state/props as possible. This is the single most impactful improvement you can make. (And it's the easiest mistake to make).
2. If you are rendering **a lot** of components, React in the development build may be slow itself, so make sure you are using the [production build](https://facebook.github.io/react/downloads.html#development-vs.-production-builds).
3. If nothing else helps, this module uses [debug](https://github.com/visionmedia/debug) so you can inspect what it does in your browser's console after setting `localStorage.debug = 'react-globe:*'`

> My component doesn't update anymore.

Make sure that the component wrapped with the [higher order component](#wrap-your-translated-components) is a [pure component](https://facebook.github.io/react/docs/shallow-compare.html) or turn the pure rendering off by passing `false` as the second argument to `translate`.

## Licence

MIT
