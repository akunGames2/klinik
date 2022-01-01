import React from 'react'
import { StyleSheet, View, Image, ScrollView, TouchableOpacity, Platform, Text } from 'react-native'
import { Button, Input, CheckBox, Overlay } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import * as WebBrowser from 'expo-web-browser'
import { Formik } from 'formik'
import { connect } from 'react-redux'

import Dimens from '../../constants/Dimens'
import Styles from '../../constants/Styles'
import Colors from '../../constants/Colors'
import Formatter from '../../library/helper/Formatter'
import { BaseScreen } from '../BaseScreen'
import { register } from '../../store/actions/authAction'
import NavKey from '../../constants/NavKey'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from 'react-native-modal-datetime-picker'
import DateTime from '../../library/helper/DateTime'
import Logger from '../../library/helper/Logger'

class RegisterScreen extends BaseScreen {
  constructor(props) {
    super(props)

    this.state = {
      overlay: false,
      statusFilter: [
        {
        id: "Pria"
        },
        {
        id: "Wanita"
        }
      ],
      selectedStatus: "Pria",
      datePickerExpiry: {
        id: 'expiry',
        date: new Date,
        show: false,
        mode: 'date',
        datePicketElement: false,
        value: ''
      },
    }    
    this.onSubmit = this.onSubmit.bind(this)
    this.registerSuccessCallback = this.props.navigation.getParam('callback')
  }

  render() {
    const that = this
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
              email: '',
              name: '',
              username: '',
              phone: '',
              address: '',
              password: '',
              age: '',
              job: '',
              study: '',
            }}
            onSubmit={this.onSubmit}
          >
            {({ values, handleSubmit, handleChange, setFieldValue }) => {
              // const handleChangePhone = (e) => {
              //   setFieldValue('phone', Formatter.serial(e))
              // }
              return (
                <>
                  <Input
                    ref={(input) => {
                      this.inputName = input
                    }}
                    label="Username"
                    placeholder="Masukkan Username"
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
                    placeholder="Masukkan Password"
                    onChangeText={handleChange('password')}
                    value={values.password}
                    returnKeyType="next"
                    secureTextEntry={true}
                    onSubmitEditing={() => {
                      this.inputName.focus()
                    }}
                    blurOnSubmit={false}
                  />
                  <Input
                    ref={(input) => {
                      this.inputName = input
                    }}
                    label="Nama Lengkap"
                    placeholder="Masukkan Nama Lengkap"
                    onChangeText={handleChange('name')}
                    value={values.name}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.inputEmail.focus()
                    }}
                    blurOnSubmit={false}
                  />
                  <Input
                    ref={(input) => {
                      this.inputEmail = input
                    }}
                    label="Email"
                    placeholder="Masukkan Email"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      this.inputPhone.focus()
                    }}
                    blurOnSubmit={false}
                  />
                  <Input
                    ref={(input) => {
                      this.inputPhone = input
                    }}
                    label="Nomor Telepon"
                    placeholder="Masukkan Nomor Telepon"
                    onChangeText={handleChange('phone')}
                    value={values.phone}
                    returnKeyType="next"
                    keyboardType="numeric"
                    onSubmitEditing={() => {
                      this.inputAddress.focus()
                    }}
                    blurOnSubmit={false}
                  />
                  <Input
                    ref={(input) => {
                      this.inputAddress = input
                    }}
                    label="Alamat"
                    placeholder="Masukkan Alamat"
                    onChangeText={handleChange('address')}
                    value={values.address}
                    returnKeyType="next"                   
                    blurOnSubmit={false}
                  />
                  <Text
                    style={{                
                      fontSize: Dimens.textLarge,
                      fontWeight: 'bold',
                      color: 'grey',
                      paddingLeft: 10
                    }}
                  >
                    Jenis Kelamin
                  </Text>
                  <Picker
                    selectedValue={this.state.selectedStatus}
                    onValueChange={(itemValue, itemIndex) => this.setState({selectedStatus: itemValue})}>
                    {this.state.statusFilter.map((item, i) => (                
                      <Picker.Item key={i} label={item.id} value={item.id} />
                      ))}
                  </Picker>
                  <Input
                    ref={(input) => {
                      this.inputUsia = input
                    }}
                    label="Usia"
                    placeholder="Masukkan Usia"
                    onChangeText={handleChange('age')}
                    value={values.age}
                    keyboardType="numeric"
                    returnKeyType="next"                   
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.inputJob.focus()
                    }}
                  />
                  <Input
                    ref={(input) => {
                      this.inputJob = input
                    }}
                    label="Pekerjaan"
                    placeholder="Masukkan Pekerjaan"
                    onChangeText={handleChange('job')}
                    value={values.job}
                    returnKeyType="next"                   
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      this.inputStudy.focus()
                    }}
                  />
                  <Input
                    ref={(input) => {
                      this.inputStudy = input
                    }}
                    label="Pendidikan"
                    placeholder="Masukkan Pendidikan"
                    onChangeText={handleChange('study')}
                    value={values.study}
                    blurOnSubmit={false}
                  />
                  <TouchableOpacity 
                      onPress={() => {                        
                        this.setState({datePickerExpiry: {datePicketElement: !this.state.datePickerExpiry.datePicketElement}})
                      }}
                      // disabled={!this.state.switchDate}
                    >
                      <Input
                        ref={(input) => {
                          this.inputExpiry = input
                        }}
                        label={"Tanggal KIA"}
                        inputContainerStyle={{borderBottomWidth:0}}
                        onChangeText={handleChange('date')}
                        placeholder="Rabu, 07 Juli 2021"
                        value={this.state.datePickerExpiry.value}
                        disabled={true}
                      />   
                    </TouchableOpacity>
                    <DateTimePicker                                      
                      isVisible={this.state.datePickerExpiry.datePicketElement}
                      mode="date"
                      onConfirm={this.handleConfirmExpiry}
                      onCancel={this.hideDatePickerExpiry}
                    />
                  
                  <View style={styles.buttonContainer}>
                    <Button
                      style={Styles.button}
                      buttonStyle={{backgroundColor: Colors.buttonRed }}
                      title={"DAFTARKAN SEKARANG"}
                      onPress={handleSubmit}
                    />
                  </View>
                </>
              )
            }}
          </Formik>
        </ScrollView>
      </View>
    )
  }

  hideDatePickerExpiry = () => {
    this.setState({datePickerExpiry: {
      value: this.state.datePickerExpiry.value
    }})
  }

  handleConfirmExpiry = (date) => {    
    this.setState({datePickerExpiry: {
      value: DateTime.format(date, DateTime.FORMAT_DATE_DMY)
    }})
    this.hideDatePickerExpiry()
  }

  async onSubmit(values, { setFieldValue }) {    
    const { name } = values
    const { username } = values
    const { password } = values
    const { email } = values
    const { phone } = values
    const { address } = values
    const { age } = values
    const { job } = values
    const { study } = values
    if (username) {
      if (password) {
        if(name) {
          const result = await this.props.dispatch(
            register(
              username,
              password,
              name,
              email,
              phone,
              address,
              age,
              job,
              study,
              this.state.selectedStatus,
              this.state.datePickerExpiry.value
            )
          )
          if (result.isSuccess()) {
            this.showError(result.getMessage())
            setFieldValue('email', '')
            setFieldValue('name', '')
            setFieldValue('username', '')
            setFieldValue('phone', '')
            setFieldValue('address', '')
            setFieldValue('password', '')
            setFieldValue('address', '')
            setFieldValue('age', '')
            setFieldValue('job', '')
          } else {
            this.showError(result.getMessage())
            setFieldValue('email', '')
            setFieldValue('name', '')
            setFieldValue('username', '')
            setFieldValue('phone', '')
            setFieldValue('address', '')
            setFieldValue('password', '')
            setFieldValue('address', '')
            setFieldValue('age', '')
            setFieldValue('job', '')
          }
        } else {
          this.showError('Silakan input Nama anda')
        }
      } else {
        this.showError('Silakan input Password anda')
      }
    } else {
      this.showError('Silakan input Username anda')
    }
  }
}

export default connect(
  null,
  (dispatch) => ({ dispatch })
)(RegisterScreen)

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Dimens.paddingLarge,
  },
  iconImage: { height: Dimens.thumbLarge, width: Dimens.thumbLarge, marginBottom: 50 },
})
