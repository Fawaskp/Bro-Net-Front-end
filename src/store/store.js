import { configureStore } from "@reduxjs/toolkit";
import LoggedInUserReducer from "./LoggedInUserSlice";
import storage from 'redux-persist/lib/storage';
import { persistStore,persistReducer } from "redux-persist";

const persistConfig = {
    key:'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,LoggedInUserReducer)
const store = configureStore({
    reducer: persistedReducer
})

export default store
export const persistor = persistStore(store)