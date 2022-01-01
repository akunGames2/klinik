import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import OnBoardingScreen from '../screens/OnBoardingScreen'

export default createAppContainer(
  createStackNavigator(
    {
      Main: OnBoardingScreen,
    },
    { headerMode: 'none' }
  )
)
