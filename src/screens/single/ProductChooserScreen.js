import React from 'react'
import { View, ScrollView } from 'react-native'
import { ListItem, SearchBar, Avatar } from 'react-native-elements'
import debounce from 'lodash/debounce'

import { connect } from 'react-redux'
import { BaseScreen } from '../BaseScreen'
import Styles from '../../constants/Styles'
import Dimens from '../../constants/Dimens'
import { LoginInstruction } from '../../components/global/LoginInstruction'
import Colors from '../../constants/Colors'
import Logger from '../../library/helper/Logger'
import { get_list_medicine_data } from '../../store/actions/medicineAction'
import { get_list_tool_data } from '../../store/actions/toolsAction'
import { get_list_checking_data } from '../../store/actions/checkingAction'
import { get_data_role, get_list_user_data } from '../../store/actions/UserAction'
import { get_list_service_data } from '../../store/actions/serviceAction'
import { get_data_presciption } from '../../store/actions/prescriptionAction'

class ProductChooserScreen extends BaseScreen {
  constructor(props) {
    super(props)
    const { params } = props.navigation.state

    this.callback = params.callback
    // this.group = params.group
    // this.avatar = params.avatar
    // this.defined = params.defined
    // this.state = { filter: '', filter_delay: '' }
    this.state = { 
      data: []
    }

    // this.onChangeText = this.onChangeText.bind(this)
    // this.onChangeFilter = this.onChangeFilter.bind(this)
    // this.delayChange = debounce(this.onChangeFilter, 500)
  }

  render() {
    // if (this.props.lp__user_id) {
      // let products
      // if (this.defined instanceof Array && this.defined.length > 0) {
      //   products = this.defined
      // } else {
      //   let lpg = this.props.lp__product_billpayment
      //   if (this.group === 'ALL') {
      //     products = []
      //     Object.keys(lpg).forEach((key) => {
      //       const fd = lpg[key].dataproduk
      //       if (fd instanceof Array) {
      //         products.push(...fd)
      //       }
      //     })
      //   } else if (lpg && typeof lpg === 'object' && typeof lpg[this.group] === 'object') {
      //     products = lpg[this.group].dataproduk
      //   } else {
      //     lpg = this.props.lp__product_game
      //     if (lpg && typeof lpg === 'object' && typeof lpg[this.group] === 'object') {
      //       products = lpg[this.group].dataproduk
      //     } else {
      //       products = []
      //     }
      //   }
      // }
      // let ava = this.avatar
      //   ? {
      //       rounded: false,
      //       source: { uri: this.avatar },            
      //       size: 'medium',
      //       imageProps: { resizeMode: 'contain' },
      //       overlayContainerStyle: { backgroundColor: Colors.background },
      //       placeholderStyle: { backgroundColor: Colors.background },
      //     }
      //   : null
      return (
        <View style={Styles.outerContainer}>
          {/* <SearchBar
            placeholder="Cari layanan..."
            onChangeText={this.onChangeText}
            value={this.state.filter}
          /> */}
          <ScrollView
            style={Styles.container}
            contentContainerStyle={Styles.contentContainer}
            keyboardShouldPersistTaps="always"
          >
            {this.state.data
              // .filter(
              //   (row) =>
              //     this.state.filter_delay === '' ||
              //     row.namaproduk.toLowerCase().indexOf(this.state.filter_delay.toLowerCase()) >
              //       -1 ||
              //     row.idproduk.toLowerCase().indexOf(this.state.filter_delay.toLowerCase()) > -1
              // )
              .map((row, i) => {
                let id = '', nama= ''
                if(this.props.navigation.state.params.mode == 'MEDICINE') {
                  id = row.id_obat
                  nama = row.nama
                } else if(this.props.navigation.state.params.mode == 'TOOLS') {
                  id = row.id_alkes
                  nama = row.nama
                } else if(this.props.navigation.state.params.mode == 'SERVICE') {
                  id = row.id_layanan
                  nama = row.nama_layanan
                } else if(this.props.navigation.state.params.mode == 'ROLE') {
                  id = row.id_role
                  nama = row.nama_role
                } else if(this.props.navigation.state.params.mode == 'PRESCRIPTION') {
                  id = row.id_resep
                  nama = row.keterangan
                } else if(this.props.navigation.state.params.mode == 'BIDAN' || this.props.navigation.state.params.mode == 'PASIEN') {
                  id = row.id_user
                  nama = row.nama
                }
                Logger.log('check row',this.props.navigation.state.params.mode)
                return (
                  <ListItem
                    key={i}                    
                    bottomDivider                    
                    onPress={() => {
                      this.props.navigation.goBack(null)
                      let id = '', nama = ''
                      if(this.props.navigation.state.params.mode == 'MEDICINE') {
                        id = row.id_obat
                        nama = row.nama
                      } else if(this.props.navigation.state.params.mode == 'TOOLS') {
                        id = row.id_alkes
                        nama = row.nama
                      } else if(this.props.navigation.state.params.mode == 'SERVICE') {
                        id = row.id_layanan
                        nama = row.nama_layanan
                      } else if(this.props.navigation.state.params.mode == 'ROLE') {
                        id = row.id_role
                        nama = row.nama_role
                      } else if(this.props.navigation.state.params.mode == 'PRESCRIPTION') {
                        id = row.id_resep
                        nama = row.keterangan
                      } else if(this.props.navigation.state.params.mode == 'BIDAN' || this.props.navigation.state.params.mode == 'PASIEN') {
                        id = row.id_user
                        nama = row.nama
                      }
                      this.callback({
                        idproduk: id,
                        namaproduk: nama
                      })
                    }}
                  >
                    <ListItem.Content>
                      {/* <ListItem.Title >{row.nama_role ? row.nama_role : row.nama_resep ? row.nama_resep : row.nama ? row.nama : row.nama_layanan}</ListItem.Title> */}
                      <ListItem.Title >{nama}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                  </ListItem>
                )
              })}
          </ScrollView>
        </View>
      )
    // }
    // return (
    //   <View style={{ padding: Dimens.paddingMedium }}>
    //     <LoginInstruction nav={this.props.navigation} />
    //   </View>
    // )
  }
  
  async componentDidMount() { 
    let response = null
    if(this.props.navigation.state.params.mode == 'MEDICINE') {
      response = await this.props.dispatch(
        get_list_medicine_data()
      )
    } else if(this.props.navigation.state.params.mode == 'TOOLS') {
      response = await this.props.dispatch(
        get_list_tool_data()
      )
    } else if(this.props.navigation.state.params.mode == 'SERVICE') {
      response = await this.props.dispatch(
        get_list_service_data()
      )
    } else if(this.props.navigation.state.params.mode == 'PRESCRIPTION') {
      response = await this.props.dispatch(
        get_data_presciption()
      )
    } else if(this.props.navigation.state.params.mode == 'ROLE') {
      response = await this.props.dispatch(
        get_data_role()
      )
    } else if(this.props.navigation.state.params.mode == 'BIDAN' || this.props.navigation.state.params.mode == 'PASIEN') {
      response = await this.props.dispatch(
        get_list_user_data(this.props.navigation.state.params.mode)
      )
    }
    
    if (response.isSuccess()) {
      const list = response.getDataAsList()
      Logger.log('check response',list)
      this.setState({ data: list})
    }
  }

  // onChangeText(filter) {
  //   this.setState({ filter })

  //   this.delayChange()
  // }

  // onChangeFilter() {
  //   this.setState({ filter_delay: this.state.filter })
  // }
}

ProductChooserScreen.navigationOptions = {
  title: 'Pilih Produk/Layanan',
  headerStyle: { backgroundColor: Colors.colorPrimary },
  headerTintColor: Colors.textInverse,
}

export default connect(
  (state) => ({
    ...state.Auth
  }),
  (dispatch) => ({ dispatch })
)(ProductChooserScreen)
