import { Outlet, useMatch } from "react-router-dom";

import { Main } from "./components/Pages/Main";
import { getProfile } from "./services/getProfile";
import { useDispatch } from "react-redux";
import useTelegram from "./hooks/useTelegram";
import { userDataActions } from "./store/slices/userData";

function App() {
  const userInitialData = useTelegram();
  const dispatch = useDispatch();
  const match = useMatch("/");

  if (userInitialData?.guid) {
    getProfile(userInitialData?.guid).then((res) => {
      dispatch(userDataActions.setUserData(res?.data?.data?.response));
    });
  }

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
