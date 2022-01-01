import { Dimensions, Platform, Linking } from 'react-native'

const Display = {
  getScreenWidth: () => Math.round(Dimensions.get('window').width),

  getScreenHeight: () => Math.round(Dimensions.get('window').height),

  openDial: (phoneNumber) => {
    let dial = ''
    if (Platform.OS === 'android') {
      dial = `tel:${phoneNumber}`
    } else {
      dial = `telprompt:${phoneNumber}`
    }

    Linking.openURL(dial)
  },
}

export default Display
