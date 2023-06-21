import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

export const CheckLang = () => {
  const telegramData = useSelector((state) => state.userTelegramData?.data);
  const [lang, setLang] = useState("ru");

  console.log("language", telegramData?.language_code);

  useEffect(() => {
    if (telegramData?.language_code) {
      setLang(telegramData?.language_code);
    }
  }, [telegramData]);

  return lang;
};
