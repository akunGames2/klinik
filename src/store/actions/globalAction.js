import { globalConstant } from '../constants'
import { AppMessage } from '../../messages/info/AppMessage'
import MessageSender from '../../library/handler/MessageSender'
import Logger from '../../library/helper/Logger'

// export const setImagePreview = (urls) => (dispatch) => {
//   dispatch({
//     type: globalConstant.SET_GLOBAL_IS_PREVIEWING,
//     payload: urls,
//   })
// }

export const saveRegId = (reg_id) => (dispatch) => {
  dispatch({
    type: globalConstant.SET_GLOBAL_FCM_REGID,
    payload: reg_id,
  })
}

export const saveTemp = (tmp) => (dispatch) => {
  dispatch({
    type: globalConstant.SET_GLOBAL_TMP,
    payload: tmp,
  })
}

export const check_app_info = () => async (dispatch) => {
  const msg = new AppMessage()
  const response = new MessageSender(dispatch).doGet(msg)

  return response
}
