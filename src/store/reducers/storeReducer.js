import { storeConstant } from '../constants'

const initialState = {
  lp__store_id: null,
  lp__store_name: null,
  lp__store_description: null,
  lp__store_tagline: null,
  lp__store_address: null,
  lp__store_city: null,
  lp__store_province: null,
  lp__store_location: null,
  lp__cart_count: 0,
  lp__order_count: 0,
  lp__product_category: [],
}

export default (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case storeConstant.ID_TOKO:
      return {
        ...state,
        lp__store_id: payload,
      }
    case storeConstant.NAMA_TOKO:
      return {
        ...state,
        lp__store_name: payload,
      }
    case storeConstant.DESKRIPSI:
      return {
        ...state,
        lp__store_description: payload,
      }
    case storeConstant.TAGLINE:
      return {
        ...state,
        lp__store_tagline: payload,
      }
    case storeConstant.ALAMAT:
      return {
        ...state,
        lp__store_address: payload,
      }
    case storeConstant.KOTA:
      return {
        ...state,
        lp__store_city: payload,
      }
    case storeConstant.PROPINSI:
      return {
        ...state,
        lp__store_province: payload,
      }
    case storeConstant.LOCATION:
      return {
        ...state,
        lp__store_location: payload,
      }
    case storeConstant.CART_COUNT:
      return {
        ...state,
        lp__cart_count: payload,
      }
    case storeConstant.ORDER_COUNT:
      return {
        ...state,
        lp__order_count: payload,
      }
    case storeConstant.PRODUCT_CATEGORY:
      return {
        ...state,
        lp__product_category: payload,
      }
    default:
      return state
  }
}
