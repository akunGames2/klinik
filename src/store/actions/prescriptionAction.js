import MessageSender from '../../library/handler/MessageSender'
import PrescriptionMessage from '../../messages/prescription/PrescriptionMessage'

export const get_data_presciption = () => async (dispatch) => {
  const msg = new PrescriptionMessage('GETLIST')

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const get_detail_presciption_data = (data) => async (dispatch) => {
  const msg = new PrescriptionMessage('GETDATA')
  msg.setId(data)
  
  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const update_presciption = (data) => async (dispatch) => {
  const msg = new PrescriptionMessage('UPDATE')
  msg.setIdDetilResep(data.id_detil_resep)
  msg.setIdResep(data.id_resep)
  msg.setIdLayanan(data.id_layanan)
  msg.setPasien(data.id_pasien)
  msg.setObat(data.id_obat)
  msg.setDosis(data.dosis)
  msg.setKeterangan(data.keterangan)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}


export const delete_presciption_data = (data1,data2) => async (dispatch) => {
  const msg = new PrescriptionMessage('DELETE')
  msg.setIdDetilResep2(data2)
  msg.setIdResep2(data1)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const insert_presciption = (data) => async (dispatch) => {
  const msg = new PrescriptionMessage('INSERT')
  msg.setIdLayanan(data.id_layanan)
  msg.setPasien(data.id_pasien)
  msg.setObat(data.id_obat)
  msg.setDosis(data.dosis)
  msg.setKeterangan(data.keterangan)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}