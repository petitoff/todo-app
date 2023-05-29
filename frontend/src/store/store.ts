import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/taskSlice";
import sidebarSlice from "./slices/sidebarSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
    sidebar: sidebarSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
