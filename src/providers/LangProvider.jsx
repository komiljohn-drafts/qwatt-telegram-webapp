import { changeLanguage, language } from "@/utils/i18n";
import { useCallback, useMemo, useState } from "react";

import PropTypes from "prop-types";
import { langContext } from "@/contexts/langContext";

const initialState = localStorage.getItem("lang") || language;

export default function LangProvider(props) {
  const { children } = props;

  const [lang, setLang] = useState(initialState);

  const changeLang = useCallback((langCode) => {
    changeLanguage(langCode);
    localStorage.setItem("lang", langCode);
    setLang(langCode);
  }, []);

  const value = useMemo(() => ({ lang, changeLang }), [lang, changeLang]);

  return <langContext.Provider value={value}>{children}</langContext.Provider>;
}

LangProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
