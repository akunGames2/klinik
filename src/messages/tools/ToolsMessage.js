
import { BaseMessage } from '../BaseMessage'
import Logger from '../../library/helper/Logger'

export default class ToolsMessage extends BaseMessage {
  constructor(path) {
    super(path)

    this.path = path    
  }

  getPath() {
    let path
    
    if(this.path =='GETLIST') {
      path =  'tools/getlisttools'
    } else if(this.path =='INSERT') {
      path =  'tools/inserttool'
    } else if(this.path =='GETDATA') {
      path =  'tools/getdetailtools'
    } else if(this.path =='DELETE') {
      path =  'tools/deletetools'
    } else if(this.path =='UPDATE') {
      path =  'tools/updatetool'
    } else if(this.path =='GETLISTPURCHASE') {
      path =  'tools/getlistpurchasetools'
    } else if(this.path =='GETDATAPURCHASE') {
      path =  'tools/getdetailpurchasetools'
    } else if(this.path =='INSERTPURCHASE') {
      path =  'tools/insertpurchasetool'
    } else if(this.path =='DELETEPURCHASE') {
      path =  'tools/deletepurchasetools'
    } else if(this.path =='UPDATEPURCHASE') {
      path =  'tools/updatepurchasetool'
    }
    return path
  }

  setId(id) {
    return this.data.id = id
  }

  setIdKonten(id) {
    return this.setKonten('id_alkes', id)
  }
  
  setIdPurchaseTools(id) {
    return this.setKonten('id_beli_alkes', id)
  }

  setIdDetilPurchaseTools(id) {
    return this.setKonten('id_detil_beli_alkes', id)
  }

  setNama(nama) {
    return this.setKonten('nama', nama)
  }
  
  setFungsi(fungsi) {
    return this.setKonten('fungsi', fungsi)
  }
  
  setSatuan(satuan) {
    return this.setKonten('satuan', satuan)
  }
  
  setKeterangan(keterangan) {
    return this.setKonten('keterangan', keterangan)
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
