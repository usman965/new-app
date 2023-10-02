import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import appPrefrences from "./reducers/app-pref-slice";
import getAllNews from "./reducers/get-all-news";
import AsyncStorage from "@react-native-async-storage/async-storage";


const reducers = combineReducers({
  appPrefrences:appPrefrences,
  getAllNews


})

const persistConfig = {
  key: 'root',
  storage:AsyncStorage  ,
  blacklist:[,"getAllNews"]
}

 const persistedReducer = persistReducer(persistConfig, reducers)

 export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});


export const persistor = persistStore(store)
