import { Outlet, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Main } from "./components/Pages/Main";
import { getProfile } from "./services/getProfile";
import useTelegram from "./hooks/useTelegram";
import { userDataActions } from "./store/slices/userData";

function App() {
  const userInitialData = useTelegram();
  const userTelegramData = useSelector((state) => state.userTelegramData?.data);
  const dispatch = useDispatch();
  const match = useMatch("/");

  console.log("tg data", userTelegramData);

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
