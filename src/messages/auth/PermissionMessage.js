import Var from '../../library/helper/Var'
import { BaseMessage } from '../BaseMessage'

export default class PermissionMessage extends BaseMessage {
  constructor() {
    super()
  }

  getPath() {
    return 'auth/getpermission'
  }

  getPermission() {
    return Var.toObject(this.data.data)
  }
}
