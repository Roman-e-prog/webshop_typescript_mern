import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productsSlice'
import descriptionItemsReducer from '../features/descriptionItems/descriptionItemsSlice';
import userReducer from '../features/user/userSlice';
import sliderItemsReducer from '../features/slideritems/sliderItemsSlice';
import cartReducer from '../features/cart/cartReducer';
import newsletterOrderReducer from '../features/newsletter/newsletterSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';
import cartdataReducer from '../features/cartdata/cartdataSlice';
import orderdataReducer from '../features/orders/orderSlice';
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
console.log(storage);

const persistedUserReducer = persistReducer(persistConfig,userReducer) 
const persistedProductReducer = persistReducer(persistConfig, productsReducer)
const persistedSliderReducer = persistReducer(persistConfig, sliderItemsReducer)
const persistedWishlistReducer = persistReducer(persistConfig, wishlistReducer)
const persistedCartReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
  reducer: {
    auth:authReducer,
    user: persistedUserReducer,
    products:persistedProductReducer,
    wishlist: persistedWishlistReducer,
    cart:persistedCartReducer,
    cartdata:cartdataReducer, 
    order:orderdataReducer,
    descriptionItems:descriptionItemsReducer,
    sliderItems:persistedSliderReducer, 
    newsletterOrder:newsletterOrderReducer, 
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
