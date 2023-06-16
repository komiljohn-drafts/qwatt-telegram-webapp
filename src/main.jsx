import "@/styles/globals.scss";

import { persistor, store } from "@/store/store";

import LangProvider from "./providers/LangProvider.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import RouteProvider from "./providers/RouteProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <LangProvider>
        <RouteProvider />
      </LangProvider>
    </PersistGate>
  </Provider>
);
