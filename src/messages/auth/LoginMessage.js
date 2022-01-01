import { BaseMessage } from '../BaseMessage'
import Var from '../../library/helper/Var'

export default class LoginMessage extends BaseMessage {
  constructor() {
    super()
  }

  getPath() {
    return 'auth/login'
  }

  getNotelp() {
    return Var.toString(this.data.data.notelp)
  }

  getEmail() {
    return Var.toString(this.data.data.email)
  }

  getAlamat() {
    return Var.toString(this.data.data.alamat)
  }

  getNamaRole() {
    return Var.toString(this.data.data.nama_role)
  }

  getNama() {
    return Var.toString(this.data.data.nama)
  }

  getUsernameDB() {
    return Var.toString(this.data.data.username)
  }
}
