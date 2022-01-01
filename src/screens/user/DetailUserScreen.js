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
import Logger from '../../library/helper/Logger'
import NavKey from '../../constants/NavKey'
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { delete_user_data, get_detail_user_data } from '../../store/actions/UserAction'

class DetailUserScreen extends BaseScreen {
  constructor(props) {
    super(props)
    this.state = {
      permission: {},            
    }
    this.id = this.props.navigation.state.params.itemId
    Logger.log('this.props.navigation.state.params.itemId',this.props.navigation.state.params.itemId)
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
              INFO USER
            </Text>
            {this.state.detail && this.state.detail.map((l, i) =>
            <View
              key={i}
              style={{
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

  async saveInput(data) {
    if(data == 'EDIT') {
      this.props.navigation.navigate(NavKey.USER_UPDATE, {
        itemId: this.id
      })
    } else if(data == 'DELETE') {
      this.delete()
    }
  }
  
  async delete() {
    const result = await this.props.dispatch(delete_user_data(this.id))
    if (result.isSuccess()) {
      this.showError(result.getMessage())
      this.props.navigation.navigate(NavKey.USER)
    }else {
      this.showError(result.getMessage())
    }
  }

  async componentDidMount() {
    this.init()
  }

  async init() {
    let data = await this.get_permission('user')
    this.setState({permission: data})
    this.get_detail_data();
  }
  
  async get_detail_data() {
    let response = await this.props.dispatch(
      get_detail_user_data(this.id)
    )
    if(response.isSuccess()) {      
      const data = response.data.data
      for(let items in data) {
        data[items] = data[items] ? data[items] : ' '
      }

      this.setState({
        detail: [
          {
            title: 'nama user',
            value: data.nama
          },
          {
            title: 'username',
            value: data.username
          },
          {
            title: 'password',
            value: data.password
          },
          {
            title: 'email',
            value: data.email
          },
          {
            title: 'alamat',
            value: data.alamat
          },
          {
            title: 'nama role',
            value: data.nama_role
          },
          {
            title: 'telpon',
            value: data.telpon
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

DetailUserScreen.navigationOptions = ({ navigation }) => ({
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
)(DetailUserScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingMedium },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
})