import moment from 'moment'
import MessageSender from '../../library/handler/MessageSender'
import CardBabyMessage from '../../messages/cardbaby/CardBabyMessage'

export const get_data_cardbaby = (data) => async (dispatch) => {
  const msg = new CardBabyMessage('GETLIST')
  msg.setUsername(data)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_detail_cardbaby_data = (data) => async (dispatch) => {
  const msg = new CardBabyMessage('GETDATA')
  msg.setId(data)
  
  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_report_cardbaby = (data) => async (dispatch) => {
  const msg = new CardBabyMessage('GETREPORT')
  msg.setId(data)
  
  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const update_cardbaby = (data) => async (dispatch) => {
  const msg = new CardBabyMessage('UPDATE')
  msg.setData(data)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}


export const delete_card_baby_data = (data) => async (dispatch) => {
  const msg = new CardBabyMessage('DELETE')
  msg.setIdKartuBayi(data.id_kartu_bayi)
  msg.setIdJenisImunisasi(data.id_jenis_imunisasi)
  msg.setIdImunisasi(data.id_imunisasi)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const insert_cardbaby = (data) => async (dispatch) => {
  const msg = new CardBabyMessage('INSERT')
  msg.setData(data)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}