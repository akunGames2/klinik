import moment from 'moment'
import MessageSender from '../../library/handler/MessageSender'
import Logger from '../../library/helper/Logger'
import CardKbMessage from '../../messages/cardkb/CardKbMessage'

export const get_data_cardkb = (data) => async (dispatch) => {
  const msg = new CardKbMessage('GETLIST')
  msg.setUsername(data)
  
  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_detail_cardkb_data = (data) => async (dispatch) => {
  const msg = new CardKbMessage('GETDATA')
  msg.setId(data)
  
  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_report_cardkb = (data) => async (dispatch) => {
  const msg = new CardKbMessage('GETREPORT')
  msg.setId(data)
  
  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const update_cardkb = (data) => async (dispatch) => {
  const msg = new CardKbMessage('UPDATE')
  msg.setData(data)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}


export const delete_card_kb_data = (data) => async (dispatch) => {
  const msg = new CardKbMessage('DELETE')

  msg.setIdKartuKB(data.id_kartu_kb)
  msg.setIdPemeriksaanKB(data.id_pemeriksaan_kb)
  msg.setIdpesertaKB(data.id_peserta_kb)
  msg.setIdSuami(data.id_suami)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const insert_cardkb = (data) => async (dispatch) => {
  const msg = new CardKbMessage('INSERT')
  msg.setData(data)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}