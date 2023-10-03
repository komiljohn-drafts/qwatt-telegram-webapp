import { Outlet, useMatch } from "react-router-dom";

import { Main } from "./components/Pages/Main";
import { getProfile } from "./services/getProfile";
import { useDispatch } from "react-redux";
import useTelegram from "./hooks/useTelegram";
import { userDataActions } from "./store/slices/userData";
import { useEffect } from "react";
import { useLangContext } from "./contexts/langContext";

function App() {
  const userInitialData = useTelegram();
  const dispatch = useDispatch();
  const match = useMatch("/:lang");
  const { changeLang } = useLangContext();

  const urlSegments = window?.location?.href?.split('/')
  const urlLastSegment = urlSegments?.[urlSegments.length-1]
  if(["uz", "ru", "en"].includes(urlLastSegment)){
    changeLang(urlLastSegment)
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
