import React from 'react'
import {
  ScrollView,
  View,
  Alert,
  Linking,
  RefreshControl,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'
import { Formik } from 'formik'
import { connect } from 'react-redux'
import Styles from '../../constants/Styles'
import { BaseScreen } from '../BaseScreen'
import { NavigationEvents, withNavigationFocus } from 'react-navigation';

import Logger from '../../library/helper/Logger'
import NavKey from '../../constants/NavKey'
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { delete_card_mother_data, get_detail_cardmother_data, get_report } from '../../store/actions/cardmotherAction'
import { delete_card_baby_data, get_detail_cardbaby_data } from '../../store/actions/cardbabyAction'
import { delete_card_kb_data, get_detail_cardkb_data } from '../../store/actions/cardkbAction'

class DetailCardKbScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
    }
    this.id = this.props.navigation.state.params.itemId
    Logger.log('cehce',this.props.navigation.state.params.itemId)
  }
  
  render() {
    if(this.state.permission && this.state.permission.read) {
      return (
        <View style={[Styles.outerContainer,{backgroundColor: 'white'}]}>
          <ScrollView
            style={{ 
              flex: 1
            }}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            // refreshControl={
            //   <RefreshControl refreshing={this.state.loading} onRefresh={this.onRefresh} />
            // }
          >
            <NavigationEvents onDidFocus={() => this.init()} />
            {/* <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                margin: 5,
                marginBottom: 0
              }}
            >
              LAYANAN
            </Text> */}
            {this.state.detail && this.state.detail.map((l, i) =>
            <View
              key={i}
            >
              {!l.type && <View
                style={{
                  paddingBottom: 3,
                  paddingHorizontal: 15,
                  // margin: 5,
                  flex: 1,
                  flexDirection: 'row'
                }}>
                <View
                  style={{
                    flex:1,
                    alignItems:'flex-start'
                  }}
                >
                  <Text style={{fontSize: 15, textTransform:'uppercase'}}>{l.title}</Text>
                </View>
                <View
                  style={{
                    flex:1, 
                    alignItems:'flex-end'
                  }}
                >
                  <Text>{l.value}</Text>
                </View>
              </View>}
              {l.type && l.type == 'TITLE' && <View>
                <Text style={{fontSize: 20,
                    fontWeight: 'bold', textTransform:'uppercase', marginLeft: 10, paddingTop: 20}}>{l.title}</Text>
              </View>}
            </View>
            )}
          </ScrollView>
          {this.state.permission && this.state.permission.delete && <Button 
            buttonStyle={{backgroundColor: Colors.colorPrimary}} 
            title="Hapus Data" 
            onPress={() => this.saveInput('DELETE')}
          />}
          {this.state.permission && this.state.permission.update && <Button 
            buttonStyle={{backgroundColor: Colors.colorPrimary, marginTop: Dimens.paddingMedium}} 
            title={ "Edit Data"}
            onPress={() => this.saveInput('EDIT')}
          />}
          <Button 
            buttonStyle={{backgroundColor: Colors.colorPrimary, marginTop: Dimens.paddingMedium}} 
            title={ "Cetak"}
            onPress={() => this.get_report()}
          />
          {/* <FloatingActionButton
            navigation={() => this.props.navigation.navigate(NavKey.MANAGEMENT_DATA_TOOL_HEALTH_ADD)}
            name="pencil"
            iconType="Ionicons"
            align="right"
          />
          <FloatingActionButton 
            navigation={() => this.props.navigation.navigate(NavKey.MANAGEMENT_DATA_TOOL_HEALTH_ADD)}
            name="trash"
            iconType="Ionicons"
            align="left"
          /> */}

        </View>
      )
    } else {
      return(
        <View>
          <Text>
            Maaf anda tidak punya akses
          </Text>
        </View>
      )
    }
  }

  async saveInput(data) {
    if(data == 'EDIT') {
      this.props.navigation.navigate(NavKey.CARD_KB_UPDATE, {
        itemId: this.id
      })
    } else if(data == 'DELETE') {
      this.delete()
    }
  }
  
  async delete() {
    let data = {
      id_kartu_kb:this.state.id_kartu_kb, 
      id_pemeriksaan_kb:this.state.id_pemeriksaan_kb, 
      id_peserta_kb:this.state.id_peserta_kb, 
      id_suami: this.state.id_suami,
    }

    const result = await this.props.dispatch(delete_card_kb_data(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      this.props.navigation.navigate(NavKey.CARD_KB)
    }else {
      this.showError(result.getMessage())
    }
  }

  async get_report() {
    Linking.openURL('https://www.serverdevel1.web.id/klinik/index.php/pdfview/getreportcardkb?id='+this.id).catch(err => (this.showError("Couldn't load page",err)));
  }

  async componentDidMount() {
    this.init()
  }

  async init() {
    let data = await this.get_permission('kartu_kb')
    this.setState({permission: data})
    this.get_detail_data();
  }
  
  async get_detail_data() {
    let response = await this.props.dispatch(
      get_detail_cardkb_data(this.id)
    )
    if(response.isSuccess()) {      
      const data = response.data.data
      for(let items in data) {
        data[items] = data[items] ? data[items] : ' '
      }

      this.setState({
        id_kartu_kb: data.id_kartu_kb,id_pemeriksaan_kb:data.id_pemeriksaan_kb, id_user: data.id_user,id_peserta_kb:data.id_peserta_kb, pasien: data.nama, id_suami: data.id_suami,
        detail: [
          {
            title: 'Kartu kb',
            type: 'TITLE'
          },
          {
            title: 'nama pasien',
            value: data.nama
          },
          {
            title: 'nama suami',
            value: data.nama_suami
          },
          {
            title: 'peserta kb baru',
            type: 'TITLE'
          },
          {
            title: 'jumlah anak',
            value: data.jumlah_anak
          },
          {
            title: 'ingin anak',
            value: data.ingin_anak
          },
          {
            title: 'saat ingin anak',
            value: data.saat_ingin_anak
          },
          {
            title: 'status hamil',
            value: data.status_hamil
          },
          {
            title: 'kompilasi hamil',
            value: data.kompilasi_hamil
          },
          {
            title: 'sikap suami',
            value: data.sikap_suami
          },
          {
            title: 'resiko',
            value: data.resiko
          },
          {
            title: 'metode kb',
            value: data.metode_kb
          },
          {
            title: 'pemeriksaan kb',
            type: 'TITLE'
          },
          {
            title: 'tekanan darah',
            value: data.tekanan_darah
          },
          {
            title: 'bb',
            value: data.bb
          },
          {
            title: 'haid terakhir',
            value: data.haid_terakhir
          },
          {
            title: 'merokok',
            value: data.merokok
          },
          {
            title: 'menyusui',
            value: data.meyusui
          },
          {
            title: 'persalinan terakhir',
            value: data.persalinan_terakhir
          },
          {
            title: 'sakit kuning',
            value: data.sakit_kuning
          },
          {
            title: 'perd per veg',
            value: data.Perd_Per_Veg
          },
          {
            title: 'tumor payudara',
            value: data.tumor_payudara
          },
          {
            title: 'flurabus',
            value: data.flurabus
          },
          {
            title: 'radang',
            value: data.radang
          },
          {
            title: 'tumor',
            value: data.tumor
          },
          {
            title: 'posisi rahim',
            value: data.posisi_rahim
          },
          {
            title: 'genetalia',
            value: data.genetalia
          },
          {
            title: 'tanggal dilayani',
            value: data.tgl_dilayani
          },
          {
            title: 'tanggal pesan kembali',
            value: data.tgl_pesan_kembali
          },
          {
            title: 'tanggal dilepas',
            value: data.tgl_dilepas
          },
        ]
      })
    } else {
      this.showError(response.getMessage())
    }
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

DetailCardKbScreen.navigationOptions = ({ navigation }) => ({
  title: 'DETAIL DATA',
  // headerTitleStyle: { alignSelf: 'center' },
  headerStyle: { backgroundColor: Colors.textInverse, elevation: 10  },
  headerTintColor: Colors.colorDark,
  headerLeft:() => (
    <TouchableOpacity
      style={{ marginLeft: Dimens.paddingMedium }}
      onPress={() => navigation.goBack(null)}
    >
      <Icon name="arrow-left" size={Dimens.iconMedium2} color={Colors.colorDark} />
    </TouchableOpacity>
  ),
  // headerRight: () => (
  //   <TouchableOpacity
  //     style={{ marginRight: Dimens.paddingMedium }}      
  //   >
  //     <Icon name="comment" size={Dimens.iconMedium2} color={Colors.colorDark} />
  //   </TouchableOpacity>
  // ),
})
export default connect(
  (state) => ({ ...state.Auth}),
  (dispatch) => ({ dispatch })
)(DetailCardKbScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})