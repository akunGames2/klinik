import { Platform } from 'react-native'

const padding = 16
const radius = 8
const icon = 36
const thumb = 96
const text = 12
const border = 2

export default {  
  paddingVerySmall: padding / 3,
  paddingSmall: padding / 2,
  paddingMedium: padding,
  paddingLarge: padding * 2,
  radiusMedium: radius,
  thumbSmall: thumb / 2,
  thumbMedium: thumb,
  thumbLarge: thumb * 2,
  iconVerySmall: icon / 3,
  iconSmall: icon / 2,
  iconMedium2: icon / 1.5,
  iconDrawable: (icon * 2) / 3,
  iconMedium: icon,
  iconLarge: icon * 2,
  iconBar: (icon * 3) / 2,
  iconGrid: icon + 8,
  elevationSmall: 2,
  elevation: 4,
  textMenu: 9,
  textSmall: (text * 3) / 4,
  textMedium: text,
  textLarge: 16,
  textVeryLarge: 20,
  footerHeight: 56,
  toolbarHeight: 42,
  buttonHeight: 24,
  borderThin: border / 2,
  borderMedium: border,
  borderThick: border * 2,
  notificationBar: Platform.select({
    android: 25,
    default: 0,
  }),
  qr: thumb * 2,
  bannerHeight: 144,
}
