import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import { cardDetailsReducer } from "./CardDetails/cardDetails";
import { cardVerifyReducers } from "./slices/cardVerify";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter";
import { filterReducers } from "./slices/filter.slice";
import { locationReducers } from "./userLocation/location";
import { orderDetailsReducer } from "./Order/orderDetails";
import { orderErrorNoteReducer } from "./Order/orderErrorNote";
import { orderReducers } from "./Order/order";
import { slotReducer } from "./Order/Slot";
import storage from "redux-persist/lib/storage";
import { userDataReducers } from "./slices/userData";
import { userTelegramDataReducers } from "./slices/userTelegramData";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const filterPersisConfig = {
  key: "filter",
  storage,
};

const userDataPersistConfig = {
  key: "userData",
  storage,
};

const cardVerifyPersist = {
  key: "card-verify",
  storage,
};

const orderDetailsPersist = {
  key: "order-details",
  storage,
};

const userTelegramDataPersistConfig = {
  key: "userTelegramData",
  storage,
};

const rootReducer = combineReducers({
  counter: persistReducer(persistConfig, counterSlice),
  filter: persistReducer(filterPersisConfig, filterReducers),
  locations: locationReducers,
  orders: orderReducers,
  userData: persistReducer(userDataPersistConfig, userDataReducers),
  cardVerify: persistReducer(cardVerifyPersist, cardVerifyReducers),
  cardDetails: cardDetailsReducer,
  orderDetails: persistReducer(orderDetailsPersist, orderDetailsReducer),
  userTelegramData: persistReducer(
    userTelegramDataPersistConfig,
    userTelegramDataReducers
  ),
  slot: slotReducer,
  orderErrorNote: orderErrorNoteReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
