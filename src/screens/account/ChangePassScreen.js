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
import { change_password } from '../../store/actions/authAction'
import Icon from 'react-native-vector-icons/Feather';
import { Input } from 'react-native-elements';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { get_data_user, update_user_data } from '../../store/actions/accountActions'

class ChangePassScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},      
      oldpassword: '',
      newpassword: '',
      confirmpassword: '',      
    }
  }
  
  render() {     
    // Logger.log('check permission',this.state)
    if(this.state.permission && this.state.permission.changepassword) {
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
              label="Password Lama *"
              placeholder="Masukkan Password Lama"
              leftIcon={{ type: 'feather', name: 'lock' }}
              value={this.state.oldpassword}
              onChangeText={text => this.setState({oldpassword: text})}
            />
            <Input
              label="Password Baru *"
              placeholder="Password Baru *"
              leftIcon={{ type: 'feather', name: 'lock' }}
              value={this.state.newpassword}
              onChangeText={text => this.setState({newpassword: text})}
            />
            <Input
              label="Konfirmasi Password"
              placeholder="Konfirmasi Password"
              leftIcon={{ type: 'feather', name: 'lock' }}
              value={this.state.confirmpassword}
              onChangeText={text => this.setState({confirmpassword: text})}
            />
            <Button 
              buttonStyle={{backgroundColor: Colors.colorPrimary, marginTop: Dimens.paddingMedium}} 
              title={"Ganti Password"}
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
    if(this.state.oldpassword != '') {
      if(this.state.newpassword != '') {
        if(this.state.confirmpassword != '') {
          if(this.state.newpassword == this.state.confirmpassword) {
            let data = {
              username: this.props.lp__user_id,
              oldpassword: this.state.oldpassword,
              newpassword: this.state.newpassword,
              confirmpassword: this.state.confirmpassword,
            }
            const result = await this.props.dispatch(change_password(data))
            if (result.isSuccess()) {
              this.showError(result.getMessage())
              this.setState({oldpassword: '', newpassword: '', confirmpassword: ''})
            }else {
              this.showError(result.getMessage())
              this.setState({oldpassword: '', newpassword: '', confirmpassword: ''})
            }
          } else {
            this.showError('Konfirmasi password tidak sama')
            this.setState({oldpassword: '', newpassword: '', confirmpassword: ''})
          }
        } else {
          this.showError('Konfirmasi password harus diisi')
          this.setState({oldpassword: '', newpassword: '', confirmpassword: ''})
        }
      } else {
        this.showError('Password baru harus diisi')
        this.setState({oldpassword: '', newpassword: '', confirmpassword: ''})
      }
    } else {
      this.showError('Password lama harus diisi')
      this.setState({oldpassword: '', newpassword: '', confirmpassword: ''})
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('profil_user')
    this.setState({permission: data})
    // this.get_user();
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
        notelp: data.notelp,
      })
    } else {
      this.showError(response.getMessage())
    }
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

ChangePassScreen.navigationOptions = ({ navigation }) => ({
  title: 'GANTI PASSWORD',
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
)(ChangePassScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})