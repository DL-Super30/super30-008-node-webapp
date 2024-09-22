import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/slices/loginSlice';
import leadsReducer from '@/slices/leadsSlice';


 export const store = configureStore({
    reducer: {
        login: loginReducer,
        leads: leadsReducer
    }
});
