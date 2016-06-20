# react-localize

> *Easy but feature-rich localizing of react applications, with translations, plurals, dates, ... <br/>
> Localizing an application is not fun, so it shouldn't be hard too.* :relieved:

## Install

```bash
npm install --save react-localize
```

## Features

**[Gettext](https://www.gnu.org/software/gettext/manual/gettext.html)-style translations - the keys are the original english text**<br/>
Actual text in your source code, for example `Hello {{user}}! How are you?`, instead of cryptic translation keys like `homepage-welcome-top-middle`.

**Translation strings can be interpolated with values, including other react elements**<br/>
Easy for you, because you don't have to join strings together. Easy for the translators, because they can see and change where values will go in the sentences without programming experience.

**Localization support - plurals, numbers and dates**<br/>
Number & date formatting as well as plurals will be synchronized with the translations for full localization support.

**Translation strings can be extracted automatically**<br/>
Generate gettext `.pot` template files directly out of your source code, no manual work neccessary.

**Translation files can be imported directly**<br/>
If you are using [webpack](https://github.com/webpack/webpack), you can load your `.po` translation files directly in your source code, without converting them beforehand.

**Changing language without page reload**<br/>
Swap the language and your whole application will re-render in the new language, without having to reload the page.

**Marking missing translations**<br/>
In development mode, you can highlight which elements are translated and which ones are missing a translation.

**["Pure render"](https://facebook.github.io/react/docs/shallow-compare.html) components for performant runtime-translations**<br/>
Components should always render the same, given the same `state` and `props`. This is the case if you use [Redux](http://redux.js.org/) for example! Here it is used to reduce translation overhead. *You can opt out of this, but it is highly discouraged*.

## Usage

// TODO

## Licence

MIT
