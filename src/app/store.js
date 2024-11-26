import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import listReducer from '../features/list/listSlice';
import aiReducer from '../features/ai/aiSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        list: listReducer,
        ai: aiReducer,
    },
    devTools: true,
});