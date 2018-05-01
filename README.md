# react-i18nify-mobx
MobX bindings for `react-i18nify`, providing simple translation and localization components for React+MobX applications.

*Note:* This library is still in a pre-release stage.

*Note:* If you're not using MobX, feel free to just use [`react-i18nify`](https://github.com/JSxMachina/react-i18nify) instead.

[![NPM version][version-image]][npm-url] [![Downloads][downloads-image]][npm-url]

## Table of contents

* [Installation](#installation)
* [Getting started](#getting-started)
* [Components](#components)
* [Helpers](#helpers)
* [API reference](#api-reference)

## Installation

Install by using npm:

```
npm i --save react-i18nify-mobx@next
```

## Getting started

Start by setting the translations and locale to be used, by calling the provided actions of the `i18nStore`:

```javascript
import { i18nStore } from 'react-i18nify-mobx';

i18nStore.setTranslations({
  en: {
    application: {
      title: 'Awesome app with i18n!',
      hello: 'Hello, %{name}!'
    },
    date: {
      long: 'MMMM Do, YYYY'
    },
    export: 'Export %{count} items',
    export_0: 'Nothing to export',
    export_1: 'Export %{count} item',
    two_lines: <div>Line 1<br />Line 2<div>
  },
  nl: {
    application: {
      title: 'Toffe app met i18n!',
      hello: 'Hallo, %{name}!'
    },
    date: {
      long: 'D MMMM YYYY'
    },
    export: 'Exporteer %{count} dingen',
    export_0: 'Niks te exporteren',
    export_1: 'Exporteer %{count} ding',
    two_lines: <div>Regel 1<br />Regel 2</div>
  }
});

i18nStore.setLocale('nl');
```

As the `i18nStore` is a MobX store, it can be inserted into your app and used in your React components:

```JavaScript
import { i18nStore } from 'react-i18nify-mobx';

<Provider i18nStore={i18nStore}>
  <App />
</Provider>
```

To learn more about inserting stores in React apps, please have a look at [`mobx-react`](https://github.com/mobxjs/mobx-react).

Now you're all set up to unleash the power of `react-i18nify-mobx`!

## Components

The easiest way to translate or localize in your React application is by using the `Translate` and `Localize` components:

```javascript
import { Translate, Localize } from 'react-i18nify-mobx';

<Translate value="application.title" />
  // => Toffe app met i18n!
<Translate value="application.hello" name="Aad" />
  // => Hallo, Aad!
<Translate value="export" count={1} />
  // => Exporteer 1 ding
<Translate value="export" count={2} />
  // => Exporteer 2 dingen
<Translate value="two_lines" />
  // => <div>Regel 1<br />Regel 2</div>

<Localize value="07-2016-04" dateFormat="date.long" parseFormat="DD-YYYY-MM" />
  // => 7 april 2016
<Localize value="2015-09-03" dateFormat="date.long" />
  // => 3 september 2015
<Localize value={10/3} options={{style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2}} />
  // => € 3,33
```

## Helpers

If for some reason, you cannot use the components, you can use the `t` and `l` helpers instead:

```javascript
import { t, l } from 'react-i18nify-mobx';

t('application.title');
  // => Toffe app met i18n!
t('application.hello', {name: 'Aad'});
  // => Hallo, Aad!'
t('export', {count: 0});
  // => Niks te exporteren
t('application.unknown_translation');
  // => unknown_translation
t('application', {name: 'Aad'});
  // => {hello: 'Hallo, Aad!', title: 'Toffe app met i18n!'}

l(1385856000000, { dateFormat: 'date.long' });
  // => 1 december 2013
l(Math.PI, { maximumFractionDigits: 2 });
  // => 3,14
```

If you want these helpers to be re-rendered automatically when the locale or translations change, you have to wrap them in a `<I18n>` component using its `render` prop:

```javascript
import { I18n, t } from 'react-i18nify-mobx';

<I18n render={() => <input placeholder={t("application.title")} />} />
```

## API Reference

### `i18nStore`

MobX store for storing the locale and translations, with the following observables and actions:

* `@observable locale` (string)

Observable which holds the currently used locale.

* `@observable translations` (object)

Observable which holds the currently used translations.

* `@action setLocale(string)`

Action to set the used locale.

* `@action setTranslations(object)`

Action to set the used translations.

### `<Translate>`

React translate component, with the following props:

* `value` (string)

The translation key to translate.

* Other props

All other provided props will be used as replacements for the translation.

### `<Localize>`

React localize component, with the following props:

* `value` (number|string|object)

The number or date to localize.

* `dateFormat` (string)

The translation key for providing the format string. Only needed for localizing dates.
For the full list of formatting tokens which can be used in the format string, see the [date-fns documentation](https://date-fns.org/v2.0.0-alpha.7/docs/format).

* `parseFormat` (string)

An optional formatting string for parsing the value when localizing dates.
For the full list of formatting tokens which can be used in the parsing string, see the [date-fns documentation](https://date-fns.org/v2.0.0-alpha.7/docs/parse).

* `options` (object)

When localizing numbers, the localize component supports all options as provided by the Javascript built-in `Intl.NumberFormat` object.
For the full list of options, see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat.

### `<I18n>`

React I18n wrapper component, with the following prop:

* `render` (func)

The return value of the provide function will be rendered and automatically re-render when the locale or translations change.

### `setHandleMissingTranslation(fn)`

By default, when a translation is missing, the translation key will be returned in a slightly formatted way,
as can be seen in the `t('application.unknown_translation');` example above.
You can however overwrite this behavior by setting a function to handle missing translations.

```javascript
import { setHandleMissingTranslation, t } from 'react-i18nify-mobx';

setHandleMissingTranslation((key, replacements) => `Missing translation: ${key}`);

t('application.unknown_translation');
  // => Missing translation: application.unknown_translation
```

### `t(key, replacements = {})`

Helper function to translate a `key`, given an optional set of `replacements`. See the above Helpers section for examples.

### `l(value, options)`

Helper function to localize a `value`, given a set of `options`. See the above Helpers section for examples.

For localizing dates, the `date-fns` library is used.
A `dateFormat` option can be used for providing a translation key with the format string.
Moreover, `parseFormat` option can be used for providing a formatting string for parsing the value.
For the full list of formatting tokens which can be used in the format string, see the [date-fns documentation](https://date-fns.org/v2.0.0-alpha.7/docs/format).

For number formatting, the localize helper supports all options as provided by the Javascript built-in `Intl.NumberFormat` object.
For the full list of options, see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat.

### `forceComponentsUpdate()`

This function can be called to force a re-render of all I18n components.

[version-image]: https://img.shields.io/npm/v/react-i18nify-mobx.svg
[downloads-image]: https://img.shields.io/npm/dm/react-i18nify-mobx.svg

[npm-url]: https://npmjs.org/package/react-i18nify-mobx
