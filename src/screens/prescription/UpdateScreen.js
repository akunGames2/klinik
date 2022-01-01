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
import Logger from '../../library/helper/Logger'
import NavKey from '../../constants/NavKey'
import Icon from 'react-native-vector-icons/Feather';
import { Input } from 'react-native-elements';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { get_detail_presciption_data, update_presciption } from '../../store/actions/prescriptionAction'

class UpdateScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
      jenis_layanan: '',
      tarif: '',
      keterangan: '',
    }
    this.id = this.props.navigation.state.params.itemId
  }
  
  render() {     
    // Logger.log('check permission',this.state.permission)
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
            <TouchableOpacity onPress={() => this.choice('MEDICINE')}>
              <Input
                label="Nama Obat"
                placeholder="Masukkan Nama Obat"
                leftIcon={{ type: 'feather', name: 'user' }}
                value={this.state.obat}
                keyboardType='numeric'
                onChangeText={text => this.setState({obat: text})}
                editable={false}
              />
            </TouchableOpacity>
            <Input
              label="Dosis"
              placeholder="Masukkan dosis"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.dosis}
              onChangeText={text => this.setState({dosis: text})}
            />
            <Input
              label="Keterangan"
              placeholder="Masukkan keterangan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.keterangan}
              onChangeText={text => this.setState({keterangan: text})}
            />
            {/* {this.state.permission.update &&  */}
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
          this.setState({user: data.namaproduk, id_user: data.idproduk})
        } else if(mode == 'SERVICE') {
          this.setState({layanan: data.namaproduk, id_layanan: data.idproduk})
        } else if(mode == 'MEDICINE') {
          this.setState({obat: data.namaproduk, id_obat: data.idproduk})
        }
      },
    })
  }

  async saveInput() {
    let data = {
      id_resep: this.id,
      id_layanan: this.state.id_layanan,
      id_pasien: this.state.id_user,
      id_obat: this.state.id_obat,
      id_detil_resep: this.state.id_detil_resep,
      dosis: this.state.dosis,
      keterangan: this.state.keterangan,
    }
    Logger.log('dasdsa',data)
    const result = await this.props.dispatch(update_presciption(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      this.props.navigation.navigate(NavKey.MANAGEMENT_DATA_PRESCRIPTION_DETAIL)
    }else {
      this.showError(result.getMessage())
      this.get_detail_data();
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('management_resep')
    this.setState({permission: data})
    this.get_detail_data();
  }

  async get_detail_data() {
    let response = await this.props.dispatch(
      get_detail_presciption_data(this.id)
    )
    if(response.isSuccess()) {      
      const data = response.data.data      
      for(let items in data) {
        data[items] = data[items] ? data[items] : ' '
      }

      this.setState({ 
        id_detil_resep: data.id_detil_resep, id_obat: data.id_obat, id_layanan: data.id_layanan, id_user: data.id_pasien, user: data.nama_pasien, obat: data.nama_obat, layanan: data.nama_layanan, dosis: data.dosis, keterangan: data.keterangan
      })
    } else {
      this.showError(response.getMessage())
    }
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

UpdateScreen.navigationOptions = ({ navigation }) => ({
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
)(UpdateScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})