import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import combinerReducers from './combineReducers'
import Logger from '../library/helper/Logger'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: null,
}

const persistedReducer = persistReducer(persistConfig, combinerReducers)

let xstore
if (Logger.IS_DEEP_TRACE) {
  // using redux-devtools-extension
  xstore = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk, logger)))
  // store = createStore(persistedReducer, applyMiddleware(thunk, logger))
} else {
  xstore = createStore(persistedReducer, applyMiddleware(thunk))
}

const store = xstore

export const persistor = persistStore(store)

export default store
