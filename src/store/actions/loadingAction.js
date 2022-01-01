import { globalConstant } from '../constants'

export const setLoading = (loading) => (dispatch) => {
  dispatch({
    type: globalConstant.SET_GLOBAL_IS_LOADING,
    payload: loading,
  })
}
