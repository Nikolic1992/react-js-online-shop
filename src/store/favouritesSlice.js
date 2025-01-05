import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    allFavourites: [],
    favouritesTotal: 0,
  },
  reducers: {
    updateFavouritesAction: (state, action) => {
      console.log(action.payload);

      let copyFavourites = [...state.allFavourites];

      let findIndex = null;

      copyFavourites.find((item, index) => {
        if (item.id === action.payload.id) {
          findIndex = index;
          return;
        }
      });

      if (findIndex === null) {
        copyFavourites.push(action.payload);
        state.favouritesTotal++;
      } else {
        copyFavourites.splice(findIndex, 1);
        state.favouritesTotal--;
      }

      state.allFavourites = copyFavourites;
    },
  },
});

export const { updateFavouritesAction } = favouritesSlice.actions;
export default favouritesSlice.reducer;
