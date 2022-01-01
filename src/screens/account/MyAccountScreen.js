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
import { Input } from 'react-native-elements';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { get_data_user } from '../../store/actions/accountActions'

class MyAccountScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},
      userdata: {},
      edit: {
        profile: false,
        password: false,
      }
    }
  }
  
  render() {     
    // Logger.log('check permission',this.state.userdata)
    if(this.state.permission && this.state.permission.read) {
      return (
        <View style={[Styles.outerContainer,{backgroundColor: 'white'}]}>
          <NavigationEvents onDidFocus={() => this.init()} />
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
              value={this.state.userdata.nama}
              disabled
            />
            <Input
              label="Username"
              placeholder="Masukkan username"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.userdata.username}
              disabled
            />
            <Input
              label="Email"
              placeholder="Masukkan email"
              leftIcon={{ type: 'material-community-icons', name: 'email' }}
              value={this.state.userdata.email}
              disabled
            />
            <Input
              label="Nomor Telepon"
              placeholder="Masukkan nomor telepon"
              leftIcon={{ type: 'ionicons', name: 'call' }}
              value={this.state.userdata.telpon}
              disabled
            />
            <Input
              label="Alamat"
              placeholder="Masukkan alamat"
              leftIcon={{ type: 'foundation', name: 'address-book' }}
              value={this.state.userdata.alamat}
              disabled
            />
            {/* {this.state.permission.update &&  */}
            <Button 
              buttonStyle={{backgroundColor: Colors.colorPrimary}} 
              title="Lupa Password" 
              onPress={() => this.saveInput('CHANGEPASSWORD')}
            />
            <Button 
              buttonStyle={{backgroundColor: Colors.colorPrimary, marginTop: Dimens.paddingMedium}} 
              title={ "Edit Profile"}
              onPress={() => this.saveInput('PROFILE')}
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

  saveInput(data) {
    if(data == 'PROFILE') {
      this.props.navigation.navigate(NavKey.EDITACCOUNT)
    } else if(data == 'CHANGEPASSWORD') {
      Logger.log(data)
      this.props.navigation.navigate(NavKey.CHPASS)
    }
  }

  async init() {
    let data = await this.get_permission('profil_user')
    Logger.log('check akses',data)
    this.setState({permission: data})
    this.get_user();
  }

  async componentDidMount() { 
    this.init()
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
      this.setState({userdata: data})
    } else {
      this.showError(response.getMessage())      
    }
  }
}

MyAccountScreen.navigationOptions = ({ navigation }) => ({
  title: 'PROFILE USER',
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
)(MyAccountScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})