import {combineReducers, configureStore} from '@reduxjs/toolkit'
 import { cartslicereducer  } from './cartslice'; 
import { userReducer } from './userslice';
// import storage from 'redux-persist/lib/storage';
import ArtReducers from './ArtSlice'
import orderReducer from './order'

// import { getDefaultMiddleware } from '@reduxjs/toolkit';
// import persistReducer from 'redux-persist/es/persistReducer';

// const customizedMiddleware = getDefaultMiddleware({
//       serializableCheck: false
//     })
const rootReducer=combineReducers({cart:cartslicereducer,user:userReducer,Art:ArtReducers,order:orderReducer
});
// const persistConfig={key:"root",
// storage
// };


// const persistedReducer=persistReducer(persistConfig,rootReducer)

const store = configureStore({
      reducer:rootReducer,
      
})
// const persistor= persistStore(store);

export {store};