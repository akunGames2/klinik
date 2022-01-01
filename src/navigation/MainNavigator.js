import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import NavKey from '../constants/NavKey'
import HomeScreen from '../screens/HomeScreen'
import MyAccountScreen from '../screens/account/MyAccountScreen'
import EditAccountScreen from '../screens/account/EditAccountScreen'
import ChangePassScreen from '../screens/account/ChangePassScreen'
import ListScreen from '../screens/tools/ListScreen'
import DetailScreen from '../screens/tools/DetailScreen'
import AddScreen from '../screens/tools/AddScreen'
import UpdateScreen from '../screens/tools/UpdateScreen'
import ListCardMotherScreen from '../screens/cardmother/ListCardMotherScreen'
import DetailCardMotherScreen from '../screens/cardmother/DetailCardMotherScreen'
import AddCardMotherScreen from '../screens/cardmother/AddCardMotherScreen'
import UpdateCardMotherScreen from '../screens/cardmother/UpdateCardMotherScreen'

import ListCardBabyScreen from '../screens/cardbaby/ListCardBabyScreen'
import DetailCardBabyScreen from '../screens/cardbaby/DetailCardBabyScreen'
import AddCardBabyScreen from '../screens/cardbaby/AddCardBabyScreen'
import UpdateCardBabyScreen from '../screens/cardbaby/UpdateCardBabyScreen'

import ListCardKbScreen from '../screens/cardkb/ListCardKbScreen'
import DetailCardKbScreen from '../screens/cardkb/DetailCardKbScreen'
import AddCardKbScreen from '../screens/cardkb/AddCardKbScreen'
import UpdateCardKbScreen from '../screens/cardkb/UpdateCardKbScreen'

import ListPaymentScreen from '../screens/payment/ListPaymentScreen'
import DetailPaymentScreen from '../screens/payment/DetailPaymentScreen'
import AddPaymentScreen from '../screens/payment/AddPaymentScreen'
import UpdatePaymentScreen from '../screens/payment/UpdateScreen'

import ListScreenMedicine from '../screens/medicine/ListScreenMedicine'
import DetailScreenMedicine from '../screens/medicine/DetailScreenMedicine'
import AddScreenMedicine from '../screens/medicine/AddScreenMedicine'
import UpdateScreenMedicine from '../screens/medicine/UpdateScreenMedicine'
import ListPurchaseScreenMedicine from '../screens/purchasemedicine/ListScreenMedicine'
import DetailPurchaseScreenMedicine from '../screens/purchasemedicine/DetailScreenMedicine'
import AddPurchaseScreenMedicine from '../screens/purchasemedicine/AddScreenMedicine'
import UpdatePurchaseScreenMedicine from '../screens/purchasemedicine/UpdateScreenMedicine'
import ListPurchaseScreenTools from '../screens/purchasetool/ListScreen'
import DetailPurchaseScreenTools from '../screens/purchasetool/DetailScreen'
import AddPurchaseScreenTools from '../screens/purchasetool/AddScreen'
import UpdatePurchaseScreenTools from '../screens/purchasetool/UpdateScreen'
import ProductChooserScreen from '../screens/single/ProductChooserScreen'
import ListScreenService from '../screens/service/ListScreenService'
import AddScreenService from '../screens/service/AddScreenService'
import DetailScreenService from '../screens/service/DetailScreenService'
import UpdateScreenService from '../screens/service/UpdateScreenService'
import ListScreenPresctiption from '../screens/prescription/ListScreen'
import AddScreenPresctiption from '../screens/prescription/AddScreen'
import DetailScreenPresctiption from '../screens/prescription/DetailScreen'
import UpdateScreenPresctiption from '../screens/prescription/UpdateScreen'
import ListUserScreen from '../screens/user/ListUserScreen'
import AddUserScreen from '../screens/user/AddUserScreen'
import DetailUserScreen from '../screens/user/DetailUserScreen'
import UpdateUserScreen from '../screens/user/UpdateUserScreen'

import ListReportScreen from '../screens/report/ListReportScreen'

import QueueScreen from '../screens/queue/QueueScreen'


export default createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: HomeScreen
      },
      [NavKey.HOME]: HomeScreen,
      [NavKey.ACCOUNT]: MyAccountScreen,
      [NavKey.EDITACCOUNT]: EditAccountScreen,
      [NavKey.CHPASS]: ChangePassScreen,
      [NavKey.USER]: ListUserScreen,
      [NavKey.USER_ADD]: AddUserScreen,
      [NavKey.USER_DETAIL]: DetailUserScreen,
      [NavKey.USER_UPDATE]: UpdateUserScreen,
      [NavKey.MANAGEMENT_DATA_TOOL_HEALTH]: ListScreen,
      [NavKey.MANAGEMENT_DATA_TOOL_HEALTH_ADD]: AddScreen,
      [NavKey.MANAGEMENT_DATA_TOOL_HEALTH_DETAIL]: DetailScreen,
      [NavKey.MANAGEMENT_DATA_TOOL_HEALTH_UPDATE]: UpdateScreen,
      [NavKey.MANAGEMENT_PAYMENT]: ListPaymentScreen,
      [NavKey.MANAGEMENT_PAYMENT_ADD]: AddPaymentScreen,
      [NavKey.MANAGEMENT_PAYMENT_DETAIL]: DetailPaymentScreen,
      [NavKey.MANAGEMENT_PAYMENT_UPDATE]: UpdatePaymentScreen,
      [NavKey.CARD_MOTHER]: ListCardMotherScreen,
      [NavKey.CARD_MOTHER_ADD]: AddCardMotherScreen,
      [NavKey.CARD_MOTHER_DETAIL]: DetailCardMotherScreen,
      [NavKey.CARD_MOTHER_UPDATE]: UpdateCardMotherScreen,

      [NavKey.CARD_BABY]: ListCardBabyScreen,
      [NavKey.CARD_BABY_ADD]: AddCardBabyScreen,
      [NavKey.CARD_BABY_DETAIL]: DetailCardBabyScreen,
      [NavKey.CARD_BABY_UPDATE]: UpdateCardBabyScreen,
    
      [NavKey.REPORT]: ListReportScreen,

      [NavKey.QUEUE]: QueueScreen,
      
      [NavKey.CARD_KB]: ListCardKbScreen,
      [NavKey.CARD_KB_ADD]: AddCardKbScreen,
      [NavKey.CARD_KB_DETAIL]: DetailCardKbScreen,
      [NavKey.CARD_KB_UPDATE]: UpdateCardKbScreen,
    
      [NavKey.MANAGEMENT_DATA_MEDICINE]: ListScreenMedicine,
      [NavKey.MANAGEMENT_DATA_MEDICINE_ADD]: AddScreenMedicine,
      [NavKey.MANAGEMENT_DATA_MEDICINE_DETAIL]: DetailScreenMedicine,
      [NavKey.MANAGEMENT_DATA_MEDICINE_UPDATE]: UpdateScreenMedicine,
      [NavKey.MANAGEMENT_DATA_PURCHASE_MEDICINE]: ListPurchaseScreenMedicine,
      [NavKey.MANAGEMENT_DATA_PURCHASE_MEDICINE_ADD]: AddPurchaseScreenMedicine,
      [NavKey.MANAGEMENT_DATA_PURCHASE_MEDICINE_DETAIL]: DetailPurchaseScreenMedicine,
      [NavKey.MANAGEMENT_DATA_PURCHASE_MEDICINE_UPDATE]: UpdatePurchaseScreenMedicine,
      [NavKey.MANAGEMENT_DATA_PURCHASE_MEDICINE]: ListPurchaseScreenMedicine,
      [NavKey.MANAGEMENT_DATA_PURCHASE_MEDICINE_ADD]: AddPurchaseScreenMedicine,
      [NavKey.MANAGEMENT_DATA_PURCHASE_MEDICINE_DETAIL]: DetailPurchaseScreenMedicine,
      [NavKey.MANAGEMENT_DATA_PURCHASE_MEDICINE_UPDATE]: UpdatePurchaseScreenMedicine,
      [NavKey.MANAGEMENT_DATA_PURCHASE_TOOLS]: ListPurchaseScreenTools,
      [NavKey.MANAGEMENT_DATA_PURCHASE_TOOLS_ADD]: AddPurchaseScreenTools,
      [NavKey.MANAGEMENT_DATA_PURCHASE_TOOLS_DETAIL]: DetailPurchaseScreenTools,
      [NavKey.MANAGEMENT_DATA_PURCHASE_TOOLS_UPDATE]: UpdatePurchaseScreenTools,
      [NavKey.MANAGEMENT_DATA_SERVICE]: ListScreenService,
      [NavKey.MANAGEMENT_DATA_SERVICE_ADD]: AddScreenService,
      [NavKey.MANAGEMENT_DATA_SERVICE_DETAIL]: DetailScreenService,
      [NavKey.MANAGEMENT_DATA_SERVICE_UPDATE]: UpdateScreenService,
      [NavKey.MANAGEMENT_DATA_PRESCRIPTION]: ListScreenPresctiption,
      [NavKey.MANAGEMENT_DATA_PRESCRIPTION_ADD]: AddScreenPresctiption,
      [NavKey.MANAGEMENT_DATA_PRESCRIPTION_DETAIL]: DetailScreenPresctiption,
      [NavKey.MANAGEMENT_DATA_PRESCRIPTION_UPDATE]: UpdateScreenPresctiption,
      [NavKey.PRODUCTS]: ProductChooserScreen,
    },
    // { headerMode: 'none' }
  )
)
