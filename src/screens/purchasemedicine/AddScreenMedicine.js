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
import { insert_medicine, insert_purchase_medicine } from '../../store/actions/medicineAction'

class AddScreenMedicine extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
      medicine: '',
      nama: '',
      id_obat: '',
      supplier: '',
      jumlah: '',
      harga: '',
      subtotal: '',
      keterangan: ''
    }
  }
  
  render() {     
    if(this.state.permission && this.state.permission.create) {
      return (
        <View style={[Styles.outerContainer,{backgroundColor: 'white'}]}>
          <ScrollView
            style={{ 
              flex: 1
            }}
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
          >
            <TouchableOpacity onPress={() => this.choice('MEDICINE',this.state.medicine)}>
              <Input
                label="Nama Obat"
                placeholder="pilih nama obat"
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
      username: this.props.lp__user_id,
      id_obat: this.state.id_obat,
      supplier: this.state.supplier,
      jumlah: this.state.jumlah,
      harga: this.state.harga,
      subtotal: this.state.subtotal,
      keterangan: this.state.keterangan,
    }
    
    const result = await this.props.dispatch(insert_purchase_medicine(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      this.setState({nama: '', id_obat:'', supplier:'', jumlah:'', harga:'', subtotal:'', keterangan: ''})
    }else {
      this.showError(result.getMessage())
      // this.setState({nama: '', id_obat:'', supplier:'', jumlah:'', harga:'', subtotal:'', keterangan: ''})
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('management_data_pembelian_obat')
    this.setState({permission: data})
    // this.get_user();
  }

  choice(mode, data) {
    this.props.navigation.navigate(NavKey.PRODUCTS
      , {
      mode,
      callback: (data) => {
        this.setState({nama: data.namaproduk, id_obat: data.idproduk})
      },
    })
  }
}

AddScreenMedicine.navigationOptions = ({ navigation }) => ({
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
)(AddScreenMedicine)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})