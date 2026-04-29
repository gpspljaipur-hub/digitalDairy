import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import userReducer from '../Reducers/Userslice';


const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['isAuthenticated', 'user', 'token', 'hasFinishedOnboarding', 'userType'],
};

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['location', 'state', 'foodType', 'electricy', 'foodType', 'emissionFactors', 'homeList', 'transport', 'userDetails', 'selectedValue', 'carbon', 'tournament', 'certificate', 'tab'],
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),

});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } }),
});

export const persistor = persistStore(Store);
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;