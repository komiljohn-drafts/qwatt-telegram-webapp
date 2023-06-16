import { Outlet, useMatch } from "react-router-dom";

import { Main } from "./components/Pages/Main";
import { useDispatch } from "react-redux";
import useTelegram from "./hooks/useTelegram";
import { userDataActions } from "./store/slices/userData";

function App() {
  const userInitialData = useTelegram();
  const dispatch = useDispatch();
  const match = useMatch("/");

  if (match) {
    return <Main />;
  }

  if (userInitialData) {
    dispatch(userDataActions.setUserData({ data: userInitialData }));
  }

  console.log("userInitialData", userInitialData);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
