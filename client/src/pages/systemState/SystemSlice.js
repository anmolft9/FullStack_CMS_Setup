import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideMenu: false,
};

const systemSlice = createSlice({
  name: "adminSystem",
  initialState,
  reducers: {
    setShowMenu: (state, { payload }) => {
      state.showSideMenu = payload;
    },
  },
});

const { reducer, actions } = systemSlice;

export const { setShowMenu } = actions;
export default reducer;
