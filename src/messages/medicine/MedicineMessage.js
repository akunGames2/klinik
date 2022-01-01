
import { BaseMessage } from '../BaseMessage'
import Logger from '../../library/helper/Logger'

export default class MedicineMessage extends BaseMessage {
  constructor(path) {
    super(path)
    this.path = path    
  }

  getPath() {
    let path
    
    if(this.path =='GETLIST') {
      path =  'medicine/getlistmedicine'
    } else if(this.path =='INSERT') {
      path =  'medicine/insertmedicine'
    } else if(this.path =='GETDATA') {
      path =  'medicine/getdetailmedicine'
    } else if(this.path =='DELETE') {
      path =  'medicine/deletemedicine'
    } else if(this.path =='UPDATE') {
      path =  'medicine/updatemedicine'
    } else if(this.path =='GETLISTPURCHASE') {
      path =  'medicine/getlistpurchasemedicine'
    } else if(this.path =='INSERTPURCHASE') {
      path =  'medicine/insertpurchasemedicine'
    } else if(this.path =='GETDATAPURCHASE') {
      path =  'medicine/getdetailpurchasemedicine'
    } else if(this.path =='DELETEPURCHASE') {
      path =  'medicine/deletepurchasemedicine'
    } else if(this.path =='UPDATEPURCHASE') {
      path =  'medicine/updatepurchasemedicine'
    } 
    return path
  }

  setId(id) {
    return this.data.id = id
  }

  setIdKonten(id) {
    return this.setKonten('id_obat', id)
  }

  
  setIdDetilPurchaseMedicine(id) {
    return this.setKonten('id_detil_beli_obat', id)
  }

  setNama(nama) {
    return this.setKonten('nama', nama)
  }

  setKeterangan(keterangan) {
    return this.setKonten('keterangan', keterangan)
  }

  setIdMedicine(id_obat) {
    return this.setKonten('id_obat', id_obat)
  }

  setIdPurchaseMedicine(id_beli_obat) {
    return this.setKonten('id_beli_obat', id_beli_obat)
  }

  setIdUser(id_user) {
    return this.setKonten('id_user', id_user)
  }
  
  setFungsi(fungsi) {
    return this.setKonten('fungsi', fungsi)
  }
  
  setSatuan(satuan) {
    return this.setKonten('satuan', satuan)
  }
  
  setJenis(jenis) {
    return this.setKonten('jenis', jenis)
  }

  setKomposisi(komposisi) {
    return this.setKonten('komposisi', komposisi)
  }
  
  setSupplier(supplier) {
    return this.setKonten('supplier', supplier)
  }
  
  setJumlah(jumlah) {
    return this.setKonten('jumlah', jumlah)
  }
  
  setHarga(harga) {
    return this.setKonten('harga', harga)
  }
  
  setSubtotal(subtotal) {
    return this.setKonten('subtotal', subtotal)
  }
  
}
