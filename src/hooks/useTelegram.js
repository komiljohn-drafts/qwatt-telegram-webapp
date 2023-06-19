import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getUserId } from "@/services/getUser";
import { userTelegramDataActions } from "@/store/slices/userTelegramData";

const useTelegram = () => {
  const dispatch = useDispatch();
  const userTelegramData = useSelector((state) => state.userTelegramData?.data);
  const [tgID, setTgID] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(
        userTelegramDataActions.setUserTelegramData({
          data: window.Telegram?.WebApp?.initDataUnsafe?.user,
        })
      );

      setTgID(userTelegramData?.id);
      // setTgID("6054841751");
      // setTgID("6225306070");
      // setTgID("6267637476");
    }
  }, []);

  useEffect(() => {
    console.log("tgID", tgID);
    if (tgID) {
      getUserId({ data: { telegram_id: tgID } })
        .then((res) => {
          console.log("user get", res);
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
