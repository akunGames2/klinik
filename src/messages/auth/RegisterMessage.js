import { BaseMessage } from '../BaseMessage'
import Var from '../../library/helper/Var'

export default class RegisterMessage extends BaseMessage {
  constructor() {
    super()
  }

  getPath() {
    return 'auth/register'
  }

}
