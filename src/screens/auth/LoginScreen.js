import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import { Button, Input } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Formik } from 'formik'
import { connect } from 'react-redux'

import Dimens from '../../constants/Dimens'
import Styles from '../../constants/Styles'
import Colors from '../../constants/Colors'
import { IS_DEV } from '../../utils'

// Actions
import { login } from '../../store/actions/authAction'
import { BaseScreen } from '../BaseScreen'
import NavKey from '../../constants/NavKey'
import Logger from '../../library/helper/Logger'
import { Linking } from 'react-native'


class LoginScreen extends BaseScreen {
  constructor(props) {
    super(props)
    Logger.log('check props home',props)
    this.state = { show_password: false, username: IS_DEV ? '' : '', reset_response: '' }
    this.onSubmit = this.onSubmit.bind(this)
    this.goToRegister = this.goToRegister.bind(this)
    this.goToReset = this.goToReset.bind(this)
    this.loginSuccessCallback = this.props.navigation.getParam('callback')
  }

  render() {
    return (
      <View style={Styles.outerContainer}>
        <ScrollView
          style={Styles.container}
          contentContainerStyle={styles.containerStyle}
          keyboardShouldPersistTaps="always"
        >
          <View style={styles.iconContainer}>
            <Image
              source={require('../../assets/images/logo/logo1.png')}
              style={styles.iconImage}
              resizeMode="contain"
            />
          </View>
          <Formik
            initialValues={{
              username: this.state.username,
              password: '',
            }}
            onSubmit={this.onSubmit}
          >
            {({ values, handleSubmit, handleChange, setFieldValue }) => (
              <>
                <KeyboardAvoidingView
                  style={styles.inputContainer}
                  contentContainerStyle={{
                    backgroundColor: Colors.background,
                  }}
                  behavior="position"
                >
                  <Input
                    ref={(input) => {
                      this.inputUsername = input
                    }}
                    label="Email/Username"
                    placeholder="Masukkan Email/Username"
                    onChangeText={handleChange('username')}
                    value={values.username}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.inputPassword.focus()
                    }}
                    blurOnSubmit={false}
                  />
                  <Input
                    ref={(input) => {
                      this.inputPassword = input
                    }}
                    label="Password"
                    placeholder="Masukkan Password Anda"
                    rightIcon={
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            show_password: !this.state.show_password,
                          })
                        }}
                      >
                        <Ionicons
                          name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
                          size={24}
                          color={Colors.colorPrimary}
                        />
                      </TouchableOpacity>
                    }
                    rightIconContainerStyle={styles.rightIcon}
                    secureTextEntry={!this.state.show_password}
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />                  
                </KeyboardAvoidingView>
                <View style={styles.buttonContainer}>
                  <Text
                    style={{
                      textAlign: 'center',
                      marginBottom: Dimens.paddingSmall                      
                    }}
                  >
                    {this.state.reset_response}
                  </Text>
                  <Button style={Styles.button} buttonStyle={{backgroundColor: Colors.colorPrimary }} title="Masuk" onPress={handleSubmit} />
                </View>
                <Text style={{ 
                    paddingLeft: Dimens.paddingLarge,
                    paddingBottom: Dimens.paddingSmall,
                    paddingRight: Dimens.paddingLarge,
                    textAlign: 'center' 
                  }} 
                  onPress={this.goToRegister}
                >
                  Belum punya akun?&nbsp;
                  <Text 
                    style={styles.cta}
                  >
                    Daftar disini
                  </Text>
                </Text>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    )
  }

  goToRegister() {
    this.props.navigation.navigate(NavKey.REGISTER, {
      callback: () => {
        if (this.loginSuccessCallback) {
          this.loginSuccessCallback()
        }
      },
    })
  }

  goToReset(setFieldValue) {
    this.props.navigation.navigate(NavKey.RESET, {
      username: '',
      callback: (username, reset_response) => {
        this.props.navigation.goBack(null)
        setFieldValue('username', username)
        this.setState({ reset_response })
      },
    })
  }

  async onSubmit(values, { setFieldValue }) {
    const { username } = values
    const { password } = values
    if (username && password) {
      const result = await this.props.dispatch(login(username, password))
      if (result.isSuccess()) {
          this.props.navigation.navigate(NavKey.HOME)
          // if (this.loginSuccessCallback) {
          //   this.loginSuccessCallback()
          // }
      }else {
        this.showError(result.getMessage())
        setFieldValue('password', '')
      }
    } else {
      this.showError('Silakan input Email/Username dan password Anda')
    }
  }
}
export default connect(
  (state) => (state),
  (dispatch) => ({ dispatch })
)(LoginScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative'}, 
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Dimens.paddingLarge,
  },
  iconImage: { height: Dimens.thumbLarge, width: Dimens.thumbLarge, marginBottom: 50 },

  buttonContainer: {
  
    padding: Dimens.paddingSmall,    
  },
  cta: { fontWeight: 'bold', color: Colors.colorPrimary },
  
})
