import { globalConstant } from '../constants'

const initialState = {
  version: '1.0',
  spinnerLoading: false,
  urlImagePreview: [],
  fcmRegId: '',
  referrerId: '',
  tmpData: null,
  deepLinkNav: undefined,
  onBoardingHasShown: undefined,
  forceChangePassword: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case globalConstant.SET_GLOBAL_VERSION:
      return {
        ...state,
        version: action.payload,
      }

    case globalConstant.SET_GLOBAL_IS_LOADING:
      return {
        ...state,
        spinnerLoading: action.payload,
      }

    case globalConstant.SET_GLOBAL_IS_PREVIEWING:
      return {
        ...state,
        urlImagePreview: action.payload,
      }

    case globalConstant.SET_GLOBAL_FCM_REGID:
      return {
        ...state,
        fcmRegId: action.payload,
      }

    case globalConstant.SET_GLOBAL_REFERRER_ID:
      return {
        ...state,
        referrerId: action.payload,
      }

    case globalConstant.SET_GLOBAL_TMP:
      return {
        ...state,
        tmpData: action.payload,
      }

    case globalConstant.SET_DEEP_LINK_NAV:
      return {
        ...state,
        deepLinkNav: action.payload,
      }

    case globalConstant.SET_FORCE_CHANGE_PASSWORD:
      return {
        ...state,
        forceChangePassword: action.payload,
      }

    case globalConstant.SET_GLOBAL_ON_BOARDING:
      return {
        ...state,
        onBoardingHasShown: action.payload,
      }

    default:
      return state
  }
}
