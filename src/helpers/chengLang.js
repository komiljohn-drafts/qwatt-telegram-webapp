import { useSelector } from "react-redux";

export const CheckLang = () => {
  const telegramData = useSelector((state) => state.userTelegramData?.data);

  console.log("language", telegramData?.language_code);

  return telegramData?.language_code;
};
