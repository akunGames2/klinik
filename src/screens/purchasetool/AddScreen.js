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
import { insert_purchase_tool, insert_tool } from '../../store/actions/toolsAction'

class AddScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
      tools: '',
      nama: '',
      id_alkes: '',
      supplier: '',
      jumlah: '',
      harga: '',
      subtotal: '',
      keterangan: ''
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
            <TouchableOpacity onPress={() => this.choice('TOOLS',this.state.tools)}>
              <Input
                label="Nama Alat Kesehatan"
                placeholder="pilih nama alat kesehatan"
                leftIcon={{ type: 'feather', name: 'user' }}
                value={this.state.nama}
                onChangeText={text => this.setState({nama: text})}
                disabled={true}
              />
            </TouchableOpacity>
            <Input
              label="Supplier"
              placeholder="Masukkan supplier"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.supplier}
              onChangeText={text => this.setState({supplier: text})}
            />
            <Input
              label="Jumlah"
              placeholder="Masukkan jumlah"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.jumlah}
              keyboardType='numeric'
              onChangeText={text => this.setState({jumlah: text})}
            />
            <Input
              label="Harga"
              placeholder="Masukkan harga"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.harga}
              keyboardType='numeric'
              onChangeText={text => this.setState({harga: text})}
            />
            <Input
              label="Subtotal"
              placeholder="Masukkan subtotal"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.subtotal}
              keyboardType='numeric'
              onChangeText={text => this.setState({subtotal: text})}
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
    Logger.log(this.state)
    let data = {
      username: this.props.lp__user_id,
      id_alkes: this.state.id_alkes,
      supplier: this.state.supplier,
      jumlah: this.state.jumlah,
      harga: this.state.harga,
      subtotal: this.state.subtotal,
      keterangan: this.state.keterangan,
    }
    
    const result = await this.props.dispatch(insert_purchase_tool(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      this.setState({id_alkes: '',nama: '',  supplier:'', jumlah:'', harga:'', subtotal:'', keterangan: ''})
    }else {
      this.showError(result.getMessage())
      this.setState({id_alkes: '',nama: '',  supplier:'', jumlah:'', harga:'', subtotal:'', keterangan: ''})
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('management_data_pembelian_alkes')
    this.setState({permission: data})
    // this.get_user();
  }

  choice(mode, data) {
    this.props.navigation.navigate(NavKey.PRODUCTS
      , {
      mode,
      callback: (data) => {
        this.setState({nama: data.namaproduk, id_alkes: data.idproduk})
      },
    })
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