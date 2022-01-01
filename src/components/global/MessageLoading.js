import React from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'
import { Overlay } from 'react-native-elements'

import Colors from '../../constants/Colors'
import Dimens from '../../constants/Dimens'
import Logger from '../../library/helper/Logger'

export const MessageLoading = () => {
  const isVisible = useSelector((state) => state.Global.spinnerLoading)

  return (
    <Overlay
      isVisible={isVisible}
      containerStyle={{ padding: Dimens.paddingLarge }}
      width={196}
      height={144}
    >
      <View style={[styles.container]}>
        <ActivityIndicator size="large" color={Colors.colorPrimary} />
        <Text style={styles.text}>mohon tunggu...</Text>
      </View>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingTop: Dimens.paddingMedium,
  },
})
