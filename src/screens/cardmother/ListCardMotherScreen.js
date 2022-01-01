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


import NavKey from '../../constants/NavKey'
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { get_data_user } from '../../store/actions/accountActions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FloatingActionButton from '../../components/global/FloatingActionButton'
import { get_data_cardmother } from '../../store/actions/cardmotherAction'

class ListCardMotherScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},
      data: [],
      loading: false
    }

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
                this.props.navigation.navigate(NavKey.CARD_MOTHER_DETAIL, {
                  itemId: l.id_kartu_ibu
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
                  <Text>{l.nama_bidan}</Text>
                  <Text>{l.nama_pasien}</Text>
                  <Text>{l.tgl_daftar}</Text>
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
            navigation={() => this.props.navigation.navigate(NavKey.CARD_MOTHER_ADD)}
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
    let data = await this.get_permission('kartu_ibu')
    this.setState({permission: data})
    this.onRefresh();
  }

  async componentDidMount() { 
    this.init()
  }

  async onRefresh() {
    const response = await this.props.dispatch(
      get_data_cardmother(this.props.lp__user_id)
    )
    if (response.isSuccess()) {
      const list = response.getDataAsList()
      this.setState({data: list})
    }
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

ListCardMotherScreen.navigationOptions = ({ navigation }) => ({
  title: 'DATA KARTU IBU',
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
)(ListCardMotherScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})
