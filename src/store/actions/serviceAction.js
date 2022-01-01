
import moment from 'moment'
import MessageSender from '../../library/handler/MessageSender'
import Logger from '../../library/helper/Logger'
import MedicineMessage from '../../messages/medicine/MedicineMessage'
import ServiceMessage from '../../messages/service/ServiceMessage'

export const get_list_service_data = () => async (dispatch) => {
  const msg = new ServiceMessage('GETLIST')

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const insert_service = (data) => async (dispatch) => {
  const msg = new ServiceMessage('INSERT')
  msg.setJenisLayanan(data.nama_layanan)
  msg.setTarif(data.tarif)
  msg.setKeterangan(data.keterangan)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}

export const get_detail_service_data = (data) => async (dispatch) => {
  const msg = new ServiceMessage('GETDATA')
  msg.setId(data)
  
  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}

export const delete_service_data = (data) => async (dispatch) => {
  const msg = new ServiceMessage('DELETE')
  msg.setId(data)

  const response = await new MessageSender(dispatch).doGet(msg, true, false)

  return response
}


export const update_service = (data) => async (dispatch) => {
  const msg = new ServiceMessage('UPDATE')
  msg.setIdKonten(data.id_layanan)
  msg.setJenisLayanan(data.jenis_layanan)
  msg.setTarif(data.tarif)
  msg.setKeterangan(data.keterangan)
  // msg.setSupplier(data.supplier)
  // msg.setJumlah(data.jumlah)
  // msg.setHarga(data.harga)
  // msg.setSubtotal(data.subtotal)
  
  const response = await new MessageSender(dispatch).doPost(msg)
  
  return response
}