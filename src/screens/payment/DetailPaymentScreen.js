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
import Logger from '../../library/helper/Logger'
import NavKey from '../../constants/NavKey'
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { delete_payment_data, get_detail_payment_data } from '../../store/actions/paymentAction'

class DetailPaymentScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
    }
    this.id = this.props.navigation.state.params.itemId
  }
  
  render() {     
    if(this.state.permission && this.state.permission.read) {
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
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                margin: 5,
                marginBottom: 0
              }}
            >
              PEMBAYARAN
            </Text>
            {this.state.detail && this.state.detail.map((l, i) =>
            <View
              style={{
                padding: 10,
                margin: 5,
                flex: 1,
                flexDirection: 'row'
              }}
            >
              {l.type && l.type == 'label' && 
              <View
              style={{
                flex:1,
                flexDirection: 'row'
              }}>
                <View
                  style={{
                    flex:1,
                    alignItems:'flex-start'
                  }}
                >
                  <Text style={{fontSize: 15,
                    fontWeight: 'bold', textTransform:'uppercase'}}>{l.title}</Text>
                </View>
                <View
                  style={{
                    flex:1, 
                    alignItems:'flex-end'
                  }}
                >
                  <Text>{l.value}</Text>
                </View>
              </View>}
              {l.type && l.type == 'image' && 
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text style={{fontSize: 15,
                  fontWeight: 'bold', textTransform:'uppercase', marginBottom: 15}}>
                  {l.title}
                </Text>
                <Image
                  source={{
                    uri: l.value,
                  }}
                  style={{ 
                    width: '90%',
                    height: 400,
                    alignContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}
                />
              </View>}
            </View>
            )}
          </ScrollView>
          {this.state.permission && this.state.permission.delete && <Button 
            buttonStyle={{backgroundColor: Colors.colorPrimary}} 
            title="Hapus Data" 
            onPress={() => this.saveInput('DELETE')}
          />}
          {this.state.permission && this.state.permission.update && <Button 
            buttonStyle={{backgroundColor: Colors.colorPrimary, marginTop: Dimens.paddingMedium}} 
            title={ "Edit Data"}
            onPress={() => this.saveInput('EDIT')}
          />}
          {this.state.permission && this.state.permission.uploadproof && <Button 
            buttonStyle={{backgroundColor: Colors.colorPrimary, marginTop: Dimens.paddingMedium}} 
            title={ "UPLOAD BUKTI TRANSFER"}
            onPress={() => this.saveInput('EDIT', 'UPLOADPROOF')}
          />}
          {/* <FloatingActionButton
            navigation={() => this.props.navigation.navigate(NavKey.MANAGEMENT_DATA_TOOL_HEALTH_ADD)}
            name="pencil"
            iconType="Ionicons"
            align="right"
          />
          <FloatingActionButton 
            navigation={() => this.props.navigation.navigate(NavKey.MANAGEMENT_DATA_TOOL_HEALTH_ADD)}
            name="trash"
            iconType="Ionicons"
            align="left"
          /> */}

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

  async saveInput(data, type=null) {
    if(data == 'EDIT') {
      this.props.navigation.navigate(NavKey.MANAGEMENT_PAYMENT_UPDATE, {
        itemId: this.id,
        type: type
      })
    } else if(data == 'DELETE') {
      this.delete()
    }
  }
  
  async delete() {
    const result = await this.props.dispatch(delete_payment_data(this.id))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      this.props.navigation.navigate(NavKey.MANAGEMENT_PAYMENT)
    }else {
      this.showError(result.getMessage())
    }
  }

  async componentDidMount() {
    this.init()
  }

  async init() {
    let data = await this.get_permission('management_pembayaran')
    this.setState({permission: data})
    this.get_detail_data();
  }
  
  async get_detail_data() {
    let response = await this.props.dispatch(
      get_detail_payment_data(this.id)
    )
    if(response.isSuccess()) {      
      const data = response.data.data
      Logger.log('asli',data)
      for(let items in data) {
        data[items] = data[items] ? data[items] : ' '
      }

      this.setState({
        detail: [
          {
            title: 'tanggal bayar',
            value: data.tanggal_bayar,
            type: 'label'
          },
          {
            title: 'nama pasien',
            value: data.nama_pasien,
            type: 'label'
          },
          {
            title: 'nama layanan',
            value: data.nama_layanan,
            type: 'label'
          },
          {
            title: 'nama resep',
            value: data.nama_resep,
            type: 'label'
          },
          {
            title: 'total bayar',
            value: data.total_bayar,
            type: 'label'
          },
          {
            title: 'keterangan',
            value: data.keterangan,
            type: 'label'
          },
          {
            title: 'Bukti bayar',
            value: data.image,
            type: 'image'
          }
        ]
      })
    } else {
      this.showError(response.getMessage())
    }
  }
}

// MyAccountScreen.navigationOptions = {
//   headerShown: true,
// }

DetailPaymentScreen.navigationOptions = ({ navigation }) => ({
  title: 'DETAIL DATA',
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
)(DetailPaymentScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})