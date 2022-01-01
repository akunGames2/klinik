
import MessageSender from '../../library/handler/MessageSender'
import ToolsMessage from '../../messages/tools/ToolsMessage'
import PaymentMessage from '../../messages/payment/PaymentMessage'

export const get_list_payment_data = (data) => async (dispatch) => {
  const msg = new PaymentMessage('GETLIST')
  msg.setUsername(data)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const delete_payment_data = (data) => async (dispatch) => {
  const msg = new PaymentMessage('DELETE')
  msg.setId(data)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}


export const get_detail_payment_data = (data) => async (dispatch) => {
  const msg = new PaymentMessage('GETDATA')
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

export const update_payment = (data) => async (dispatch) => {
  const msg = new PaymentMessage('UPDATE')
  msg.isMultipart()
  msg.setIdBayarNoKonten(data.id_bayar)
  msg.setIdUserNoKonten(data.id_user)
  msg.setIdResepNoKonten(data.id_resep)
  msg.setIdLayananNoKonten(data.id_layanan)
  msg.setKeteranganNoKonten(data.keterangan)
  msg.setTanggalNoKonten(data.tanggal)
  msg.setTotalNoKonten(data.total_bayar)
  msg.setImage(data.image)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}

export const insert_payment = (data) => async (dispatch) => {
  const msg = new PaymentMessage('INSERT')
  msg.isMultipart()
  msg.setIdUserNoKonten(data.id_user)
  msg.setIdResepNoKonten(data.id_resep)
  msg.setIdLayananNoKonten(data.id_layanan)
  msg.setKeteranganNoKonten(data.keterangan)
  msg.setTanggalNoKonten(data.tanggal)
  msg.setTotalNoKonten(data.total_bayar)
  msg.setImage(data.image)

  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}
