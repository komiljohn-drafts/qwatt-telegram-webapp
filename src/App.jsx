import { Outlet, useMatch } from "react-router-dom";

import { Main } from "./components/Pages/Main";
import { getProfile } from "./services/getProfile";
import { useDispatch } from "react-redux";
import useTelegram from "./hooks/useTelegram";
import { userDataActions } from "./store/slices/userData";
import { useEffect } from "react";

function App() {
  const userInitialData = useTelegram();
  const dispatch = useDispatch();
  const match = useMatch("/");

  useEffect(() => {
    if (userInitialData?.guid) {
      getProfile(userInitialData?.guid).then((res) => {
        dispatch(userDataActions.setUserData(res?.data?.data?.response));
      });
    } else {
      dispatch(userDataActions.setUserData({}))
    }
  },[userInitialData])

  if (match) {
    return <Main />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
