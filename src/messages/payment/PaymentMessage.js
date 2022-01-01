
import { BaseMessage } from '../BaseMessage'
import Logger from '../../library/helper/Logger'

export default class PaymentMessage extends BaseMessage {
  constructor(path) {
    super(path)

    this.path = path    
  }

  getPath() {
    let path
    
    if(this.path =='GETLIST') {
      path =  'payment/getlistpayment'
    } else if(this.path =='INSERT') {
      path =  'payment/insertpayment2'
    } else if(this.path =='GETDATA') {
      path =  'payment/getdetailpayment'
    } else if(this.path =='DELETE') {
      path =  'payment/deletepayment'
    } else if(this.path =='UPDATE') {
      path =  'payment/updatepayment2'
    }
    return path
  }

  isMultipart() {
    return true
  }

  setId(id) {
    return this.data.id = id
  }
  setIdBayar(id_bayar) {
    return this.setKonten('id_bayar', id_bayar)
  }
  setIdResep(id_resep) {
    return this.setKonten('id_resep', id_resep)
  }
  
  setIdUser(id_user) {
    return this.setKonten('id_user', id_user)
  }
  
  setIdUserNoKonten(id_user) {
    return this.data.id_user = id_user
  }

  setIdBayarNoKonten(id_bayar) {
    return this.data.id_bayar = id_bayar
  }

  setIdLayananNoKonten(id_layanan) {
    return this.data.id_layanan = id_layanan
  }

  setImage(image) {
    return this.data.image = image
  }

  setIdResepNoKonten(id_resep) {
    return this.data.id_resep = id_resep
  }

  setKeteranganNoKonten(keterangan) {
    return this.data.keterangan = keterangan
  }

  setTanggalNoKonten(tanggal) {
    return this.data.tanggal = tanggal
  }
  
  setTotalNoKonten(total_bayar) {
    return this.data.total_bayar = total_bayar
  }

  setUsername(username) {
    return this.data.username = username
  }

  setIdLayanan(id_layanan) {
    return this.setKonten('id_layanan', id_layanan)
  }

  setKeterangan(keterangan) {
    return this.setKonten('keterangan', keterangan)
  }

  setTanggal(tanggal) {
    return this.setKonten('tanggal', tanggal)
  }
  
  setTotal(total_bayar) {
    return this.setKonten('total_bayar', total_bayar)
  }
  
}
