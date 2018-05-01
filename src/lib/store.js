import { observable, action } from 'mobx';
import { setLocaleGetter, setTranslationsGetter, forceComponentsUpdate } from 'react-i18nify';

class I18nStore {
  @observable locale = 'en';
  @observable translations = {};

  constructor() {
    setLocaleGetter(() => this.locale);
    setTranslationsGetter(() => this.translations);
  }

  @action setLocale = (locale) => {
    this.locale = locale;
    forceComponentsUpdate();
  }

  @action setTranslations = (translations) => {
    this.translations = translations;
    forceComponentsUpdate();
  }
}

module.exports = new I18nStore();
