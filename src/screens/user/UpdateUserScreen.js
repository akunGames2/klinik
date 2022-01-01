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
import { get_data_user, update_user_data } from '../../store/actions/accountActions'
import { get_detail_tool_data, insert_tool, update_tool } from '../../store/actions/toolsAction'
import { get_detail_user_data, update_user } from '../../store/actions/UserAction'

class UpdateUserScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
      nama: '',
      fungsi: '',
      satuan: '',
      keterangan: '',
      supplier: '',
      jumlah: 0,
      harga: 0,
      subtotal: 0,
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
            <Input
              label="Nama"
              placeholder="Masukkan nama"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.nama}
              onChangeText={text => this.setState({nama: text})}
            />
            <Input
              label="Username"
              placeholder="Masukkan Username"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.username}
              onChangeText={text => this.setState({username: text})}
            />
            <Input
              label="Password"
              placeholder="Masukkan Password"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.password}
              onChangeText={text => this.setState({password: text})}
            />
            <Input
              label="Email"
              placeholder="Masukkan Email"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.email}
              onChangeText={text => this.setState({email: text})}
            />
            <Input
              label="Alamat"
              placeholder="Masukkan Alamat"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.alamat}
              onChangeText={text => this.setState({alamat: text})}
            />
            <Input
              label="Telpon"
              placeholder="Masukkan Telpon"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.telpon}
              keyboardType='numeric'
              onChangeText={text => this.setState({telpon: text})}
            />
            <TouchableOpacity onPress={() => this.choice('ROLE')}>
              <Input
                label="Role"
                placeholder="Masukkan Role"
                leftIcon={{ type: 'feather', name: 'user' }}
                value={this.state.nama_role}
                onChangeText={text => this.setState({nama_role: text})}
                editable={false}
              />            
            </TouchableOpacity>
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
        if(mode == 'ROLE') {
          this.setState({nama_role: data.namaproduk, id_role: data.idproduk})
        }
      },
    })
  }

  async saveInput() {
    let data = {
      id_user: this.id,
      nama: this.state.nama,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      telpon: this.state.telpon,
      alamat: this.state.alamat,
      id_role: this.state.id_role,
      
    }
    
    const result = await this.props.dispatch(update_user(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
    }else {
      this.showError(result.getMessage())
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('user')
    this.setState({permission: data})
    this.get_detail_data();
  }

  async get_detail_data() {
    let response = await this.props.dispatch(
      get_detail_user_data(this.id)
    )
    if(response.isSuccess()) {      
      const data = response.data.data      
      for(let items in data) {
        data[items] = data[items] ? data[items] : ' '
      }

      this.setState({ 
        nama: data.nama, username: data.username, password:data.password, email:data.password, alamat:data.alamat, telpon:data.telpon, id_role:data.id_role, nama_role:data.nama_role
      })
    } else {
      this.showError(response.getMessage())
    }
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

UpdateUserScreen.navigationOptions = ({ navigation }) => ({
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
)(UpdateUserScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})