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
import NavKey from '../../constants/NavKey'
import Icon from 'react-native-vector-icons/Feather';
import { Input } from 'react-native-elements';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { Button } from 'react-native-elements/dist/buttons/Button'
import DateTimePicker from 'react-native-modal-datetime-picker'
import DateTime from '../../library/helper/DateTime'
import { get_detail_cardmother_data, update_cardmother } from '../../store/actions/cardmotherAction'
import { get_detail_cardbaby_data, update_cardbaby } from '../../store/actions/cardbabyAction'
import { get_detail_cardkb_data, update_cardkb } from '../../store/actions/cardkbAction'
import Logger from '../../library/helper/Logger'

class UpdateCardKbScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
      jenis_layanan: '',
      tarif: '',
      keterangan: '',
      datePickerHaidTerakhir: {
        id: 'haid',
        date: new Date,
        show: false,
        mode: 'date',
        datePicketElement: false,
        value: new Date
      },
      datePickerDilayani: {
        id: 'dilayani',
        date: new Date,
        show: false,
        mode: 'date',
        datePicketElement: false,
        value: new Date
      },
      datePickerPesanKembali: {
        id: 'pesan',
        date: new Date,
        show: false,
        mode: 'date',
        datePicketElement: false,
        value: new Date
      },
      datePickerDilepas: {
        id: 'dilepas',
        date: new Date,
        show: false,
        mode: 'date',
        datePicketElement: false,
        value: new Date
      },
    }
    this.id = this.props.navigation.state.params.itemId
  }
  
  render() {     
    if(this.state.permission && this.state.permission.update) {
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
           <TouchableOpacity onPress={() => this.choice('PASIEN')}>
              <Input
                label="Pasien"
                placeholder="Masukkan Pasien"
                leftIcon={{ type: 'feather', name: 'user' }}
                value={this.state.pasien}
                onChangeText={text => this.setState({pasien: text})}
                editable={false}
              />
            </TouchableOpacity>
            <Text 
              style={{
                fontSize: 20,
                fontWeight: 'bold', 
                textTransform:'uppercase', 
                marginLeft: 10, 
                paddingTop: 5 
              }}
            >
              PROFIL SUAMI
            </Text>
            <Input
              label="Nama Suami"
              placeholder="Masukkan Nama Suami"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.nama_suami}
              onChangeText={text => this.setState({nama_suami: text})}
            />
            <Input
              label="Usia"
              placeholder="Masukkan Usia"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.usia}
              keyboardType='numeric'
              onChangeText={text => this.setState({usia: text})}
            />
            <Input
              label="Agama"
              placeholder="Masukkan Agama"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.agama}
              onChangeText={text => this.setState({agama: text})}
            />
            <Input
              label="Pekerjaan"
              placeholder="Masukkan Pekerjaan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.pekerjaan}
              onChangeText={text => this.setState({pekerjaan: text})}
            />
            <Input
              label="Pendidikan"
              placeholder="Masukkan Pendidikan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.pendidikan}
              onChangeText={text => this.setState({pendidikan: text})}
            />

            <Text 
              style={{
                fontSize: 20,
                fontWeight: 'bold', 
                textTransform:'uppercase', 
                marginLeft: 10, 
                paddingTop: 5 
              }}
            >
              PESERTA KB
            </Text>
            <Input
              label="Jumlah Anak"
              placeholder="Masukkan Jumlah Anak"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.jumlah_anak}
              keyboardType="numeric"
              onChangeText={text => this.setState({jumlah_anak: text})}
            />
            <Input
              label="Ingin Anak"
              placeholder="Masukkan Ingin Anak"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.ingin_anak}
              keyboardType="numeric"
              onChangeText={text => this.setState({ingin_anak: text})}
            />
            <Input
              label="Saat Ingin Anak"
              placeholder="Masukkan Saat Ingin Anak"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.saat_ingin_anak}
              onChangeText={text => this.setState({saat_ingin_anak: text})}
            />
            <Input
              label="Status Hamil"
              placeholder="Masukkan Status Hamil"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.status_hamil}
              onChangeText={text => this.setState({status_hamil: text})}
            />
            <Input
              label="Kompilasi Hamil"
              placeholder="Masukkan Kompilasi Hamil"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.kompilasi_hamil}
              onChangeText={text => this.setState({kompilasi_hamil: text})}
            />
            <Input
              label="Sikap Suami"
              placeholder="Masukkan Sikap Suami"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.sikap_suami}
              onChangeText={text => this.setState({sikap_suami: text})}
            />
            <Input
              label="Resiko"
              placeholder="Masukkan Resiko"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.resiko}
              onChangeText={text => this.setState({resiko: text})}
            />
            <Input
              label="Metode KB"
              placeholder="Masukkan Metode KB"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.metode_kb}
              onChangeText={text => this.setState({metode_kb: text})}
            />

            
            <Text 
              style={{
                fontSize: 20,
                fontWeight: 'bold', 
                textTransform:'uppercase', 
                marginLeft: 10, 
                paddingTop: 5 
              }}
            >
              PEMERIKSAAN KB
            </Text>
            <Input
              label="Tekanan Darah"
              placeholder="Masukkan Tekanan Darah"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.tekanan_darah}
              keyboardType="numeric"
              onChangeText={text => this.setState({tekanan_darah: text})}
            />
            <Input
              label="BB"
              placeholder="Masukkan BB"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.bb}
              keyboardType="numeric"
              onChangeText={text => this.setState({bb: text})}
            />
            <TouchableOpacity 
              onPress={() => {                        
                this.setState({datePickerHaidTerakhir: {datePicketElement: !this.state.datePickerHaidTerakhir.datePicketElement}})
              }}
            >
              <Input
                label={"Tanggal Haid Terakhir"}
                onChangeText={text => this.setState({datePickerHaidTerakhir: {
                  value: text
                }})}
                placeholder="Masukkan Tanggal Haid Terakhir"
                value={this.state.datePickerHaidTerakhir.value}
                disabled={true}
              />   
            </TouchableOpacity>
            <DateTimePicker                                      
              isVisible={this.state.datePickerHaidTerakhir.datePicketElement}
              mode="date"
              onConfirm={this.handleConfirmHaidTerakhir}
              onCancel={this.hidedatePickerHaidTerakhir}
            />
            <TouchableOpacity 
              onPress={() => {                        
                this.setState({datePickerDilayani: {datePicketElement: !this.state.datePickerDilayani.datePicketElement}})
              }}
            >
              <Input
                label={"Tanggal Dilayani"}
                onChangeText={text => this.setState({datePickerDilayani: {
                  value: text
                }})}
                placeholder="Masukkan Dilayani"
                value={this.state.datePickerDilayani.value}
                disabled={true}
              />   
            </TouchableOpacity>
            <DateTimePicker                                      
              isVisible={this.state.datePickerDilayani.datePicketElement}
              mode="date"
              onConfirm={this.handleConfirmDilayani}
              onCancel={this.hidedatePickerDilayani}
            />
            <TouchableOpacity 
              onPress={() => {                        
                this.setState({datePickerPesanKembali: {datePicketElement: !this.state.datePickerPesanKembali.datePicketElement}})
              }}
            >
              <Input
                label={"Tanggal Pesan Kembali"}
                onChangeText={text => this.setState({datePickerPesanKembali: {
                  value: text
                }})}
                placeholder="Masukkan Pesan Kembali"
                value={this.state.datePickerPesanKembali.value}
                disabled={true}
              />   
            </TouchableOpacity>
            <DateTimePicker                                      
              isVisible={this.state.datePickerPesanKembali.datePicketElement}
              mode="date"
              onConfirm={this.handleConfirmPesanKembali}
              onCancel={this.hidedatePickerPesanKembali}
            />
            <TouchableOpacity 
              onPress={() => {                        
                this.setState({datePickerDilepas: {datePicketElement: !this.state.datePickerDilepas.datePicketElement}})
              }}
            >
              <Input
                label={"Tanggal Dilepas"}
                onChangeText={text => this.setState({datePickerDilepas: {
                  value: text
                }})}
                placeholder="Masukkan Dilepas"
                value={this.state.datePickerDilepas.value}
                disabled={true}
              />   
            </TouchableOpacity>
            <DateTimePicker                                      
              isVisible={this.state.datePickerDilepas.datePicketElement}
              mode="date"
              onConfirm={this.handleConfirmDilepas}
              onCancel={this.hidedatePickerDilepas}
            />
            <Input
              label="Merokok"
              placeholder="Masukkan Merokok"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.merokok}
              onChangeText={text => this.setState({merokok: text})}
            />
            <Input
              label="Menyusui"
              placeholder="Masukkan Menyusui"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.menyusui}
              onChangeText={text => this.setState({menyusui: text})}
            />
            <Input
              label="Persalinan Terakhir"
              placeholder="Masukkan Persalinan Terakhir"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.persalinan_terakhir}
              onChangeText={text => this.setState({persalinan_terakhir: text})}
            />
            <Input
              label="Sakit Kuning"
              placeholder="Masukkan Sakit Kuning"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.sakit_kuning}
              onChangeText={text => this.setState({sakit_kuning: text})}
            />
            <Input
              label="Perd Per Veg"
              placeholder="Masukkan Perd Per Veg"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.perd_per_veg}
              onChangeText={text => this.setState({perd_per_veg: text})}
            />
            <Input
              label="Tumor Payudara"
              placeholder="Masukkan Tumor Payudara"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.tumor_payudara}
              onChangeText={text => this.setState({tumor_payudara: text})}
            />
            <Input
              label="Flurabus"
              placeholder="Masukkan Flurabus"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.flurabus}
              onChangeText={text => this.setState({flurabus: text})}
            />
            <Input
              label="Radang"
              placeholder="Masukkan Radang"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.radang}
              onChangeText={text => this.setState({radang: text})}
            />
            <Input
              label="Tumor"
              placeholder="Masukkan Tumor"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.tumor}
              onChangeText={text => this.setState({tumor: text})}
            />
            <Input
              label="Posisi Rahim"
              placeholder="Masukkan Posisi Rahim"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.posisi_rahim}
              onChangeText={text => this.setState({posisi_rahim: text})}
            />
            <Input
              label="Genetalia"
              placeholder="Masukkan Genetalia"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.genetalia}
              onChangeText={text => this.setState({genetalia: text})}
            />
            <Button 
              buttonStyle={{backgroundColor: Colors.colorPrimary, marginTop: Dimens.paddingMedium}} 
              title={"Simpan"}
              onPress={() => this.saveInput()}
            />
            {/* } */}
          </ScrollView>
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

  choice(mode, data=null) {
    this.props.navigation.navigate(NavKey.PRODUCTS
      , {
      mode,
      callback: (data) => {
        if(mode == 'PASIEN') {
          this.setState({pasien: data.namaproduk, id_pasien: data.idproduk})
        }
      },
    })
  }


  hidedatePickerHaidTerakhir = () => {
    this.setState({datePickerHaidTerakhir: {
      value: this.state.datePickerHaidTerakhir.value
    }})
  }

  handleConfirmHaidTerakhir = (date) => {    
    this.setState({datePickerHaidTerakhir: {
      value: DateTime.format(date, DateTime.FORMAT_DATE_YMD)
    }})
    this.hidedatePickerHaidTerakhir()
  }

  hidedatePickerDilayani = () => {
    this.setState({datePickerDilayani: {
      value: this.state.datePickerDilayani.value
    }})
  }

  handleConfirmDilayani = (date) => {    
    this.setState({datePickerDilayani: {
      value: DateTime.format(date, DateTime.FORMAT_DATE_YMD)
    }})
    this.hidedatePickerDilayani()
  }

  hidedatePickerPesanKembali = () => {
    this.setState({datePickerPesanKembali: {
      value: this.state.datePickerPesanKembali.value
    }})
  }

  handleConfirmPesanKembali = (date) => {    
    this.setState({datePickerPesanKembali: {
      value: DateTime.format(date, DateTime.FORMAT_DATE_YMD)
    }})
    this.hidedatePickerPesanKembali()
  }

  hidedatePickerDilepas = () => {
    this.setState({datePickerDilepas: {
      value: this.state.datePickerDilepas.value
    }})
  }

  handleConfirmDilepas = (date) => {    
    this.setState({datePickerDilepas: {
      value: DateTime.format(date, DateTime.FORMAT_DATE_YMD)
    }})
    this.hidedatePickerDilepas()
  }

  // choice(mode, data=null) {
  //   this.props.navigation.navigate(NavKey.PRODUCTS
  //     , {
  //     mode,
  //     callback: (data) => {
  //       if(mode == 'PASIEN') {
  //         this.setState({pasien: data.namaproduk, id_pasien: data.idproduk})
  //       } else if(mode == 'BIDAN') {
  //         this.setState({bidan: data.namaproduk, id_bidan: data.idproduk})
  //       } else if(mode == 'SERVICE') {
  //         this.setState({layanan: data.namaproduk, id_layanan: data.idproduk})
  //       }
  //     },
  //   })
  // }

  async saveInput() {
    let data = {
      id_kartu_kb:this.state.id_kartu_kb, id_user: this.state.id_pasien,id_pemeriksaan_kb:this.state.id_pemeriksaan_kb, id_peserta_kb:this.state.id_peserta_kb, pasien: this.state.pasien, id_suami: this.state.id_suami, nama_suami: this.state.nama_suami, usia: this.state.usia, agama: this.state.agama, pekerjaan: this.state.pekerjaan, pendidikan: this.state.pendidikan, jumlah_anak: this.state.jumlah_anak, ingin_anak: this.state.ingin_anak, saat_ingin_anak: this.state.saat_ingin_anak, status_hamil: this.state.status_hamil, kompilasi_hamil: this.state.kompilasi_hamil, sikap_suami:this.state.sikap_suami, resiko:this.state.resiko, metode_kb:this.state.metode_kb, tekanan_darah:this.state.tekanan_darah, bb:this.state.bb, haid_terakhir:this.state.datePickerHaidTerakhir.value, tgl_dilayani:this.state.datePickerDilayani.value, tgl_pesan_kembali:this.state.datePickerPesanKembali.value, tgl_dilepas:this.state.datePickerDilepas.value, merokok: this.state.merokok, menyusui: this.state.menyusui, persalinan_terakhir: this.state.persalinan_terakhir, sakit_kuning: this.state.sakit_kuning, perd_per_veg: this.state.perd_per_veg, tumor_payudara: this.state.tumor_payudara, flurabus: this.state.flurabus, radang: this.state.radang, tumor: this.state.tumor, posisi_rahim:this.state.posisi_rahim, genetalia:this.state.genetalia
    }
    Logger.log('check data',data)
    const result = await this.props.dispatch(update_cardkb(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())         
    }else {
      this.showError(result.getMessage())
    }
  }

  async componentDidMount() { 
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
        id_kartu_kb: data.id_kartu_kb,id_pemeriksaan_kb:data.id_pemeriksaan_kb, id_pasien: data.id_user,id_peserta_kb:data.id_peserta_kb, pasien: data.nama, id_suami: data.id_suami, nama_suami: data.nama_suami, usia: data.usia, agama: data.agama, pekerjaan: data.pekerjaan, pendidikan: data.pendidikan, jumlah_anak: data.jumlah_anak, ingin_anak: data.ingin_anak, saat_ingin_anak: data.saat_ingin_anak, status_hamil: data.status_hamil, kompilasi_hamil: data.kompilasi_hamil, sikap_suami:data.sikap_suami, resiko:data.resiko, metode_kb:data.metode_kb, tekanan_darah:data.tekanan_darah, bb:data.bb, datePickerHaidTerakhir: {value:data.haid_terakhir}, datePickerDilayani: {value:data.tgl_dilayani}, datePickerPesanKembali: {value:data.tgl_pesan_kembali}, datePickerDilepas: {value:data.tgl_dilepas}, merokok: data.merokok, menyusui: data.meyusui, persalinan_terakhir: data.persalinan_terakhir, sakit_kuning: data.sakit_kuning, perd_per_veg: data.Perd_Per_Veg, tumor_payudara: data.tumor_payudara, flurabus: data.flurabus, radang: data.radang, tumor: data.tumor, posisi_rahim:data.posisi_rahim, genetalia:data.genetalia
      })
    } else {
      this.showError(response.getMessage())
    }
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

UpdateCardKbScreen.navigationOptions = ({ navigation }) => ({
  title: 'UPDATE DATA',
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
)(UpdateCardKbScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})