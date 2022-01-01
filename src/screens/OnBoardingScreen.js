import React from 'react'
import {
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View, // Container component
  Image,
} from 'react-native'
import { connect } from 'react-redux'
import Dimens from '../constants/Dimens'
import OnBoardingPanel from '../components/panel/OnBoarding'
import { BaseScreen } from './BaseScreen'
import { globalConstant } from '../store/constants'
import Logger from '../library/helper/Logger'

class OnBoardingScreen extends BaseScreen {
  constructor(props) {
    super(props)

    this.screens = [
      {
        image: require('../assets/images/onboard/baby.png'),
        title: 'Periksa Kesehatan Bayi',
        content: 'Lihat Catatan Kesehatan Bayi Anda Disini',
      },
      {
        image: require('../assets/images/onboard/health.png'),
        title: 'Manajemen Sistem Informasi Klinik',
        content: 'Aplikasi Sistem Informasi Klinik',
      },
    ]

    this.onSkip = this.onSkip.bind(this)
  }

  render() {
    return (
      <OnBoardingPanel skip={this.onSkip()}>
        {this.screens.map((v, i) => (
          <View style={styles.slide} key={i}>
            <Image
              style={styles.bg}
              source={require('../assets/images/bg_curve.png')}
              resizeMode="stretch"
            />
            <View style={styles.image}>
              <Image
                style={{
                  width: '75%',
                  height: '75%',
                  alignSelf: 'center',
                }}
                source={v.image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.header}>{v.title}</Text>
              <Text style={styles.text}>{v.content}</Text>
            </View>
          </View>
        ))}
      </OnBoardingPanel>
    )
  }

  onSkip() {
    Logger.log('check')
    this.props.dispatch({
      type: globalConstant.SET_GLOBAL_ON_BOARDING,
      payload: Date.now(),
    })
  }
}

export default connect(null, (dispatch) => ({ dispatch }))(OnBoardingScreen)

const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'white'
  },
  image: {
    flexBasis: '100%',
    flexShrink: 1,
    flexGrow: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexBasis: '30%',
    flexShrink: 0,
    flexGrow: 0,
    alignItems: 'flex-start',
    paddingHorizontal: Dimens.paddingMedium,
  },
  bg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    alignSelf: 'flex-end',
    height: '40%',
  },
  // Header styles
  header: {
    width: '100%',
    color: '#FFFFFF',
    fontFamily: 'myriad-pro',
    fontSize: Dimens.textLarge,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Text below header
  text: {
    width: '100%',
    color: '#FFFFFF',
    fontFamily: 'myriad-pro',
    fontSize: Dimens.textMedium,
    textAlign: 'center',
  },
})
