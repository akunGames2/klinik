
import { BaseMessage } from '../BaseMessage'

export default class CardBabyMessage extends BaseMessage {
  constructor(path) {
    super(path)
    this.path = path    
  }

  getPath() {
    let path

    if(this.path =='GETLIST') {
      path =  'cardbaby/getlistcardbaby'
    } else if(this.path =='INSERT') {
      path =  'cardbaby/insertcardbaby'
    } else if(this.path =='GETDATA') {
      path =  'cardbaby/getdetailcardbaby'
    } else if(this.path =='DELETE') {
      path =  'cardbaby/deletecardbaby'
    } else if(this.path =='UPDATE') {
      path =  'cardbaby/updatecardbaby'
    } else if(this.path =='GETREPORT') {
      path =  'pdfview/getreportcardbaby'
    } 
    return path
  }

  setId(id) {
    return this.data.id = id
  }

  setUsername(username) {
    return this.data.username = username
  }

  setIdKartuBayi(id) {
    return this.data.id_kartu_bayi = id
  }

  setIdJenisImunisasi(id) {
    return this.data.id_jenis_imunisasi = id
  }

  setIdImunisasi(id) {
    return this.data.id_imunisasi = id
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
