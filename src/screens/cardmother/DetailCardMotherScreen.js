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

class DetailCardMotherScreen extends BaseScreen {
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
                  <Text style={{fontSize: 15,
                    textTransform:'uppercase'}}>{l.title}</Text>
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
      this.props.navigation.navigate(NavKey.CARD_MOTHER_UPDATE, {
        itemId: this.id
      })
    } else if(data == 'DELETE') {
      this.delete()
    }
  }
  
  async delete() {
    const result = await this.props.dispatch(delete_card_mother_data(this.id))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      this.props.navigation.navigate(NavKey.CARD_MOTHER)
    }else {
      this.showError(result.getMessage())
    }
  }

  async get_report() {
    Linking.openURL('https://www.serverdevel1.web.id/klinik/index.php/pdfview/getreportcardmother?id='+this.id).catch(err => (this.showError("Couldn't load page",err)));
  }

  async componentDidMount() {
    this.init()
  }

  async init() {
    let data = await this.get_permission('kartu_ibu')
    this.setState({permission: data})
    this.get_detail_data();
  }
  
  async get_detail_data() {
    let response = await this.props.dispatch(
      get_detail_cardmother_data(this.id)
    )
    if(response.isSuccess()) {      
      const data = response.data.data
      for(let items in data) {
        data[items] = data[items] ? data[items] : ' '
      }

      this.setState({
        id_detil_resep: data.id_detil_resep,
        detail: [
          {
            title: 'Kartu Ibu',
            type: 'TITLE'
          },
          {
            title: 'BPS RB',
            value: data.bps_rb
          },
          {
            title: 'BPS RB',
            value: data.bps_rb
          },
          {
            title: 'desa',
            value: data.desa
          },
          {
            title: 'kota',
            value: data.kota
          },
          {
            title: 'kode index',
            value: data.kode_index
          },
          {
            title: 'tanggal daftar',
            value: data.tgl_daftar
          },
          {
            title: 'tanggal kartu ibu',
            value: data.tgl_kartu_ibu
          },
          {
            title: 'diagnosa',
            value: data.diagnosa
          },
          {
            title: 'nama bidan',
            value: data.nama_bidan
          },
          {
            title: 'nama pasien',
            value: data.nama_pasien
          },
          {
            title: 'nama layanan',
            value: data.nama_layanan
          },
          {
            title: 'pemeriksaan',
            type: 'TITLE'
          },
          {
            title: 'TB',
            value: data.TB
          },
          {
            title: 'lila',
            value: data.LILA
          },
          {
            title: 'bentuk tubuh',
            value: data.bentuk_tubuh
          },
          {
            title: 'kesadaran',
            value: data.kesadaran
          },
          {
            title: 'muka',
            value: data.muka
          },
          {
            title: 'kulit',
            value: data.kulit
          },
          {
            title: 'mata',
            value: data.mata
          },
          {
            title: 'mulut',
            value: data.mulut
          },
          {
            title: 'gigi',
            value: data.gigi
          },
          {
            title: 'pembesaran kel',
            value: data.pembesaran_kel
          },
          {
            title: 'dada',
            value: data.dada
          },
          {
            title: 'nafas',
            value: data.nafas
          },
          {
            title: 'jantung',
            value: data.jantung
          },
          {
            title: 'payudara',
            value: data.payudara
          },
          {
            title: 'tangan tungkai',
            value: data.tangan_tungkai
          },
          {
            title: 'reflek',
            value: data.reflek
          },
          {
            title: 'profil suami',
            type: 'TITLE'
          },
          {
            title: 'nama suami',
            value: data.nama_suami
          },
          {
            title: 'usia suami',
            value: data.usia
          },
          {
            title: 'agama',
            value: data.agama
          },
          {
            title: 'pekerjaan',
            value: data.pekerjaan
          },
          {
            title: 'pendidikan',
            value: data.pendidikan
          },
          {
            title: 'penolong',
            value: data.penolong
          },
          {
            title: 'rencana persalinan',
            type: 'TITLE'
          },
          {
            title: 'tempat',
            value: data.tempat
          },
          {
            title: 'pendamping',
            value: data.pendamping
          },
          {
            title: 'pendonor',
            value: data.pendonor
          },
          {
            title: 'sticker p4k',
            value: data.sticker_p4k
          },
          {
            title: 'tgl pasang',
            value: data.tgl_pasang
          },
          {
            title: 'riwayat kehamilan',
            type: 'TITLE'
          },
          {
            title: 'haid',
            value: data.haid
          },
          {
            title: 'hpht',
            value: data.hpht
          },
          {
            title: 'hpl',
            value: data.hpl
          },
          {
            title: 'berat',
            value: data.berat
          },
          {
            title: 'mual muntah',
            value: data.mual_muntah
          },
          {
            title: 'pusing',
            value: data.pusing
          },
          {
            title: 'nyeri perut',
            value: data.nyeri_perut
          },
          {
            title: 'gerak janin',
            value: data.gerak_janin
          },
          {
            title: 'oedema',
            value: data.oedema
          },
          {
            title: 'nafsu makan',
            value: data.nafsu_makan
          },
          {
            title: 'pendarahan',
            value: data.pendarahan
          },
          {
            title: 'penyakit bumil',
            value: data.penyakit_bumil
          },
          {
            title: 'penyakit keluarga',
            value: data.penyakit_keluarga
          },
          {
            title: 'kebiasaan bumil',
            value: data.kebiasaan_bumil
          },
          {
            title: 'status tt',
            value: data.status_tt
          },
          {
            title: 'hiv aids',
            value: data.hiv_aids
          },
          {
            title: 'keluhan',
            value: data.keluhan
          },
          {
            title: 'riwayat perkawinan',
            type: 'TITLE'
          },
          {
            title: 'kawin ke',
            value: data.kawin_ke
          },
          {
            title: 'lama kawin',
            value: data.lama_kawin
          },
          {
            title: 'sebab pisah',
            value: data.sebab_pisah
          },
          {
            title: 'sebab mati',
            value: data.sebab_mati
          },
          {
            title: 'riwayat persalinan',
            type: 'TITLE'
          },
          {
            title: 'hamil ke',
            value: data.hamil_ke
          },
          {
            title: 'komplikasi hamil',
            value: data.komplikasi_hamil
          },
          {
            title: 'jenis persalinan',
            value: data.jenis_persalinan
          },
          {
            title: 'komplikasi',
            value: data.komplikasi
          },
          {
            title: 'jk bayi',
            value: data.jk_bayi
          },
          {
            title: 'berat bayi',
            value: data.berat_bayi
          },
          {
            title: 'kondisi bayi lahir',
            value: data.kondisi_bayi_lahir
          },
          {
            title: 'kondisi bayi sekarang',
            value: data.kondisi_bayi_skrg
          },
          {
            title: 'kb',
            value: data.kb
          },
          {
            title: 'asi',
            value: data.asi
          }
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

DetailCardMotherScreen.navigationOptions = ({ navigation }) => ({
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
)(DetailCardMotherScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})