import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUs from "./en-us";
import trTr from "./tr-tr";

i18n
  .use(initReactI18next)
  .init({
      resources: {
          en: { translation: enUs },
          tr: { translation: trTr },
      },
      lng: "tr",
      fallbackLng: "tr",
      interpolation: { escapeValue: false },
  });


export default i18n;
