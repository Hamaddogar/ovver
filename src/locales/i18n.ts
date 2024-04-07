'use client';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// utils
import { localStorageGetItem } from 'src/utils/storage-available';
//
import { defaultLang } from './config-lang';
//
import translationEn from './langs/en.json';
import translationAr from './langs/ar.json';
import translationTr from './langs/tr.json';
import translationEs from './langs/es.json';
import translationDe from './langs/de.json';
import translationFr from './langs/fr.json';

const resources = {
  ar: { translations: translationAr },
  en: { translations: translationEn },
  tr: { translations: translationTr },
  es: { translations: translationEs },
  de: { translations: translationDe },
  fr: { translations: translationFr },
  // ... other languages
};
// ----------------------------------------------------------------------

const lng = localStorageGetItem('i18nextLng', defaultLang.value);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng,
    fallbackLng: lng,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
