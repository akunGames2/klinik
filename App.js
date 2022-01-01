/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect}from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import Colors from './src/constants/Colors'

import { Provider } from 'react-redux'
import store, { persistor } from './src/store'
import { PersistGate } from 'redux-persist/integration/react'
import { MessageLoading } from './src/components/global/MessageLoading'

import { SwitchNavigator } from './src/navigation/SwitchNavigator'

import {
  setCustomText,
  setCustomTextInput,
  setCustomTouchableOpacity,
  setCustomView,
} from 'react-native-global-props'


const App = () => {
  
  useEffect(() => {
    SplashScreen.hide();

  }, []);

  // checkAppVersion()
  loadResourcesAsync()  

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={styles.container}>
          {Platform.OS === 'ios' ? (
            <StatusBar barStyle="light-content" />
          ) : (
            <StatusBar backgroundColor={Colors.colorPrimary} barStyle="light-content" />
          )}
          <MessageLoading />
          <SwitchNavigator />
        </View>
      </PersistGate>
    </Provider>
  );
};

const MAIN_FONT_FAMILY = 'Raleway'

async function loadResourcesAsync() {
  const custom = {
    style: {
      fontFamily: MAIN_FONT_FAMILY,
    },
    titleStyle: {
      fontFamily: MAIN_FONT_FAMILY,
    },
    subtitleStyle: {
      fontFamily: MAIN_FONT_FAMILY,
    },
    titleProps: {
      style: {
        fontFamily: MAIN_FONT_FAMILY,
      },
    },
  }
  setCustomView(custom)
  setCustomText(custom)
  setCustomTextInput(custom)
  setCustomTouchableOpacity(custom)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
