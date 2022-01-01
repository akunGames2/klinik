
import { BaseMessage } from '../BaseMessage'

export default class DetailAccountMessage extends BaseMessage {
  constructor(path) {
    super(path)
    this.path = path    
  }

  getPath() {
    let path

    if(this.path =='GET') {
      path =  'profile/getuserdata'
    } else if(this.path =='UPDATE') {
      path =  'profile/updateuserdata'
    } 
    return path
  }

  setId(id) {
    return this.data.id = id
  }

  setUsernameUser(data) {
    return this.data.username = data
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
