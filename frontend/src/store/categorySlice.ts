import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemTypeState {
    itemType: string;
};

const initialState: ItemTypeState = {
    itemType: "",
};


const categorySlice = createSlice({
    name: 'itemType',
    initialState,
    reducers: {
        setItemType: (state, action: PayloadAction<string>) => {
            state.itemType = action.payload;
        }
    }
})

export const { setItemType } = categorySlice.actions;

export default categorySlice.reducer;