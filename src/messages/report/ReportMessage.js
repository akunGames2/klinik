
import { BaseMessage } from '../BaseMessage'
import Logger from '../../library/helper/Logger'

export default class ReportMessage extends BaseMessage {
  constructor(path) {
    super(path)

    this.path = path    
  }

  getPath() {
    let path
    
    if(this.path =='MEDICINE') {
      path =  'pdfview/getreportmedicine'
    } else if(this.path =='PURCHASEMEDICINE') {
      path =  'pdfview/getreportpurchasemedicine'
    } else if(this.path =='TOOLS') {
      path =  'pdfview/getreporttool'
    } else if(this.path =='PURCHASETOOLS') {
      path =  'pdfview/getreportpurchasetools'
    } else if(this.path =='PAYMENT') {
      path =  'pdfview/getreportpayment'
    } else if(this.path =='PASIEN') {
      path =  'pdfview/getreportpasien'
    } else {
      path =  'report/getlist'
    }
    return path
  }

  setId(id) {
    return this.data.id = id
  }

  setIdKonten(id) {
    return this.setKonten('id_alkes', id)
  }
  
}
