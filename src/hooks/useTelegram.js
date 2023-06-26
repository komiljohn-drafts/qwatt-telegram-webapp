import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getUserId } from "@/services/getUser";
import { useLangContext } from "@/contexts/langContext";
import { userTelegramDataActions } from "@/store/slices/userTelegramData";

const useTelegram = () => {
  const dispatch = useDispatch();
  const userTelegramData = useSelector((state) => state.userTelegramData?.data);
  const [tgID, setTgID] = useState();
  const [userData, setUserData] = useState();
  const { changeLang } = useLangContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(
        userTelegramDataActions.setUserTelegramData(
          window.Telegram?.WebApp?.initDataUnsafe?.user
        )
      );
    }
  }, []);

  console.log("w", window.Telegram?.WebApp);
  console.log("usertgdata", userTelegramData);

  useEffect(() => {
    setTgID(userTelegramData?.id);
    if (userTelegramData?.language_code) {
      console.log("inside");
      changeLang(userTelegramData?.language_code);
    }

    // setTgID("6054841751");
    // setTgID("6225306070");
    // setTgID("6267637476");
  }, [userTelegramData]);

  useEffect(() => {
    if (tgID) {
      getUserId({ data: { telegram_id: tgID } })
        .then((res) => {
          // console.log("user get", res);
          setUserData(res?.data?.data?.response?.[0]);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [tgID]);

  return userData;
};

export default useTelegram;
