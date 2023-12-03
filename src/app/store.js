import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import UserSlice from '../features/user/UserSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    user: UserSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['persist/PERSIST', 'persist/PURGE']
        }
    })
});

export const persistor = persistStore(store);
