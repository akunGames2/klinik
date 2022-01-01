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
import NavKey from '../../constants/NavKey'
import Icon from 'react-native-vector-icons/Feather';
import { Input } from 'react-native-elements';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { insert_user } from '../../store/actions/UserAction'

class AddUserScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
      nama: '',
      fungsi: '',
      satuan: '',
      keterangan: '',
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
      nama: this.state.nama,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      telpon: this.state.telpon,
      alamat: this.state.alamat,
      id_role: this.state.id_role,
      
    }
    
    const result = await this.props.dispatch(insert_user(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      // this.setState({
      //   nama: '',
      //   username: '',
      //   password: '',
      //   email: '',
      //   telpon: '',
      //   alamat: '',
      //   id_role: '',
      // })
    }else {
      this.showError(result.getMessage())
      // this.setState({
      //   nama: '',
      //   username: '',
      //   password: '',
      //   email: '',
      //   telpon: '',
      //   alamat: '',
      //   id_role: '',
      // })
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('user')
    this.setState({permission: data})
    // this.get_user();
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

AddUserScreen.navigationOptions = ({ navigation }) => ({
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
)(AddUserScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})