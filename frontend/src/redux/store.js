import { combineReducers, configureStore} from "@reduxjs/toolkit";
import userSliceReducer from './userSlice'
import jobSliceReducer from './jobSlice'
import applicationSliceReducer from './applicationSlice'
import { createRoot } from 'react-dom/client'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import companyReducer from './companySlice'



const persistConfig = {
   key: 'root',
   version: 1,
   storage,
 }
 

 const rootReducer=combineReducers({
   user:userSliceReducer,
   job:jobSliceReducer,
   application:applicationSliceReducer,
   company:companyReducer
 }) 
 const persistedReducer = persistReducer(persistConfig, rootReducer)




 const store=configureStore({
   
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
       serializableCheck: {
         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
       },
     }),
})



export default store