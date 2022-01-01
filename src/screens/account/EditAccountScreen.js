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

import { connect } from 'react-redux'

import Styles from '../../constants/Styles'
import { BaseScreen } from '../BaseScreen'

import Logger from '../../library/helper/Logger'
import Icon from 'react-native-vector-icons/Feather';
import { Input } from 'react-native-elements';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { get_data_user, update_user_data } from '../../store/actions/accountActions'

class EditAccountScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},      
      id_user: '',
      nama: '',
      username: '',
      alamat: '',
      email: '',
      notelp: '',
      edit: {
        profile: false,
        password: false,
      }
    }
  }
  
  render() {     
    // Logger.log('check permission',this.state)
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
              placeholder="Masukkan username"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.username}
              onChangeText={text => this.setState({username: text})}
            />
            <Input
              label="Email"
              placeholder="Masukkan email"
              leftIcon={{ type: 'material-community-icons', name: 'email' }}
              value={this.state.email}
              onChangeText={text => this.setState({email: text})}
            />
            <Input
              label="Nomor Telepon"
              placeholder="Masukkan nomor telepon"
              leftIcon={{ type: 'ionicons', name: 'call' }}
              value={this.state.notelp}
              onChangeText={text => this.setState({notelp: text})}
            />
            <Input
              label="Alamat"
              placeholder="Masukkan alamat"
              leftIcon={{ type: 'foundation', name: 'address-book' }}
              value={this.state.alamat}
              onChangeText={text => this.setState({alamat: text})}
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

  async saveInput() {
    let data = {
      id_user: this.state.id_user,
      nama: this.state.nama,
      username: this.state.username,
      email: this.state.email,
      telpon: this.state.notelp,
      alamat: this.state.alamat,
    }
    Logger.log(data)
    const result = await this.props.dispatch(update_user_data(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
    }else {
      this.showError(result.getMessage())
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('profil_user')
    this.setState({permission: data})
    this.get_user();
  }

  async get_user() {
    let response = await this.props.dispatch(
      get_data_user(this.props.lp__user_id)
    )
    if(response.isSuccess()) {      
      const data = response.data.data
      for(let items in data) {
        data[items] = data[items] ? data[items] : ' '
      }
      this.setState({
        id_user: data.id_user,
        nama: data.nama,
        username: data.username,
        email: data.email,
        alamat: data.alamat,
        notelp: data.telpon,
      })
    } else {
      this.showError(response.getMessage())
    }
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

EditAccountScreen.navigationOptions = ({ navigation }) => ({
  title: 'EDIT PROFILE USER',
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
)(EditAccountScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})