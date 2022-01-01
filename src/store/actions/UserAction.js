
import MessageSender from '../../library/handler/MessageSender'
import ToolsMessage from '../../messages/tools/ToolsMessage'
import UserMessage from '../../messages/user/UserMessage'

export const get_list_user_data = (data) => async (dispatch) => {
  const msg = new UserMessage('GETLIST')
  msg.setType(data)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_data_role = () => async (dispatch) => {
  const msg = new UserMessage('GETROLE')
  // msg.setType(data)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_list_purchase_tool_data = () => async (dispatch) => {
  const msg = new ToolsMessage('GETLISTPURCHASE')

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const delete_user_data = (data) => async (dispatch) => {
  const msg = new UserMessage('DELETE')
  msg.setId(data)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const delete_purchase_tool_data = (data) => async (dispatch) => {
  const msg = new ToolsMessage('DELETEPURCHASE')
  msg.setId(data)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_detail_user_data = (data) => async (dispatch) => {
  const msg = new UserMessage('GETDATA')
  msg.setId(data)
  
  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_detail_purchase_tool_data = (data) => async (dispatch) => {
  const msg = new ToolsMessage('GETDATAPURCHASE')
  msg.setId(data)
  
  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const update_user = (data) => async (dispatch) => {
  const msg = new UserMessage('UPDATE')
  msg.setData(data)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}

export const update_purchase_tool = (data) => async (dispatch) => {
  const msg = new ToolsMessage('UPDATEPURCHASE')
  msg.setIdPurchaseTools(data.id_beli_alkes)
  msg.setUsername(data.username)
  msg.setIdKonten(data.id_alkes)
  msg.setSupplier(data.supplier)
  msg.setJumlah(data.jumlah)
  msg.setHarga(data.harga)
  msg.setSubtotal(data.subtotal)
  msg.setKeterangan(data.keterangan)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}

export const insert_user = (data) => async (dispatch) => {
  const msg = new UserMessage('INSERT')
  msg.setData(data)

  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}

export const insert_purchase_tool = (data) => async (dispatch) => {
  const msg = new ToolsMessage('INSERTPURCHASE')
  msg.setUsername(data.username)
  msg.setIdKonten(data.id_alkes)
  msg.setSupplier(data.supplier)
  msg.setJumlah(data.jumlah)
  msg.setHarga(data.harga)
  msg.setSubtotal(data.subtotal)
  msg.setKeterangan(data.keterangan)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}
