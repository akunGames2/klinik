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
import { get_detail_purchase_tool_data, get_detail_tool_data, insert_tool, update_purchase_tool, update_tool } from '../../store/actions/toolsAction'

class UpdateScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
      nama: '',
      id_alkes: '',
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
      id_beli_alkes: this.id,
      id_detil_beli_alkes: this.state.id_detil_beli_alkes,
      id_alkes: this.state.id_alkes,
      user: this.props.lp__user_id,
      nama: this.state.nama,
      fungsi: this.state.fungsi,
      satuan: this.state.satuan,
      keterangan: this.state.keterangan,
      supplier: this.state.supplier,
      jumlah: this.state.jumlah,
      harga: this.state.harga,
      subtotal: this.state.subtotal,
    }
    
    const result = await this.props.dispatch(update_purchase_tool(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      this.props.navigation.navigate(NavKey.MANAGEMENT_DATA_PURCHASE_TOOLS_DETAIL)
    }else {
      this.showError(result.getMessage())
      this.get_detail_data();
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('management_data_alat_kesehatan')
    this.setState({permission: data})
    this.get_detail_data();
  }

  async get_detail_data() {
    let response = await this.props.dispatch(
      get_detail_purchase_tool_data(this.id)
    )
    if(response.isSuccess()) {      
      const data = response.data.data      
      for(let items in data) {
        data[items] = data[items] ? data[items] : ' '
      }

      this.setState({ 
        id_detil_beli_alkes: data.id_detil_beli_alkes, nama: data.nama, fungsi: data.fungsi, satuan: data.satuan, keterangan: data.keterangan, supplier: data.supplier, jumlah: data.jumlah, harga: data.harga, total: data.total, id_alkes: data.id_alkes
      })
    } else {
      this.showError(response.getMessage())
    }
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