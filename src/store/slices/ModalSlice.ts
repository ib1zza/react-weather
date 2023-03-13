import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  forecastModalIsOpen: boolean;
  forecastModalDay: string | null;
}

const initialState: ModalState = {
  forecastModalIsOpen: false,
  forecastModalDay: null,
};

const ModalSlice = createSlice({
  initialState,
  name: "modal",
  reducers: {
    openModal(state, action: PayloadAction<string>) {
      state.forecastModalDay = action.payload;
      state.forecastModalIsOpen = true;
    },
    closeModal(state) {
      state.forecastModalDay = null;
      state.forecastModalIsOpen = false;
    },
  },
});
export default ModalSlice.reducer;
export const { openModal, closeModal } = ModalSlice.actions;
