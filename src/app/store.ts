import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import userReducer from '../features/user/userSlice'
import logger from 'redux-logger';
import productsReducer from '../features/products/productsSlice';
import descriptionItemReducer from '../features/descriptionItems/descriptionItemSlice';
import sliderItemsReducer from '../features/sliderItems/sliderItemSlice';
import newsletterOrderReducer from '../features/newsletterOrders/newsletterOrderSlice';
import messagesReducer from '../features/messages/messageSlice';
import cartdataReducer from '../features/cartdata/cartSlice';
import orderdataReducer from '../features/orderdata/orderdataSlice'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}


const persistedUserReducer = persistReducer(persistConfig,userReducer) 
const persistedProductReducer = persistReducer(persistConfig, productsReducer)
const persistedCartdataReducer = persistReducer(persistConfig, cartdataReducer )

export const store = configureStore({
  reducer: {
    auth:authReducer,
    user:persistedUserReducer,
    products:persistedProductReducer,
    descriptionItem:descriptionItemReducer,
    sliderItems:sliderItemsReducer,
    newsletterOrders:newsletterOrderReducer,
    messages:messagesReducer,
    cartdata:persistedCartdataReducer,
    orderdata:orderdataReducer,
  }, middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(logger),
});
// console.log("InitalState", store.getState());
// const unsubscribe = store.subscribe(()=>console.log("updateState", store.getState()));
// unsubscribe();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;