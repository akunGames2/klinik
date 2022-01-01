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
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FloatingActionButton from '../../components/global/FloatingActionButton'
import { get_list_payment_data } from '../../store/actions/paymentAction'

class ListPaymentScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},
      data: [],
      loading: false
    }
    this.list = [
      {
        name: 'Amy Farha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Vice President'
      },
      {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
      },
    ]

    this.onRefresh = this.onRefresh.bind(this)
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
            refreshControl={
              <RefreshControl 
                refreshing={this.state.loading} 
                onRefresh={this.onRefresh} 
              />
            }
          >
            {this.state.data && this.state.data.map((l, i) =>
            <TouchableOpacity
              key={i}
              onPress={() => {
                // let id = l.id_alkes
                this.props.navigation.navigate(NavKey.MANAGEMENT_PAYMENT_DETAIL, {
                  itemId: l.id_bayar
                })
              }}
            >
              <View
                style={{
                  borderWidth:1,
                  borderColor: '#692887',
                  borderRadius: 10,
                  padding: 10,
                  margin: 5,
                  flex: 1,
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    flex:1, 
                    alignItems:'flex-start'
                  }}
                >
                  <Text>{l.nama_pasien}</Text>
                  <Text>{l.nama_layanan}</Text>
                  <Text>{l.tanggal}</Text>
                </View>
                <View
                  style={{
                    flex:1, 
                    alignItems:'flex-end',  
                    alignSelf:'center'
                  }}
                >
                  <MaterialIcons
                    name='arrow-forward-ios'
                    size={40}
                    color='grey'
                  />
                </View>
              </View>
            </TouchableOpacity>
            )}
          </ScrollView>
          {this.state.permission && this.state.permission.create && <FloatingActionButton 
            navigation={() => this.props.navigation.navigate(NavKey.MANAGEMENT_PAYMENT_ADD)}
            name="add"
            iconType="Ionicons"
          />}
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

  async init() {
    let data = await this.get_permission('management_pembayaran')
    this.setState({permission: data})
    this.onRefresh();
  }

  async componentDidMount() { 
    this.init()
  }

  async onRefresh() {
    this.setState({ loading: true})

    const response = await this.props.dispatch(
      get_list_payment_data(this.props.lp__user_id)
    )
    if (response.isSuccess()) {
      const list = response.getDataAsList()
      this.setState({ loading: false, data: list})
    } else {
      this.showError(response.getMessage())
      this.setState({ loading: false})
    }
  }
}

ListPaymentScreen.navigationOptions = ({ navigation }) => ({
  title: 'DATA PEMBAYARAN',
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
})
export default connect(
  (state) => ({ ...state.Auth}),
  (dispatch) => ({ dispatch })
)(ListPaymentScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})