import en from "@/locales/en.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from "@/locales/ru.json";
import uz from "@/locales/uz.json";

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  uz: {
    translation: uz,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "ru",

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
export const { t, changeLanguage, language } = i18n;
