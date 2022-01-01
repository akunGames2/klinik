import remoteConfig from '@react-native-firebase/remote-config'
import { IS_DEV } from '../../utils'
import Logger from './Logger'

const RemoteConfig = {
  bootstrap: async () => {
    await remoteConfig().setConfigSettings({
      isDeveloperModeEnabled: RemoteConfig.isDebug,
    })
    await RemoteConfig.refetch()
  },

  getAll: async () => {
    let data
    try {
      await RemoteConfig.refetch()

      data = await remoteConfig().getAll()
    } catch (e) {
      Logger.error('REMOTE CONFIG', e)

      data = []
    }

    return data
  },

  getValue: async (key) => {
    try {      
      await RemoteConfig.refetch()
      const data = await remoteConfig().getValue(key)      
      if (typeof data === 'object' && data._value) {
        return data._value
      }
    } catch (e) {
      Logger.error('REMOTE CONFIG', e)
    }

    return ''
  },

  refetch: async () => {
    if (RemoteConfig.isDebug) {
      await remoteConfig().fetch(0)
      await remoteConfig().activate()
    } else {
      await remoteConfig().fetchAndActivate()
    }
  },

  isDebug: IS_DEV || Logger.IS_LOGGABLE,
}

export default RemoteConfig
