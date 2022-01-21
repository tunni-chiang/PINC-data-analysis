import { createSlice } from "@reduxjs/toolkit";

interface Data {
  data: Object | undefined;
}

const initialState = {
  data: undefined,
} as Data;

const pincDataSlice = createSlice({
  name: "pinc_data",
  initialState,
  reducers: {
    setPincData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setPincData } = pincDataSlice.actions;
export const selectData = (state: any) => state.pinc_data.data;
export const selectDataExists = (state: any) => state.pinc_data.data !== undefined;
export default pincDataSlice.reducer;
