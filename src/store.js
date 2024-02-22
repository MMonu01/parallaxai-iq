import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import LoginReducer from "~/reducers/login-reducer";
import ChatReducer from "~/reducers/chat-reducer";

const rootReducer = combineReducers({ login_store: LoginReducer, chat_store: ChatReducer });

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["chat_store"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
