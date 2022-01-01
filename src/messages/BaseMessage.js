
import Var from '../library/helper/Var'

export const RESULT_OK = '00'
export const RESULT_SUCCESS = true
// export const RESULT_SUCCESS = 'SUCCESS'
export const RESULT_NO_DATA = '999'
export const RESULT_BALANCE_INSUFFICIENT = '06'
export const RESULT_ACCOUNT_UNACTIVATED = '555'
export const RESULT_ACCOUNT_UNVERIFIED = '556'

export class BaseMessage {
  constructor() {
    this.data = {
    }
  }


  merge(message) {
    if (message instanceof BaseMessage) {
      this.data = { ...this.data, ...message.getData() }
    } else if (typeof message === 'object') {
      this.data = { ...this.data, ...message }
    }
  }

  setCode(code) {
    return this.setKonten('code', code)
  }
  
  getPath() {
    return ''
  }

  getData() {
    return this.data
  }


  getKonten(key) {
    if (key) {
      return this.getKonten()[key]
    }
    return Var.toObject(this.data.konten)
  }

  setKonten(key, value) {
    if (typeof this.data.konten === 'undefined') {
      this.data.konten = {}
    }
    this.data.konten[key] = value

    return this
  }

  getMessage() {
    return Var.toString(this.data.message)
  }

  getMessagetype() {
    return Var.toString(this.data.messagetype)
  }

  setMessagetype(messagetype) {
    this.data.messagetype = messagetype

    return this
  }

  getStatus() {
    return Var.toBoolean(this.data.status)
  }

  isOK() {
    return this.getRc() === RESULT_OK
  }

  isSuccess() {
    return this.getStatus() === RESULT_SUCCESS
  }

  isNoData() {
    return this.getRc() === RESULT_NO_DATA
  }

  getUsername() {
    return Var.toString(this.getKonten('username'))
  }

  setUsername(username) {
    return this.setKonten('username', username)
  }
  
  setIdUser(id_user) {
    return this.setKonten('id_user', id_user)
  }

  setNotelp(telpon) {
    return this.setKonten('telpon', telpon)
  }

  setAlamat(alamat) {
    return this.setKonten('alamat', alamat)
  }

  getPassword() {
    return Var.toString(this.getKonten('password'))
  }

  setPassword(password) {
    return this.setKonten('password', password)
  }

  setNama(nama) {
    return this.setKonten('nama', nama)
  }

  setPhone(phone) {
    return this.setKonten('phone', phone)
  }

  setEmail(email) {
    return this.setKonten('email', email)
  }

  setAddress(address) {
    return this.setKonten('address', address)
  }

  setAge(age) {
    return this.setKonten('age', age)
  }

  setJob(job) {
    return this.setKonten('job', job)
  }

  setStudy(study) {
    return this.setKonten('study', study)
  }

  setJk(jk) {
    return this.setKonten('jk', jk)
  }

  setKia(kia) {
    return this.setKonten('kia', kia)
  }

  // setBalance(balance) {
  //   this.setKonten('balance', balance)

  //   return this
  // }

  // getBalance() {
  //   return Var.toFloat(this.getKonten('balance'))
  // }

  toString() {
    return JSON.stringify(this.data)
  }

  getTableData() {
    return Var.toObject(this.getKonten('tabledata'))
  }

  getDataAsMap() {
    return Var.toObject(this.data.data)
  }

  getDataAsList() {
    return Var.toList(this.data.data)
  }

  getFirstDataAsList() {
    return Var.getFirstArray(this.data.data)
  }

  getTotal() {
    return Var.toInt(this.data.total, 0)
  }
}
