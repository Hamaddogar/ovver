// @mui
import { enUS, frFR, arSA, esES, trTR, deDE } from '@mui/material/locale';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: 'flagpack:gb-nir',
  },
  {
    label: 'العربية',
    value: 'ar',
    systemValue: arSA,
    icon: 'flagpack:sa',
  },
  {
    label: 'Türkçe',
    value: 'tr',
    systemValue: trTR,
    icon: 'flagpack:tr',
  },
  {
    label: 'española',
    value: 'es',
    systemValue: esES,
    icon: 'flagpack:es',
  },
  {
    label: 'deutsche',
    value: 'de',
    systemValue: deDE,
    icon: 'flagpack:de',
  },
  {
    label: 'française',
    value: 'fr',
    systemValue: frFR,
    icon: 'flagpack:fr',
  },
];

export const appLocales = allLangs.map((item) => item.value); // [en, ar, tr, ....]

export const defaultLang = allLangs[0]; // English

// GET MORE COUNTRY FLAGS
// https://icon-sets.iconify.design/flagpack/
// https://www.dropbox.com/sh/nec1vwswr9lqbh9/AAB9ufC8iccxvtWi3rzZvndLa?dl=0
