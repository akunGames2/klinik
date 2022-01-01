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
import { get_detail_payment_data, update_payment } from '../../store/actions/paymentAction'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Logger from '../../library/helper/Logger'

class UpdatePaymentScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},                       
      nama: '',
      fungsi: '',
      satuan: '',
      keterangan: '',
      datePickerExpiry: {
        id: 'expiry',
        date: new Date,
        show: false,
        mode: 'date',
        datePicketElement: false,
        value: new Date
      },
    }
    this.id = this.props.navigation.state.params.itemId
    this.type = this.props.navigation.state.params.type
  }
  
  render() {     
    Logger.log('check permission',this.state)
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
                value={this.state.user}
                onChangeText={text => this.setState({user: text})}
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.choice('SERVICE')}>
              <Input
                label="Nama Layanan"
                placeholder="Masukkan nama layanan"
                leftIcon={{ type: 'feather', name: 'user' }}
                value={this.state.layanan}
                onChangeText={text => this.setState({layanan: text})}
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.choice('PRESCRIPTION')}>
              <Input
                label="Nama Resep"
                placeholder="Masukkan Nama Resep"
                leftIcon={{ type: 'feather', name: 'user' }}
                value={this.state.resep}
                keyboardType='numeric'
                onChangeText={text => this.setState({resep: text})}
                editable={false}
              />
            </TouchableOpacity>
            <Input
              label="Keterangan"
              placeholder="Masukkan keterangan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.keterangan}
              onChangeText={text => this.setState({keterangan: text})}
            />
            <Input
              label="Total Bayar"
              placeholder="Masukkan total bayar"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.total_bayar}
              keyboardType="numeric"
              onChangeText={text => this.setState({total_bayar: text})}
            />

            <TouchableOpacity 
              onPress={() => {                        
                this.setState({datePickerExpiry: {datePicketElement: !this.state.datePickerExpiry.datePicketElement}})
              }}
              // disabled={!this.state.switchDate}
            >
              <Input
                ref={(input) => {
                  this.inputExpiry = input
                }}
                label={"Tanggal"}
                onChangeText={text => this.setState({datePickerExpiry: {
                  ...this.state.datePickerExpiry,
                  value: text
                }})}
                placeholder="Masukkan Tanggal"
                value={this.state.datePickerExpiry.value}
                disabled={true}
              />   
            </TouchableOpacity>
            <DateTimePicker                                      
              isVisible={this.state.datePickerExpiry.datePicketElement}
              mode="date"
              onConfirm={this.handleConfirmExpiry}
              onCancel={this.hideDatePickerExpiry}
            />
            {this.state.uri != "" && <Image
              source={{
                uri: this.state.uri,
              }}
              style={{ 
                width: '90%',
                height: 400,
                alignContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
              }}
            />}
            <Button 
              buttonStyle={{backgroundColor: Colors.colorPrimary, marginTop: Dimens.paddingMedium}} 
              title={"Upload Bukti Pembayaran"}
              onPress={this.imageGalleryLaunch} 
            />  
            {this.state.permission.update && <Button 
              buttonStyle={{backgroundColor: Colors.colorPrimary, marginTop: Dimens.paddingMedium}} 
              title={"Simpan"}
              onPress={() => this.saveInput()}
            />}
          </ScrollView>
        </View>
      )
    } else if(this.state.permission && this.state.permission.uploadproof) {
      return (
        <View style={[Styles.outerContainer,{backgroundColor: 'white'}]}>
          <ScrollView
            style={{ 
              flex: 1
            }}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            <Input
              label="Pasiens"
              placeholder="Masukkan Pasien"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.user}
              onChangeText={text => this.setState({user: text})}
              editable={false}
            />
            <Input
              label="Nama Layanan"
              placeholder="Masukkan nama layanan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.layanan}
              onChangeText={text => this.setState({layanan: text})}
              editable={false}
            />
            <Input
              label="Nama Resep"
              placeholder="Masukkan Nama Resep"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.resep}
              keyboardType='numeric'
              onChangeText={text => this.setState({resep: text})}
              editable={false}
            />
            <Input
              label="Keterangan"
              placeholder="Masukkan keterangan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.keterangan}
              onChangeText={text => this.setState({keterangan: text})}
              editable={false}
            />
            <Input
              label="Total Bayar"
              placeholder="Masukkan total bayar"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.total_bayar}
              keyboardType="numeric"
              onChangeText={text => this.setState({total_bayar: text})}
              editable={false}
            />
            <Input
              ref={(input) => {
                this.inputExpiry = input
              }}
              label={"Tanggal"}
              placeholder="Masukkan Tanggal"
              value={this.state.datePickerExpiry.value}
              disabled={true}
              editable={false}
            />
            {this.state.uri != "" && <Image
              source={{
                uri: this.state.uri,
              }}
              style={{ 
                width: '90%',
                height: 400,
                alignContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
              }}
            />}
            <Button 
              buttonStyle={{backgroundColor: Colors.colorPrimary, marginTop: Dimens.paddingMedium}} 
              title={"Upload Bukti Pembayaran"}
              onPress={this.imageGalleryLaunch} 
            />  
            {this.state.permission.uploadproof && <Button 
              buttonStyle={{backgroundColor: Colors.colorPrimary, marginTop: Dimens.paddingMedium}} 
              title={"Simpan"}
              onPress={() => this.saveInput()}
            />}
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

  imageGalleryLaunch = async () => {

    let options = {
  
      storageOptions: {
  
        skipBackup: true,
  
        path: 'images',
  
      },
  
    };
  
   
    const result = await launchImageLibrary(options, (res) => {
  
      Logger.log('Response = ', res);
  
      if (res.didCancel) {
  
        Logger.log('User cancelled image picker');
  
      } else if (res.error) {
  
        Logger.log('ImagePicker Error: ', res.error);
  
      } else if (res.customButton) {
  
        Logger.log('User tapped custom button: ', res.customButton);
  
        alert(res.customButton);
  
      } else {
        Logger.log('response', JSON.stringify(res));    
        if(res.assets[0].fileSize <=1000000) {
          this.setState({
            uri: res.assets[0].uri,
          });
        } else {
          this.showError('Gambar Terlalu besar, pastikan kurang dari 1MB')
        }
  
      }
  
    });
  
  }


  hideDatePickerExpiry = () => {
    this.setState({datePickerExpiry: {
      value: this.state.datePickerExpiry.value
    }})
  }

  handleConfirmExpiry = (date) => {    
    this.setState({datePickerExpiry: {
      value: DateTime.format(date, DateTime.FORMAT_DATE_DMY)
    }})
    this.hideDatePickerExpiry()
  }

  choice(mode, data=null) {
    this.props.navigation.navigate(NavKey.PRODUCTS
      , {
      mode,
      callback: (data) => {
        if(mode == 'PASIEN') {
          this.setState({user: data.namaproduk, id_user: data.idproduk})
        } else if(mode == 'SERVICE') {
          this.setState({layanan: data.namaproduk, id_layanan: data.idproduk})
        } else if(mode == 'PRESCRIPTION') {
          this.setState({resep: data.namaproduk, id_resep: data.idproduk})
        }
      },
    })
  }

  async saveInput() {
    let data = {
      id_bayar: this.id,
      id_user: this.state.id_user,
      id_layanan: this.state.id_layanan,
      id_resep: this.state.id_resep,
      keterangan: this.state.keterangan,
      total_bayar: this.state.total_bayar,
      tanggal: this.state.datePickerExpiry.value
    }
    data['image'] = this.state.uri ? {
      uri: this.state.uri,
      name: 'picture.jpg',
      type: 'image/jpeg',
    } : '';
    
    const result = await this.props.dispatch(update_payment(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
    }else {
      this.showError(result.getMessage())
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('management_pembayaran')
    this.setState({permission: data})
    this.get_detail_data();
  }

  async get_detail_data() {
    let response = await this.props.dispatch(
      get_detail_payment_data(this.id)
    )
    if(response.isSuccess()) {      
      const data = response.data.data      
      for(let items in data) {
        data[items] = data[items] ? data[items] : ' '
      }
      
      this.setState({ 
        uri: data.image != null ? data.image : "", id_user: data.id_user, user: data.nama_pasien, id_layanan: data.id_layanan_pasien, layanan: data.nama_layanan, id_resep: data.id_resep, resep: data.nama_resep, keterangan: data.keterangan, total_bayar: data.total_bayar, datePickerExpiry: {
          value:data.tanggal
        }
      })
    } else {
      this.showError(response.getMessage())
    }
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

UpdatePaymentScreen.navigationOptions = ({ navigation }) => ({
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
)(UpdatePaymentScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})