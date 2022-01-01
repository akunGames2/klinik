import { BaseMessage } from '../BaseMessage'

export default class ResetMessage extends BaseMessage {
  constructor() {
    super()

    // if (is_reset) {
    //   this.setKodeProduk('FPASS')
    //   this.setProcess('FPASS')
    // } else {
    //   this.setKodeProduk('CHPASS')
    //   this.setProcess('CHPASS')
    // }
  }

  getPath() {
    return 'auth/changepassword'
  }

  setOldPassword(password) {
    this.setKonten('password_lama', password)

    return this
  }

  setNewPassword(password) {
    this.setKonten('password_baru', password)

    return this
  }
}
