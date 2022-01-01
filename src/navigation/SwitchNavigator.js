import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import OnBoardingNavigator from './OnBoardingNavigator'
import AppNavigator from './AppNavigator'
import LoginNavigator from './LoginNavigator'
import Logger from '../library/helper/Logger'

export const SwitchNavigator = () => {
  const onBoardingHasShown = useSelector((state) => state.Global.onBoardingHasShown)
  
  const userId = useSelector((state) => {    
    return state.Auth.lp__user_id
  })

  if (onBoardingHasShown === undefined) {
    return <OnBoardingNavigator />
  }
  if(!userId) {
    return <LoginNavigator />
  }
  return <AppNavigator />
}

// import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux'

// import OnBoardingNavigator from './OnBoardingNavigator'
// import AppNavigator from './AppNavigator'
// import LoginNavigator from './LoginNavigator'
// import Logger from '../library/helper/Logger'

// export const SwitchNavigator = () => {
//   const onBoardingHasShown = useSelector((state) => state.Global.onBoardingHasShown)
  
//   const userId = useSelector((state) => {    
//     return state.Auth.lp__user_id
//   })

//   if (onBoardingHasShown === undefined) {
//     return <OnBoardingNavigator />
//   }

//   if(!userId) {
//     return <LoginNavigator />
//   }
//   return <AppNavigator />
// }


