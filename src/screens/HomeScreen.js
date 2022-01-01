import React from 'react'
import {
  ScrollView,
  View,
  Alert,
  Linking,
  RefreshControl,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'

import Styles from '../constants/Styles'
import { BaseScreen } from './BaseScreen'
import {logout } from '../store/actions/authAction'
import NavKey from '../constants/NavKey'
import Logger from '../library/helper/Logger'

class HomeScreen extends BaseScreen {
  constructor(props) {
    super(props)
    
    this.state = {
      permission: [],
      loop: [{
        'no': 1
        },{
          'no':2
        }
      ]
      
    }
    
    this.refresh = this.refresh.bind(this)
  }
  
  render() {
    // Logger.log('this.state.permission',this.state.permission)
    return (
      <View style={[Styles.outerContainer,{backgroundColor: 'white'}]}>
        <ScrollView
          style={{ 
            flex: 1
          }}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={this.state.loading} onRefresh={this.refresh} />
          }
        >
          <View>
            <Text
              style={{
                margin: 20,
                fontSize: 20,
                fontWeight: 'bold'
              }}
            >
              Selamat Datang {this.props.lp__name}
            </Text>
          </View>
          {this.state.permission && this.state.permission.map((modul, i) => 
            modul.code != "dashboard" && <TouchableOpacity
              onPress={() => {
                // Logger.log('true')
                // this.props.navigation.goBack(null)
                this.props.navigation.navigate(modul.route)
              }}
              key={i}
            >
              <View
                style={{
                  width: '90%',
                  height: 100,
                  backgroundColor: modul.color,
                  flex: 1,
                  marginHorizontal: 20,
                  borderRadius: 30,
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10
                  // alignSelf: 'center'
                }}
              >
                <View
                  style={{
                    width: 100,
                    height: 80,
                    // flex: 1,
                    // backgroundColor: 'green',
                    marginHorizontal: 20                  
                  }}
                >
                  <Image
                    source={{ uri: modul.image}}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 150
                    }}
                    resizeMode="contain"
                  />
                </View>
                <View
                    style={{
                      width: 150,
                      height: '100%',
                      alignContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      marginTop: 30
                      // alignSelf: 'center'
                      // backgroundColor: 'blue',
                      // marginHorizontal: 20
                    }}
                  >
                    <Text
                      style={{
                        // backgroundColor: 'blue',
                        fontSize: 20,
                        color: 'white',
                      }}
                    >{modul.modul}</Text>
                  </View>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              // Logger.log('true')
              this.props.dispatch(logout(this.props.navigation.navigate(NavKey.LOGIN)))
            }}
          >
            <View
              style={{
                width: '90%',
                height: 100,
                backgroundColor: this.state.permission.color,
                flex: 1,
                marginHorizontal: 20,
                borderRadius: 30,
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                // alignSelf: 'center'
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 80,
                  // flex: 1,
                  // backgroundColor: 'green',
                  marginHorizontal: 20                  
                }}
              >
                <Image
                  source={{ uri: 'https://i.postimg.cc/DzVxWY3y/undraw-Login-re-4vu2.png'}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 150
                  }}
                  resizeMode="contain"
                />
              </View>
              <View
                  style={{
                    width: 150,
                    height: '100%',
                    alignContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    marginTop: 30
                    // alignSelf: 'center'
                    // backgroundColor: 'blue',
                    // marginHorizontal: 20
                  }}
                >
                  <Text
                    style={{
                      // backgroundColor: 'blue',
                      fontSize: 40,
                      color: 'white',
                    }}
                  >Logout</Text>
                </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }

  async componentDidMount() { 
    let data = await this.get_permission()
    this.setState({permission: data})
  }

  async refresh() {
    let data = await this.get_permission()
    this.setState({permission: data, loading: false})
  }
  
  
}

HomeScreen.navigationOptions = {
  headerShown: false,
}

export default connect(
  (state) => ({ ...state.Auth}),
  (dispatch) => ({ dispatch })
)(HomeScreen)
