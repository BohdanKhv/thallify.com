import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import aiService from './aiService'


// get from local storage
const aiData = localStorage.getItem('aiData');

const initialState = {
    data: aiData ? JSON.parse(aiData) : null,
    isLoading: false,
    isError: false,
}





// Create list 
export const getAiInsight = createAsyncThunk(
    "ai/getAiInsight",
    async (payload, thunkAPI) => {
        try {
            return await aiService.getAiInsight(payload);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Create slice
const aiSlice = createSlice({
    name: "ai",
    initialState,
    reducers: {
        // Reset state
        resetList: (state) => {
            state.data = null;
            state.isLoading = false;
            state.isError = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAiInsight.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAiInsight.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.data;
            // save to local storage
            localStorage.setItem('aiData', JSON.stringify(action.payload.data));
        });
        builder.addCase(getAiInsight.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    }
});


// Export reducer
export const { resetList } = aiSlice.actions;
export default aiSlice.reducer;