import moment from 'moment'
import MessageSender from '../../library/handler/MessageSender'
import CardMotherMessage from '../../messages/cardmother/CardMotherMessage'

export const get_data_cardmother = (data) => async (dispatch) => {
  const msg = new CardMotherMessage('GETLIST')
  msg.setUsername(data)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_detail_cardmother_data = (data) => async (dispatch) => {
  const msg = new CardMotherMessage('GETDATA')
  msg.setId(data)
  
  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_report = (data) => async (dispatch) => {
  const msg = new CardMotherMessage('GETREPORT')
  msg.setId(data)
  
  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const update_cardmother = (data) => async (dispatch) => {
  const msg = new CardMotherMessage('UPDATE')
  msg.setData(data)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}


export const delete_card_mother_data = (data) => async (dispatch) => {
  const msg = new CardMotherMessage('DELETE')
  msg.setId(data)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const insert_card_mother = (data) => async (dispatch) => {
  const msg = new CardMotherMessage('INSERT')
  msg.setData(data)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}