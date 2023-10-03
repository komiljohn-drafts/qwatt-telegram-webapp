import { Outlet, useMatch } from "react-router-dom";

import { Main } from "./components/Pages/Main";
import { getProfile } from "./services/getProfile";
import { useDispatch, useSelector } from "react-redux";
import useTelegram from "./hooks/useTelegram";
import { userDataActions } from "./store/slices/userData";
import { useEffect } from "react";
import { useLangContext } from "./contexts/langContext";
import { sendMsg } from "./helpers/sendMsg";

function App() {
  const userInitialData = useTelegram();
  const dispatch = useDispatch();
  const match = useMatch("/:lang");
  const { changeLang } = useLangContext();
  const userTelegramData = useSelector((state) => state.userTelegramData.data);

  const urlSegments = window?.location?.href?.split('/')
  const urlLastSegment = urlSegments?.[urlSegments.length-1]
  if(["uz", "ru", "en"].includes(urlLastSegment)){
    changeLang(urlLastSegment)
  }
  if(userTelegramData?.id == "1780780393"){
    sendMsg("urlLastSegment: ", urlLastSegment)
    sendMsg("window?.location?.href: ", window?.location?.href)
  }

  useEffect(() => {
    if (userInitialData?.guid) {
      getProfile(userInitialData?.guid).then((res) => {
        dispatch(userDataActions.setUserData(res?.data?.data?.response));
      });
    } else {
      dispatch(userDataActions.setUserData({}))
    }
  },[userInitialData])

  if (match || urlLastSegment == "") {
    return <Main />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
