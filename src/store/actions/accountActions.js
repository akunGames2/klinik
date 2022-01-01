import moment from 'moment'
import MessageSender from '../../library/handler/MessageSender'
import { authConstant } from '../constants'
import DetailAccountMessage from '../../messages/account/DetailAccountMessage'

export const get_data_user = (user_id) => async (dispatch) => {
  const msg = new DetailAccountMessage('GET')
  msg.setUsernameUser(user_id)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const update_user_data = (data) => async (dispatch) => {
  const msg = new DetailAccountMessage('UPDATE')
  msg.setIdUser(data.id_user)
  msg.setNama(data.nama)
  msg.setUsername(data.username)
  msg.setEmail(data.email)
  msg.setNotelp(data.telpon)
  msg.setAlamat(data.alamat)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  if (response.isSuccess()) {
    dispatch(
      setAccount({
        user_id: data.username,
        lp__name: data.nama,
        lp__phone: data.notelp,
        lp__email: data.email,
        lp__alamat: data.alamat,
      })
    )
  }
  return response
}

const setAccount = (data) => async (dispatch) => {
  dispatch({
    type: authConstant.SET_AUTH_DATA,
    payload: data,
  })
}
