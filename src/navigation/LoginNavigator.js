import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import NavKey from '../constants/NavKey'
import LoginScreen from '../screens/auth/LoginScreen'
import RegisterScreen from '../screens/auth/RegisterScreen'
import ResetScreen from '../screens/auth/ResetScreen'

export default createAppContainer(
  createStackNavigator(
    {
      // Main: {
      //   screen: LoginScreen
      // },
      [NavKey.LOGIN]: LoginScreen,
      [NavKey.REGISTER]: RegisterScreen,
      [NavKey.RESET]: ResetScreen
    },
    { headerMode: 'none' }
  )
)
