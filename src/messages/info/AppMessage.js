
import { BaseMessage } from '../BaseMessage'
import Var from '../../library/helper/Var'

export class AppMessage extends BaseMessage {
  constructor() {
    super()    
  }

  getPath() {
    return ''
  }

  isNeedUpdate() {
    return Var.toBoolean(this.getDataAsMap().needupdate)
  }

  getUpdateInfo() {
    return Var.toString(this.getDataAsMap().updateinfo)
  }

  getUpdateLink() {
    return Var.toString(this.getDataAsMap().link)
  }

  getUpdateVersion() {
    return Var.toInt(this.getDataAsMap().appversion)
  }
}
