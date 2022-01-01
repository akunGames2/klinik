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
import { insert_card_mother } from '../../store/actions/cardmotherAction'
import { insert_cardbaby } from '../../store/actions/cardbabyAction'
import Logger from '../../library/helper/Logger'
class AddCardBabyScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
      jenis_layanan: '',
      tarif: '',
      keterangan: '',
      jumlah_obat: 0,
      input: [],
      sheet: {
        type: '',
        data: []
      },
      items: [],
      countItemsId: 0,
      datePickerExpiry: {
        id: 'expiry',
        date: new Date,
        show: false,
        mode: 'date',
        datePicketElement: false,
        value: new Date
      },
      datePickerPasang: {
        id: 'pasang',
        date: new Date,
        show: false,
        mode: 'date',
        datePicketElement: false,
        value: new Date
      },
      datePickerKartuIbu: {
        id: 'kartuibu',
        date: new Date,
        show: false,
        mode: 'date',
        datePicketElement: false,
        value: new Date
      },
    }
  }
  
  render() {     
    if(this.state.permission && this.state.permission.create) {
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
            <Input
              label="Nama Bayi"
              placeholder="Masukkan Nama Bayi"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.nama_bayi}
              onChangeText={text => this.setState({nama_bayi: text})}
            />
            <TouchableOpacity 
              onPress={() => {                        
                this.setState({datePickerKartuIbu: {datePicketElement: !this.state.datePickerKartuIbu.datePicketElement}})
              }}
              // disabled={!this.state.switchDate}
            >
              <Input
                label={"Tanggal Lahir"}
                onChangeText={text => this.setState({datePickerKartuIbu: {
                  value: text
                }})}
                placeholder="Masukkan Tanggal Lahir"
                value={this.state.datePickerKartuIbu.value}
                disabled={true}
              />   
            </TouchableOpacity>
            <DateTimePicker                                      
              isVisible={this.state.datePickerKartuIbu.datePicketElement}
              mode="date"
              onConfirm={this.handleConfirmKartuIbu}
              onCancel={this.hideDatePickerKartuIbu}
            />
            <Input
              label="BBL"
              placeholder="Masukkan BBL"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.bbl}
              onChangeText={text => this.setState({bbl: text})}
            />
            <Input
              label="Persalinan"
              placeholder="Masukkan Persalinan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.persalinan}
              onChangeText={text => this.setState({persalinan: text})}
            />
            <Input
              label="Alamat"
              placeholder="Masukkan Alamat"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.alamat}
              onChangeText={text => this.setState({alamat: text})}
            />
            <Input
              label="Nama Ayah"
              placeholder="Masukkan Nama Ayah"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.nama_ayah}
              onChangeText={text => this.setState({nama_ayah: text})}
            />
            <Input
              label="Nama Ibu"
              placeholder="Masukkan Nama Ibu"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.nama_ibu}
              onChangeText={text => this.setState({nama_ibu: text})}
            />
            <Input
              label="Telepon"
              placeholder="Masukkan Telepon"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.telepon}
              keyboardType='numeric'
              onChangeText={text => this.setState({telepon: text})}
            />
            <Text 
              style={{
                fontSize: 20,
                fontWeight: 'bold', 
                textTransform:'uppercase', 
                marginLeft: 10, 
                paddingTop: 20
              }}
            >
              PEMBERIAN IMUNISASI
            </Text>
            <Input
              label="Imunisasi Ke"
              placeholder="Masukkan Imunisasi Ke"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.imunisasi_ke}
              keyboardType='numeric'
              onChangeText={text => this.setState({imunisasi_ke: text})}
            />
            <Text 
              style={{
                fontSize: 20,
                fontWeight: 'bold', 
                textTransform:'uppercase', 
                marginLeft: 10, 
                paddingTop: 20
              }}
            >
              JENIS IMUNISASI
            </Text>
            <Input
              label="Jenis Imunisasi"
              placeholder="Masukkan Jenis Imunisasi"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.jenis_imunisasi}
              onChangeText={text => this.setState({jenis_imunisasi: text})}
            />
            <Input
              label="Keterangan"
              placeholder="Masukkan Keterangan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.keterangan}
              onChangeText={text => this.setState({keterangan: text})}
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

  hideDatePickerKartuIbu = () => {
    this.setState({datePickerKartuIbu: {
      value: this.state.datePickerKartuIbu.value
    }})
  }

  handleConfirmKartuIbu = (date) => {    
    this.setState({datePickerKartuIbu: {
      value: DateTime.format(date, DateTime.FORMAT_DATE_YMD)
    }})
    this.hideDatePickerKartuIbu()
  }

  async saveInput() {
    let data = {
      nama_bayi:this.state.nama_bayi,bbl:this.state.bbl, persalinan:this.state.persalinan, alamat:this.state.alamat, nama_ayah:this.state.nama_ayah, nama_ibu:this.state.nama_ibu, telepon:this.state.telepon, imunisasi_ke:this.state.imunisasi_ke, jenis_imunisasi:this.state.jenis_imunisasi, keterangan:this.state.keterangan,tgl_lahir: this.state.datePickerKartuIbu.value
    }
    
    const result = await this.props.dispatch(insert_cardbaby(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      this.props.navigation.navigate(NavKey.CARD_BABY)
    }else {
      this.showError(result.getMessage())
      this.props.navigation.navigate(NavKey.CARD_BABY)
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('kartu_bayi')
    this.setState({permission: data})
    // this.get_user();
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

AddCardBabyScreen.navigationOptions = ({ navigation }) => ({
  title: 'TAMBAH DATA',
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
)(AddCardBabyScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})