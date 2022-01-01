import React from 'react'
import { ActivityIndicator, Alert, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { BaseScreen } from '../BaseScreen'
import Dimens from '../../constants/Dimens'
import Colors from '../../constants/Colors'
import Logger from '../../library/helper/Logger'

const injectedJavascript = `(function() {
    window.postMessage = function(data) {
  window.ReactNativeWebView.postMessage(data);
};
})()`

export default class WebviewScreen extends BaseScreen {
  constructor(props) {
    super(props)
    const { params } = props.navigation.state
    const url = typeof params.url === 'string' ? params.url : ''

    this.state = { url }
    this.success_callback = params.callback
    this.handleMessage = this.handleMessage.bind(this)
    this.props.navigation.setParams({ title: params.title })
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    if (params.url instanceof Promise) {
      params.url.then((url) => this.setState({ url }))
    }
  }

  render() {
    return (
      <WebView
        source={{ uri: this.state.url }}
        originWhitelist={['*']}
        ref={(reff) => {
          this.webView = reff
        }}
        useWebKit
        style={{ paddingTop: Dimens.notificationBar }}
        injectedJavaScript={injectedJavascript}
        mixedContentMode="compatibility"
        onMessage={this.handleMessage}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color={Colors.colorPrimary} />
          </View>
        )}
        onError={() => {
          // const { nativeEvent } = syntheticEvent
          Alert.alert('Perhatian', 'Terjadi kesalahan', [{ text: 'OK' }])
        }}
      />
    )
  }

  handleMessage(msg) {    
    if(msg.nativeEvent.data == undefined) {      
      const data = JSON.parse(msg.nativeEvent.data)

      if (data.step) {
        if (data.step === 'back') {
          this.props.navigation.goBack(null)
        } else if (data.step === 'action') {
          if (this.success_callback) {
            this.success_callback(data)
          } else {
            this.props.navigation.goBack(null)
          }
        } else if (data.step === 'response') {
          if (data.rc === '00') {
            this.showSuccess(data.rd, () => {
              this.props.navigation.goBack(null)
              if (this.success_callback) {
                this.success_callback(data)
              }
            })
          } else {
            this.showError(data.rd)
          }
        }
      }
    }  
  }
}

WebviewScreen.navigationOptions = ({ navigation }) => ({
  title:
    typeof navigation.state.params === 'undefined' ||
    typeof navigation.state.params.title === 'undefined'
      ? ''
      : navigation.state.params.title,
  headerStyle: { backgroundColor: Colors.colorPrimary },
  headerTintColor: Colors.textInverse,
})
