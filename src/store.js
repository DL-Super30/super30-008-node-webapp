import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/slices/loginSlice';
import leadsReducer from '@/slices/leadsSlice';
import opportunitiesReducer from '@/slices/opportunitiesSlice';
import learnersReducer from '@/slices/learnersSlice';

 export const store = configureStore({
    reducer: {
        login: loginReducer,
        leads: leadsReducer,
        opportunities: opportunitiesReducer,
        learners: learnersReducer,
    }
});
