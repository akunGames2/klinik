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
import { insert_presciption } from '../../store/actions/prescriptionAction'

class AddScreen extends BaseScreen {
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
      countItemsId: 0
    }
  }
  
  render() {     
    // Logger.log('check permission',this.state.permission)
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
          this.setState({user: data.namaproduk, id_pasien: data.idproduk})
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
      id_pasien: this.state.id_pasien,
      id_layanan: this.state.id_layanan,
      id_obat: this.state.id_obat,
      dosis: this.state.dosis,
      keterangan: this.state.keterangan,
    }
    
    const result = await this.props.dispatch(insert_presciption(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      // this.setState({jenis_layanan: '', tarif:'', keterangan:''})
    }else {
      this.showError(result.getMessage())
      // this.setState({jenis_layanan: '', tarif:'', keterangan:''})
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('management_resep')
    this.setState({permission: data})
    // this.get_user();
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

AddScreen.navigationOptions = ({ navigation }) => ({
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
)(AddScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})