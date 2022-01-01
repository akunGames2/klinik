
import { BaseMessage } from '../BaseMessage'

export default class CardKbMessage extends BaseMessage {
  constructor(path) {
    super(path)
    this.path = path    
  }

  getPath() {
    let path

    if(this.path =='GETLIST') {
      path =  'cardkb/getlistcardkb'
    } else if(this.path =='INSERT') {
      path =  'cardkb/insertcardkb'
    } else if(this.path =='GETDATA') {
      path =  'cardkb/getdetailcardkb'
    } else if(this.path =='DELETE') {
      path =  'cardkb/deletecardkb'
    } else if(this.path =='UPDATE') {
      path =  'cardkb/updatecardkb'
    } else if(this.path =='GETREPORT') {
      path =  'pdfview/getreportcardkb'
    } 
    return path
  }

  setId(id) {
    return this.data.id = id
  }

  setUsername(username) {
    return this.data.username = username
  }
  
  setIdKartuKB(id) {
    return this.data.id_kartu_kb = id
  }

  setIdPemeriksaanKB(id) {
    return this.data.id_pemeriksaan_kb = id
  }

  setIdpesertaKB(id) {
    return this.data.id_peserta_kb = id
  }

  setIdSuami(id) {
    return this.data.id_suami = id
  }
  
  setData(data) {
    return this.data.konten = data
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
