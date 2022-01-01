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
import Icon from 'react-native-vector-icons/Feather';
import { Input } from 'react-native-elements';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { get_data_user, update_user_data } from '../../store/actions/accountActions'
import { insert_tool } from '../../store/actions/toolsAction'
import { insert_medicine } from '../../store/actions/medicineAction'
import { insert_service } from '../../store/actions/serviceAction'

class AddScreenService extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
      jenis_layanan: '',
      tarif: '',
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
              label="Nama Layanan"
              placeholder="Masukkan nama layanan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.jenis_layanan}
              onChangeText={text => this.setState({jenis_layanan: text})}
            />
            <Input
              label="Tarif"
              placeholder="Masukkan tarif"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.tarif}
              keyboardType='numeric'
              onChangeText={text => this.setState({tarif: text})}
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

  async saveInput() {
    let data = {
      nama_layanan: this.state.jenis_layanan,
      tarif: this.state.tarif,
      keterangan: this.state.keterangan,
    }
    
    const result = await this.props.dispatch(insert_service(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      this.setState({jenis_layanan: '', tarif:'', keterangan:''})
    }else {
      this.showError(result.getMessage())
      this.setState({jenis_layanan: '', tarif:'', keterangan:''})
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('management_data_layanan')
    this.setState({permission: data})
    // this.get_user();
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

AddScreenService.navigationOptions = ({ navigation }) => ({
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
)(AddScreenService)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})