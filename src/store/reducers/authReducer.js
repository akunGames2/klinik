import { authConstant } from '../constants'
// import BadgeAndroid from 'react-native-android-badge' // has been deprecated, di skip saja untuk fitur dot notif.

const initialState = {
  lp__lp_id: '',
  lp__is_pin_created: false,
  lp__user_id: '',
  lp__user_pass: '',
  lp__token: '',
  lp__balance: 0,
  lp__new_mail: 0,
  lp__user_uuid: '',
  lp__name: '',
  lp__phone: '',
  lp__email: '',
  lp__alamat: '',
  lp__province_id: 0,
  lp__province_name: '',
  lp__city_id: 0,
  lp__city_name: '',
  lp__district_id: 0,
  lp__district_name: '',
  lp__subdistrict_id: 0,
  lp__subdistrict_name: '',
  lp__kode_pos: '',
  lp__agent: '',
  lp__avatar: '',
  lp__nama_ibu: '',
  lp__tanggal_lahir: '',
  lp__tempat_lahir: '',
  lp__no_identitas: '',
  lp__role: '',
}

export default (state = initialState, action) => {
  const { payload } = action
  switch (action.type) {
    case authConstant.SET_AUTH_DATA: {
      const reset = payload === null || typeof payload !== 'object'
      if (reset) {
        return {
          ...state,
          lp__lp_id: '',
          lp__is_pin_created: false,
          lp__user_id: '',
          lp__user_pass: '',
          lp__token: '',
          lp__balance: 0,
          lp__user_uuid: '',
          lp__new_mail: 0,
          lp__role: '',
        }
      }

      return {
        ...state,
        // lp__lp_id: payload.lp_id ? payload.lp_id : state.lp__lp_id,
        // lp__is_pin_created: payload.is_pin_created
        //   ? payload.is_pin_created
        //   : state.lp__is_pin_created,
        lp__user_id: payload.user_id ? payload.user_id : state.lp__user_id,
        lp__name: payload.lp__name ? payload.lp__name : state.lp__name,
        lp__phone: payload.user_id ? payload.lp__phone : state.lp__phone,
        lp__email: payload.lp__email ? payload.lp__email : state.lp__email,
        lp__alamat: payload.lp__alamat ? payload.lp__alamat : state.lp__alamat,
        lp__role: payload.lp__role ? payload.lp__role : state.lp__role,
        // lp__user_pass: payload.user_pass ? payload.user_pass : state.lp__user_pass,
        // lp__token: payload.token ? payload.token : state.lp__token,
        // lp__balance: payload.balance || payload.balance === 0 ? payload.balance : state.lp__balance,
        // lp__user_uuid: payload.user_uuid ? payload.user_uuid : state.lp__user_uuid,
        // lp__new_mail: payload.new_mail || state.lp__new_mail,
      }
    }
    case authConstant.SET_PROFILE_DATA:
      return {
        ...state,
        lp__name: payload.name ? payload.name : state.lp__name,
        lp__phone: payload.phone ? payload.phone : state.lp__phone,
        lp__email: payload.email ? payload.email : state.lp__email,
        lp__alamat: payload.alamat ? payload.alamat : state.lp__alamat,
        lp__province_id: payload.province_id ? payload.province_id : state.lp__province_id,
        lp__province_name: payload.province_name ? payload.province_name : state.lp__province_name,
        lp__city_id: payload.city_id ? payload.city_id : state.lp__city_id,
        lp__city_name: payload.city_name ? payload.city_name : state.lp__city_name,
        lp__district_id: payload.district_id ? payload.district_id : state.lp__district_id,
        lp__district_name: payload.district_name ? payload.district_name : state.lp__district_name,
        lp__subdistrict_id: payload.subdistrict_id
          ? payload.subdistrict_id
          : state.lp__subdistrict_id,
        lp__subdistrict_name: payload.subdistrict_name
          ? payload.subdistrict_name
          : state.lp__subdistrict_name,
        lp__kode_pos: payload.kode_pos ? payload.kode_pos : state.lp__kode_pos,
        lp__agent: payload.agent ? payload.agent : state.lp__agent,
        lp__avatar: payload.avatar ? payload.avatar : state.lp__avatar,
        lp__nama_ibu: payload.nama_ibu ? payload.nama_ibu : state.lp__nama_ibu,
        lp__tanggal_lahir: payload.tanggal_lahir ? payload.tanggal_lahir : state.lp__tanggal_lahir,
        lp__tempat_lahir: payload.tempat_lahir ? payload.tempat_lahir : state.lp__tempat_lahir,
        lp__no_identitas: payload.no_identitas ? payload.no_identitas : state.lp__no_identitas,
      }
    case authConstant.UPDATE_NEW_MAIL: {
      let cur = parseInt(state.lp__new_mail, 10)
      if (Number.isNaN(cur) || cur < 1) {
        cur = 1
      }
      const total = payload === -1 ? cur - 1 : payload
      // BadgeAndroid.setBadge(total)
      return {
        ...state,
        lp__new_mail: total,
      }
    }
    default:
      return state
  }
}
