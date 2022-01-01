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
import { NavigationEvents, withNavigationFocus } from 'react-navigation';

import Logger from '../../library/helper/Logger'
import NavKey from '../../constants/NavKey'
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { get_data_user } from '../../store/actions/accountActions'
import { get_list_tool_data, get_tool_data } from '../../store/actions/toolsAction'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FloatingActionButton from '../../components/global/FloatingActionButton'
import { get_list_report_data } from '../../store/actions/reportAction'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { create_your_queue, get_queue_active, get_your_queue, get_your_queue_, set_done } from '../../store/actions/queueActioni'

class QueueScreen extends BaseScreen {
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
    Logger.log('check permission',this.state)
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
            <View>
            {!this.state.nomor_antrianmu && this.props.lp__role == 'PASIEN' && <Button 
              buttonStyle={{
                backgroundColor: Colors.colorPrimary,
                alignContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                width: '90%'
              }} 
              title="Buat Nomor Antrian" 
              onPress={() => this.getQueue()}
              ></Button>}
              {this.state.nomor_antrian_active && 
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    alignContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    marginBottom: -40
                  }}
                >Nomor Antrian Sekarang</Text>
                <Text
                  style={{
                    fontSize: 200,
                    // alignContent: 'center',
                    alignSelf: 'center',
                    // alignItems: 'center',
                  }}
                >
                  {this.state.nomor_antrian_active}
                </Text>
              </View>}
              {!this.state.nomor_antrian_active && this.props.lp__role == 'BIDAN' && 
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    alignContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >Tidak Ada Pasien Baru Saat ini</Text>
              </View>}
              {this.state.nomor_antrianmu && 
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    alignContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                    marginBottom: -40
                  }}
                >Nomor Antrian Kamu</Text>
                <Text
                  style={{
                    fontSize: 200,
                    // alignContent: 'center',
                    alignSelf: 'center',
                    // alignItems: 'center',
                  }}
                >
                  {this.state.nomor_antrianmu}
                </Text>
              </View>}
              {this.state.nomor_antrian_active && this.props.lp__role == 'BIDAN' && <Button 
              buttonStyle={{
                backgroundColor: Colors.colorPrimary,
                alignContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                width: '90%'
              }} 
              title="Panggil Pasien Selanjutnya" 
              onPress={() => this.setQueue()}
              ></Button>}
            </View>
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

  async getQueue() {
    const response = await this.props.dispatch(
      create_your_queue({username: this.props.lp__user_id})
    )
     
    if (response.isSuccess()) {
      const list = response.getDataAsMap()
      this.onRefresh();
    } else {
      this.showError(response.getMessage())   
      this.setState({ loading: false})
    }
  }

  async setQueue() {
    const response = await this.props.dispatch(
      set_done({number: this.state.nomor_antrian_active})
    )
     
    if (response.isSuccess()) {
      const list = response.getDataAsMap()
      this.onRefresh();
    } else {
      this.showError(response.getMessage())   
      this.setState({ loading: false})
    }
  }

  async init() {
    let data = await this.get_permission('antrian')
    this.setState({permission: data})
    this.onRefresh();
  }

  async componentDidMount() { 
    this.init()
  }

  async onRefresh() {
    this.setState({ loading: true})

    let antrian= []
    let response = await this.props.dispatch(
      get_queue_active()
    )
     
    if (response.isSuccess()) {
      const list = response.getDataAsMap()
      this.setState({ loading: false, nomor_antrian_active: list ? list.nomor_antrian : list})
    } else {
      this.showError(response.getMessage())   
      this.setState({ loading: false})
    }

    response = await this.props.dispatch(
      get_your_queue(this.props.lp__user_id)
    )
     
    if (response.isSuccess()) {
      const list = response.getDataAsMap()
      this.setState({ loading: false, nomor_antrianmu: list ? list.nomor_antrian : list})
    } else {
      this.showError(response.getMessage())   
      this.setState({ loading: false})
    }
    // Logger.log('check antrian',antrian)
    // this.setState({ data: antrian})
  }
}

QueueScreen.navigationOptions = ({ navigation }) => ({
  title: 'ANTRIAN',
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
)(QueueScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})