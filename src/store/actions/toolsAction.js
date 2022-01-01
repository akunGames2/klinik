import moment from 'moment'
import MessageSender from '../../library/handler/MessageSender'
import { authConstant } from '../constants'
import ToolsMessage from '../../messages/tools/ToolsMessage'

export const get_list_tool_data = () => async (dispatch) => {
  const msg = new ToolsMessage('GETLIST')

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_list_purchase_tool_data = () => async (dispatch) => {
  const msg = new ToolsMessage('GETLISTPURCHASE')

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const delete_tool_data = (data) => async (dispatch) => {
  const msg = new ToolsMessage('DELETE')
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

export const get_detail_tool_data = (data) => async (dispatch) => {
  const msg = new ToolsMessage('GETDATA')
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

export const update_tool = (data) => async (dispatch) => {
  const msg = new ToolsMessage('UPDATE')
  msg.setIdKonten(data.id_alkes)
  msg.setNama(data.nama)
  msg.setFungsi(data.fungsi)
  msg.setSatuan(data.satuan)
  msg.setKeterangan(data.keterangan)
  msg.setSupplier(data.supplier)
  msg.setJumlah(data.jumlah)
  msg.setHarga(data.harga)
  msg.setSubtotal(data.subtotal)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}

export const update_purchase_tool = (data) => async (dispatch) => {
  const msg = new ToolsMessage('UPDATEPURCHASE')
  msg.setIdPurchaseTools(data.id_beli_alkes)
  msg.setIdDetilPurchaseTools(data.id_detil_beli_alkes)
  msg.setUsername(data.user)
  msg.setIdKonten(data.id_alkes)
  msg.setSupplier(data.supplier)
  msg.setJumlah(data.jumlah)
  msg.setHarga(data.harga)
  msg.setSubtotal(data.subtotal)
  msg.setKeterangan(data.keterangan)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}

export const insert_tool = (data) => async (dispatch) => {
  const msg = new ToolsMessage('INSERT')
  msg.setNama(data.nama)
  msg.setFungsi(data.fungsi)
  msg.setSatuan(data.satuan)
  msg.setKeterangan(data.keterangan)
  msg.setSupplier(data.supplier)
  msg.setJumlah(data.jumlah)
  msg.setHarga(data.harga)
  msg.setSubtotal(data.subtotal)
  
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

// export const save_number = (user_id, token, id, id_product, bill_info, label) => async (
//   dispatch
// ) => {
//   const msg = new CustomerMessage()
//   msg.setAuth(user_id, '', token)
//   if (id) {
//     msg.setEdit().setId(id)
//   } else {
//     msg.setPost()
//   }
//   msg.setCustomer(bill_info, id_product, label)

//   const response = await new MessageSender(dispatch).doPost(msg)

//   return response
// }

// export const check_koperasi = (user_id, token) => async (dispatch) => {
//   const msg = new KoperasiMessage()
//   msg.setAuth(user_id, '', token)
//   msg.disableImage()

//   const response = await new MessageSender(dispatch).doPost(msg)

//   return response
// }

// export const register_koperasi = (user_id, token, name, values) => async (dispatch) => {
//   const msg = new KoperasiMessage()
//   await msg.setInfo()
//   msg.setRegister()
//   msg.setAuth(user_id, '', token)
//   msg.setIdentity(user_id, name, values.email)
//   msg.setAddress(
//     values.alamat,
//     values.idKelurahan,
//     values.idkecamatan,
//     values.idkota,
//     values.idpropinsi,
//     values.kodePos
//   )
//   msg.setUserdata(values.noidentitas, values.namaibu, values.tanggallahir, values.tempatlahir)

//   const response = await new MessageSender(dispatch).doPost(msg)

//   return response
// }

// export const upload_doc_koperasi = (user_id, token, uuid, name, noid, image) => async (
//   dispatch
// ) => {
//   const msg = new KoperasiMessage()
//   await msg.setInfo()
//   msg.setUpload()
//   msg.setAuth(user_id, uuid, token)
//   msg.setDocumentData(name, noid, image)

//   const response = await new MessageSender(dispatch).doPost(msg)

//   return response
// }

// export const pay_koperasi = (user_id, token, nopelanggan1) => async (dispatch) => {
//   const msg = new KoperasiMessage()
//   await msg.setInfo()
//   msg.setInquiry()
//   msg.setAuth(user_id, '', token)
//   msg.setNopelanggan1(nopelanggan1)

//   const response = await new MessageSender(dispatch).doPost(msg)

//   return response
// }

// export const upload_img_profile = (user_id, token, image) => async (dispatch) => {
//   const msg = new DocUploadMessage(UPLPROF)
//   await msg.setInfo()
//   msg.setAuth(user_id, token)
//   msg.setMedia(image)

//   const response = await new MessageSender(dispatch).doPost(msg)

//   return response
// }

// export const level_info = (uuid, token) => async () => {
//   const msg = new SummaryMessage(LEVEL)
//   msg.setToken(token)
//   msg.setUserUUID(uuid)
//   msg.setLimit(5, 0)

//   const response = await new MessageSender().doGet(msg)

//   return response
// }

// export const summary_simple = (uuid, token) => async (dispatch) => {
//   const msg = new SummaryMessage(SIMPLE)
//   msg.setToken(token)
//   msg.setUserUUID(uuid)

//   const response = await new MessageSender().doGet(msg)
//   if (response.isOK()) {
//     const msgX = new SummaryMessage()
//     msgX.merge(response)

//     dispatch(
//       setAccount({
//         is_pin_created: msgX.isPINCreated(),
//         balance: msgX.getBalance(),
//         new_mail: msgX.getNotification(),
//       })
//     )
//   }
//   return response
// }

// export const report_commission = (uuid, token, type, page) => async () => {
//   const limit = 50
//   const msg = new CommissionMessage(type)
//   msg.setToken(token)
//   msg.setUserUUID(uuid)
//   msg.setLimit(limit, (page - 1) * limit)

//   const start = DateTime.format(moment().subtract(3, 'month'), DateTime.FORMAT_DATE_YMD)
//   const end = DateTime.format(new Date(), DateTime.FORMAT_DATE_YMD)
//   msg.setDateRange(start, end)

//   const response = await new MessageSender().doGet(msg)

//   return response
// }

const setAccount = (data) => async (dispatch) => {
  dispatch({
    type: authConstant.SET_AUTH_DATA,
    payload: data,
  })
}
