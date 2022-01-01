import { combineReducers } from 'redux'
// Reducers
import globalReducer from './reducers/globalReducer'
import authReducer from './reducers/authReducer'
import locationReducer from './reducers/locationReducer'
import storeReducer from './reducers/storeReducer'

const reducer = combineReducers({
  Global: globalReducer,
  Auth: authReducer,
  Location: locationReducer,
  Store: storeReducer,
})

export default reducer
