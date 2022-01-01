import React from 'react'
import moment from 'moment'
import idlocale from 'moment/locale/id'
import { Alert, Platform, PermissionsAndroid } from 'react-native'
// import { setImagePreview } from '../store/actions/globalAction'
import { setLoading } from '../store/actions/loadingAction'
import store from '../store'
import { globalConstant } from '../store/constants'
import Logger from '../library/helper/Logger'
import { get_permission, logout } from '../store/actions/authAction'

export class BaseScreen extends React.Component {
  constructor(props) {
    super(props)

    moment.updateLocale('id', idlocale)
  }

  async componentDidMount() {
    const { dispatch, navigation } = this.props
  }

  async get_permission(code) {
    // this.props.dispatch(get_permission(this.props.lp__username))
    let response = await this.props.dispatch(
      get_permission(this.props.lp__user_id, code)
    )
    if(response.isSuccess()) {
      const permission = response.data.data
      let data = [], color = ''
      for (const access of permission) {
        let item = {
          "code" : access.code,
          "access" : access.hak_akses,
          "modul": access.nama_modul,
          "title": access.nama_modul,
          "image": access.image,
          "id_modul": access.id_modul,
          "id_modul_parent": access.id_modul_parent,
          "route": access.route,
          "color": access.color
        }
        color = access.color
        data.push(item)
      }
      return this.check_permission(data, color)
    } else {
      this.showError(response.getMessage())
      this.props.dispatch(logout(this.props.navigation.navigate(NavKey.LOGIN)))
    }
  }

  check_permission(data, color) {
    for (const item of data) {
      if(item.title == "dashboard" && !item.access.includes("READ")) {
        this.props.dispatch(logout(this.props.navigation.navigate(NavKey.LOGIN)))
      }
      if(item.access.includes("READ")) {
        item.read = true
      }
      if(item.access.includes("CREATE")) {
        item.create = true
      }
      if(item.access.includes("UPDATE")) {
        item.update = true
      }
      if(item.access.includes("DELETE")) {
        item.delete = true
      }
      if(item.access.includes("CHANGEPASSWORD")) {
        item.changepassword = true
      }
      if(item.access.includes("UPLOADPROOF")) {
        item.uploadproof = true
      }
    }
    // data.splice(0, 1);
    data = data.length > 1 ? data : data[0]
    data.color = color
    return data
  }

  showError(txt, callback) {
    Alert.alert('Perhatian', txt, [
      {
        text: 'OK',
        onPress: () => {
          if (callback) {
            callback()
          }
        },
      },
    ])
  }

  showSuccess(txt, callback, data = '') {
    Alert.alert('Sukses', txt + ' ' + data, [
      {
        text: 'OK',
        onPress: () => {
          if (callback) {
            callback()
          }
        },
      },
    ])
  }
}
