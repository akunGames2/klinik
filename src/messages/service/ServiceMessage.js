
import { BaseMessage } from '../BaseMessage'
import Logger from '../../library/helper/Logger'

export default class ServiceMessage extends BaseMessage {
  constructor(path) {
    super(path)
    this.path = path    
  }

  getPath() {
    let path

    if(this.path =='GETLIST') {
      path =  'service/getlistservice'
    } else if(this.path =='INSERT') {
      path =  'service/insertservice'
    } else if(this.path =='GETDATA') {
      path =  'service/getdetailservice'
    } else if(this.path =='DELETE') {
      path =  'service/deleteservice'
    } else if(this.path =='UPDATE') {
      path =  'service/updateservice'
    } 
    return path
  }

  setId(id) {
    return this.data.id = id
  }

  setIdKonten(id) {
    return this.setKonten('id_layanan', id)
  }

  setJenisLayanan(nama_layanan) {
    return this.setKonten('nama_layanan', nama_layanan)
  }

  setKeterangan(keterangan) {
    return this.setKonten('keterangan', keterangan)
  }

  setTarif(tarif) {
    return this.setKonten('tarif', tarif)
  }
}
