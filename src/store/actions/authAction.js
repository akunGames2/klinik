import { authConstant, storeConstant } from '../constants'
import MessageSender from '../../library/handler/MessageSender'
import LoginMessage from '../../messages/auth/LoginMessage'

import RegisterMessage from '../../messages/auth/RegisterMessage'
import DetailAccountMessage from '../../messages/account/DetailAccountMessage'
import ResetMessage from '../../messages/auth/ResetMessage'
import PermissionMessage from '../../messages/auth/PermissionMessage'

export const checkSponsor = (sponsor) => async (dispatch) => {
  const msg = new CheckSponsorMessage()
  await msg.setInfo()
  msg.setSponsor(sponsor)

  const response = await new MessageSender(dispatch).doGet(msg)
  return response
}

export const register = (
  username,
  password,
  name,
  email,
  phone,
  address,
  age,
  job,
  study,
  jk,
  kia
) => async (dispatch) => {
  const msg = new RegisterMessage()

  msg.setUsername(username)
  msg.setPassword(password)
  msg.setNama(name)
  msg.setEmail(email)
  msg.setPhone(phone)
  msg.setAddress(address)
  msg.setAge(age)
  msg.setJob(job)
  msg.setStudy(study)
  msg.setJk(jk)
  msg.setKia(kia)
  const response = await new MessageSender(dispatch).doPost(msg, false, true)
  return response
}

export const login = (uname, password) => async (dispatch) => {
  const msg = new LoginMessage()
  // await msg.setInfo()
  msg.setUsername(uname)
  msg.setPassword(password)

  let response = await new MessageSender(dispatch).doPost(msg)
  if (response.isSuccess()) {
    const login_resp = new LoginMessage()
    login_resp.merge(response)

    const username = login_resp.getUsernameDB()
    const name = login_resp.getNama()
    const phone = login_resp.getNotelp()
    const email = login_resp.getEmail()
    const alamat = login_resp.getAlamat()
    const role = login_resp.getNamaRole()
    dispatch(
      setAccount({
        user_id: username,
        lp__name: name,
        lp__phone: phone,
        lp__email: email,
        lp__alamat: alamat,
        lp__alamat: alamat,
        lp__role: role,
      })
    )

    // const is_phone_valid = login_resp.isPhoneValid()
    // const is_email_valid = login_resp.isEmailValid()
    
    // response = await dispatch(detail_account(username, uuid, token, true))
    // if (reg_id) {
    //   dispatch(register_device(username, uuid, token, reg_id))
    // }
    // linkqu_fb.messaging().subscribeToTopic('logged_in')

    // response.is_phone_valid = is_phone_valid
    // response.is_email_valid = is_email_valid
  }
  return response
}

export const register_device = (username, uuid, token, reg_id) => async () => {
  const msg = new DeviceMessage()
  await msg.setInfo()
  msg.setUsername(username)
  msg.setToken(token)
  msg.setUserUUID(uuid)
  msg.setRegisterId(reg_id)

  let response = await new MessageSender().doPost(msg)
}

export const logout = (navigate) => async (dispatch) => {
  // const msg = new LogoutMessage()
  // await msg.setInfo()
  // msg.setUsername(username)
  // msg.setToken(token)
  // new MessageSender().doPost(msg)

  dispatch({
    type: authConstant.SET_AUTH_DATA,
    payload: null,
  })
  dispatch({
    type: storeConstant.ID_TOKO,
    payload: null,
  })

  // linkqu_fb.messaging().unsubscribeFromTopic('logged_in')
  navigate
}

export const get_permission = (uname, code) => async (dispatch) => {
  const msg = new PermissionMessage()
  msg.setUsername(uname)
  msg.setCode(code)

  let response = await new MessageSender(dispatch).doPost(msg)
  return response
}

// export const activate = (uname, password, otp, is_retry, reg_id) => async (dispatch) => {
//   const msg = new ActivationMessage()
//   await msg.setInfo()
//   msg.setUsername(uname)
//   if (is_retry) {
//     msg.setRetry()
//   } else {
//     msg.setToken(otp)
//     msg.setPassword(password)
//   }

//   let response = await new MessageSender(dispatch).doPost(msg)
//   if (!is_retry && response.isOK()) {
//     const username = response.getUsername()
//     const token = response.getToken()
//     const uuid = response.getUserUUID()
//     dispatch(
//       setAccount({
//         user_id: username,
//         token,
//         user_uuid: uuid,
//       })
//     )

//     response = await dispatch(list_product(username, uuid, token))
//     response = await dispatch(detail_account(username, uuid, token, true))
//     if (reg_id) {
//       dispatch(register_device(username, uuid, token, reg_id))
//     }
//     linkqu_fb.messaging().subscribeToTopic('logged_in')
//   }
//   return response
// }

export const detail_account = (user_id, user_uuid, token, loading) => async (dispatch) => {
  const msg = new DetailAccountMessage()
  await msg.setInfo()
  msg.setAuth(user_id, user_uuid, token)
  msg.setGetAccountData()
  msg.setKonten('useimagelink', true)

  const response = await new MessageSender(loading ? dispatch : null).doPost(msg)
  if (response.isOK()) {
    const msgX = new DetailAccountMessage()
    msgX.merge(response)

    dispatch(
      setAccount({
        is_pin_created: msgX.isPINCreated(),
        balance: msgX.getBalance(),
      })
    )
    dispatch(
      setProfile({
        name: msgX.getNama(),
        phone: msgX.getNoHP(),
        email: msgX.getEmail(),
        alamat: msgX.getAlamat(),
        province_id: msgX.getIdpropinsi(),
        province_name: msgX.getNamapropinsi(),
        city_id: msgX.getIdkota(),
        city_name: msgX.getNamakota(),
        district_id: msgX.getIdkecamatan(),
        district_name: msgX.getNamakecamatan(),
        subdistrict_id: msgX.getIdKelurahan(),
        subdistrict_name: msgX.getNamaKelurahan(),
        kode_pos: msgX.getKodePos(),
        agent: msgX.getTipeAgen(),
        avatar: msgX.getImageProfile(),
        nama_ibu: msgX.getNamaibu(),
        tanggal_lahir: msgX.getTanggalLahir(),
        tempat_lahir: msgX.getTempatlahir(),
        no_identitas: msgX.getNoidentitas(),
      })
    )
  }
  return response
}

export const save_account = (user_id, user_uuid, token, konten) => async (dispatch) => {
  const msg = new DetailAccountMessage()
  await msg.setInfo()
  msg.setAuth(user_id, user_uuid, token)
  msg.setPost()
  msg.setKonten('useimagelink', true)
  Object.keys(konten).forEach((k) => {
    msg.setKonten(k, konten[k])
  })

  const response = await new MessageSender(dispatch).doPost(msg)

  return response
}

export const change_password = (data) => async (dispatch) => {
  const msg = new ResetMessage()
  msg.setUsername(data.username)
  msg.setOldPassword(data.oldpassword)
  msg.setNewPassword(data.newpassword)  

  const response = await new MessageSender(dispatch).doPost(msg)
  return response
}

// export const change_pin = (uname, token, old_pin, new_pin) => async (dispatch) => {
//   const msg = new RegisterPINMessage(UBAHPIN)
//   await msg.setInfo()
//   msg.setAuth(uname, '', token)
//   msg.changePIN(old_pin, new_pin)

//   const response = await new MessageSender(dispatch).doPost(msg)

//   return response
// }

// export const register_pin = (uname, token, pin) => async (dispatch) => {
//   const msg = new RegisterPINMessage(CREATEPIN)
//   await msg.setInfo()
//   msg.setAuth(uname, '', token)
//   msg.setPIN(pin)

//   const response = await new MessageSender(dispatch).doPost(msg)
//   if (response.isOK()) {
//     dispatch(
//       setAccount({
//         is_pin_created: true,
//       })
//     )
//   }
//   return response
// }

// export const reset_pin = (uname, token) => async (dispatch) => {
//   const msg = new RegisterPINMessage(RESETPIN)
//   await msg.setInfo()
//   msg.setAuth(uname, '', token)

//   const response = await new MessageSender(dispatch).doPost(msg)
//   if (response.isOK()) {
//     dispatch(
//       setAccount({
//         is_pin_created: true,
//       })
//     )
//   }
//   return response
// }

const setAccount = (data) => async (dispatch) => {
  dispatch({
    type: authConstant.SET_AUTH_DATA,
    payload: data,
  })
}

const setProfile = (profile) => async (dispatch) => {
  dispatch({
    type: authConstant.SET_PROFILE_DATA,
    payload: profile,
  })
}
