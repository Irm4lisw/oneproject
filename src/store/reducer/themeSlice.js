import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDarkMode: true,
    },
    reducers:{
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
    },
});
export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;