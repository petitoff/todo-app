import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/taskSlice";
import sidebarSlice from "./slices/sidebarSlice";
import authSlice, { AuthState } from "./slices/authSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const authReducer = persistReducer<AuthState>(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskSlice,
    sidebar: sidebarSlice,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
