import React from 'react'
import { StyleSheet, View, Image, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Formik } from 'formik'
import { connect } from 'react-redux'

import Dimens from '../../constants/Dimens'
import Styles from '../../constants/Styles'
import Colors from '../../constants/Colors'
import { BaseScreen } from '../BaseScreen'
import { change_pass } from '../../store/actions/authAction'
import { TouchableOpacity } from 'react-native'

class ResetScreen extends BaseScreen {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.resetSuccessCallback = this.props.navigation.getParam('callback')
    // this.username = this.props.navigation.getParam('username')
  }

  render() {
    return (
      <View style={Styles.outerContainer}>
        <ScrollView
          style={Styles.container}
          contentContainerStyle={styles.containerStyle}
          keyboardShouldPersistTaps="always"
        >
          <Formik
            initialValues={{
              email: this.email,
            }}
            onSubmit={this.onSubmit}
          >
            {({ values, handleSubmit, handleChange, setFieldValue }) => {
              return (
                <>
                  <KeyboardAvoidingView
                    style={styles.inputContainer}
                    contentContainerStyle={{ backgroundColor: Colors.background }}
                    behavior="position"
                  >
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        this.inputEmail.focus()
                      }}
                    >
                      <Input
                        ref={(input) => {
                          this.inputEmail = input
                        }}
                        label="Email"
                        labelStyle={styles.label}
                        style={styles.input}
                        inputContainerStyle={{borderBottomWidth:0}}
                        containerStyle={{ marginTop: Dimens.paddingSmall }}
                        placeholder="Masukkan Email Aktif Anda"
                        onChangeText={handleChange('email')}
                        value={values.phone}
                      />
                    </TouchableOpacity>
                  </KeyboardAvoidingView>
                  <View style={styles.buttonContainer}>
                    <Button style={Styles.button} buttonStyle={{backgroundColor: Colors.buttonRed }} title="Reset" onPress={handleSubmit} />
                  </View>
                </>
              )
            }}
          </Formik>
        </ScrollView>
      </View>
    )
  }

  async onSubmit(values, { setFieldValue }) {
    const email = values.email
    if (email) {
      const result = await this.props.dispatch(change_pass(email, true))
      if (result.isOK()) {
        this.showSuccess(result.getRd(), () => {
          this.props.navigation.goBack(null)
          if (this.resetSuccessCallback) {
            this.resetSuccessCallback(email, result.getRd())
          }
        })
      } else {
        this.showError(result.getRd())
        setFieldValue('email', '')
      }
    } else {
      this.showError('Silakan input Email Anda')
    }
  }
}

export default connect(null, (dispatch) => ({ dispatch }))(ResetScreen)

const styles = StyleSheet.create({
  containerStyle: { position: 'relative', padding: Dimens.paddingLarge },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Dimens.paddingLarge,
  },
  iconImage: { height: Dimens.thumbMedium, width: Dimens.thumbMedium },
  inputContainer: {
    marginTop: Dimens.paddingMedium,
    backgroundColor: Colors.background,
  },
  buttonContainer: {
    marginTop: Dimens.paddingMedium,
    padding: Dimens.paddingSmall,
  },
  label: { 
    fontSize: Dimens.textMedium,
    color: Colors.textBody,
    borderWidth:1,                      
    borderColor:'lightgrey',
    borderBottomWidth: 0,
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    padding: 5,
    paddingLeft: 10,
    marginBottom: -5,
  },
  input: {              
    fontSize: Dimens.textLarge,
    marginTop:-10,
    marginBottom:-20,
    paddingTop:-10,
    paddingBottom:-10,
    paddingLeft: 10,
    borderWidth:1,                      
    borderColor:'lightgrey',
    borderTopWidth: 0,
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
  },
})
