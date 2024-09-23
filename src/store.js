import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/slices/loginSlice';
import leadsReducer from '@/slices/leadsSlice';
import opportunitiesReducer from '@/slices/opportunitiesSlice';


 export const store = configureStore({
    reducer: {
        login: loginReducer,
        leads: leadsReducer,
        opportunities: opportunitiesReducer,
    }
});
