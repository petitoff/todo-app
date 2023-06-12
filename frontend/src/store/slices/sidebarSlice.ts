import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PanelName = "EDIT_TASK" | "NEW_TASK" | "MENU";

export interface SidebarState {
  isOpen: boolean;
  panelName?: PanelName;
}

const initialState: SidebarState = {
  isOpen: false,
  panelName: "MENU",
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setPanelName: (state, action: PayloadAction<PanelName>) => {
      state.panelName = action.payload;
    },
  },
});

export const { toggleSidebar, setPanelName } = sidebarSlice.actions;
export default sidebarSlice.reducer;
