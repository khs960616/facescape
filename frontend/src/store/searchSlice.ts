import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface KeywordState {
    keyword: string;
};

const initialState: KeywordState = {
    keyword: "",
}

const searchSlice = createSlice({
    name: 'keyword',
    initialState,
    reducers: {
        setKeyword: (state, action: PayloadAction<string>) => {
            state.keyword = action.payload;
        }
    },
})

export const { setKeyword } = searchSlice.actions;

export default searchSlice.reducer;