
import { BaseMessage } from '../BaseMessage'
import Logger from '../../library/helper/Logger'

export default class PrescriptionMessage extends BaseMessage {
  constructor(path) {
    super(path)
    this.path = path    
  }

  getPath() {
    let path

    if(this.path =='GETLIST') {
      path =  'prescription/getlistprescription'
    } else if(this.path =='INSERT') {
      path =  'prescription/insertprescription'
    } else if(this.path =='GETDATA') {
      path =  'prescription/getdetailprescription'
    } else if(this.path =='DELETE') {
      path =  'prescription/deleteprescription'
    } else if(this.path =='UPDATE') {
      path =  'prescription/updateprescription'
    } 
    return path
  }

  setId(id) {
    return this.data.id = id
  }

  setIdResep2(id) {
    return this.data.id_resep = id
  }

  setIdDetilResep2(id) {
    return this.data.id_detil_resep = id
  }
  
  setIdDetilResep(id_detil_resep) {
    return this.setKonten('id_detil_resep', id_detil_resep)
  }

  setIdResep(id_resep) {
    return this.setKonten('id_resep', id_resep)
  }

  setIdLayanan(id_layanan) {
    return this.setKonten('id_layanan', id_layanan)
  }

  setKeterangan(keterangan) {
    return this.setKonten('keterangan', keterangan)
  }

  setDosis(dosis) {
    return this.setKonten('dosis', dosis)
  }

  setPasien(id_pasien) {
    return this.setKonten('id_pasien', id_pasien)
  }

  setObat(id_obat) {
    return this.setKonten('id_obat', id_obat)
  }
}
