import { locationConstant } from '../constants/locationConstant'

const initialState = {
  lp__province: [],
  lp__city: {},
  lp__district: {},
  lp__subdistrict: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case locationConstant.LIST_PROVINCE:
      return {
        ...state,
        lp__province: action.payload,
      }
    case locationConstant.LIST_CITY:
      state.lp__city[action.payload.id] = action.payload.data
      return {
        ...state,
        lp__city: state.lp__city,
      }
    case locationConstant.LIST_DISTRICT:
      state.lp__district[action.payload.id] = action.payload.data
      return {
        ...state,
        lp__district: state.lp__district,
      }
    case locationConstant.LIST_SUBDISTRICT:
      state.lp__subdistrict[action.payload.id] = action.payload.data
      return {
        ...state,
        lp__subdistrict: state.lp__subdistrict,
      }
    default:
      return state
  }
}
