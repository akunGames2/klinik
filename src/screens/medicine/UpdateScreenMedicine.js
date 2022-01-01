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
import { get_detail_medicine_data, update_medicine } from '../../store/actions/medicineAction'

class UpdateScreenMedicine extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
      nama: '',
      fungsi: '',
      satuan: '',
      jenis: '',
      
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
              label="Fungsi"
              placeholder="Masukkan fungsi"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.fungsi}
              onChangeText={text => this.setState({fungsi: text})}
            />
            <Input
              label="Satuan"
              placeholder="Masukkan satuan"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.satuan}
              onChangeText={text => this.setState({satuan: text})}
            />
            <Input
              label="Jenis"
              placeholder="Masukkan jenis"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.jenis}
              onChangeText={text => this.setState({jenis: text})}
            />
            {/* <Input
              label="Komposisi"
              placeholder="Masukkan komposisi"
              leftIcon={{ type: 'feather', name: 'user' }}
              value={this.state.komposisi}
              onChangeText={text => this.setState({komposisi: text})}
            /> */}
            
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

  async saveInput() {
    let data = {
      id: this.id,
      nama: this.state.nama,
      fungsi: this.state.fungsi,
      satuan: this.state.satuan,
      jenis: this.state.jenis
    }
    
    const result = await this.props.dispatch(update_medicine(data))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
    }else {
      this.showError(result.getMessage())
      this.get_detail_data();
    }
  }

  async componentDidMount() { 
    let data = await this.get_permission('management_data_obat')
    this.setState({permission: data})
    this.get_detail_data();
  }

  async get_detail_data() {
    let response = await this.props.dispatch(
      get_detail_medicine_data(this.id)
    )
    if(response.isSuccess()) {      
      const data = response.data.data      
      for(let items in data) {
        data[items] = data[items] ? data[items] : ' '
      }

      this.setState({ 
        nama: data.nama, fungsi: data.fungsi, satuan: data.satuan, jenis: data.jenis
      })
    } else {
      this.showError(response.getMessage())
    }
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

UpdateScreenMedicine.navigationOptions = ({ navigation }) => ({
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
)(UpdateScreenMedicine)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})