/* global describe, test, expect */

import { i18nStore, getLocale, getTranslations } from '../src';

describe('store.js', () => {
  describe('setLocale', () => {
    test('should set locale in store and bind to i18n', () => {
      i18nStore.setLocale('nl');
      expect(i18nStore.locale).toEqual('nl');
      expect(getLocale()).toEqual('nl');

      i18nStore.setLocale('zh');
      expect(i18nStore.locale).toEqual('zh');
      expect(getLocale()).toEqual('zh');
    });
  });

  describe('setTranslations', () => {
    test('should set translations in store and bind to i18n', () => {
      i18nStore.setTranslations({
        en: {
          hello: 'Hello, %{name}!',
        },
      });
      expect(i18nStore.translations).toEqual({
        en: {
          hello: 'Hello, %{name}!',
        },
      });
      expect(getTranslations()).toEqual({
        en: {
          hello: 'Hello, %{name}!',
        },
      });
    });
  });
});
