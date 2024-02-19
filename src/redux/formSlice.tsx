// formsSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormsState {
  formDataObject: Record<string, any>;
  formData: Record<string, any>[];
}

const initialState: FormsState = {
  formDataObject: {},
  formData: [],
};

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    submitFirstForm: (state, action: PayloadAction<Record<string, any>>) => {
      console.log("!", action.payload);
      state.formDataObject = action.payload;
    },
    submitForm: (state, action: PayloadAction<Record<string, any>>) => {
      console.log("!!", action.payload);

      const combinedData = {
        ...state.formDataObject,
        ...action.payload,
      };
      console.log(combinedData);
      state.formData.push(combinedData);
      state.formDataObject = {};
    },
  },
});

export const { submitFirstForm, submitForm } = formsSlice.actions;
export default formsSlice.reducer;
