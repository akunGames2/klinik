import Dimens from './Dimens'
import Colors from './Colors'

const MAIN_FONT_FAMILY = 'Raleway'
// const MAIN_FONT_FAMILY = 'KirangHaerangs'

export default {
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',    
  },
  contentContainer: {
    position: 'relative',
  },
  grid: {
    parent: {
      flex: 1,
      flexDirection: 'row',
      // justifyContent: 'space-evenly',
      flexWrap: 'wrap',
    },
    card: {
      borderWidth: 0,
      borderRadius: Dimens.radiusMedium,
      padding: Dimens.paddingSmall,
      margin: 0,
      elevation: Dimens.elevationSmall,
    },
    item: {
      justifyContent: 'center',
      flexBasis: '25%',
      padding: Dimens.paddingMedium,
    },
    icon: {
      tintColor: Colors.colorPrimary,
      width: Dimens.iconMedium,
      height: Dimens.iconMedium,
      alignSelf: 'center',
    },
    banner: {
      width: '100%',
      height: Dimens.thumbLarge,
      alignSelf: 'center',
      borderTopLeftRadius: Dimens.radiusMedium,
      borderTopRightRadius: Dimens.radiusMedium,
    },
    label: {
      fontFamily: MAIN_FONT_FAMILY,
      textAlign: 'center',
      textTransform: 'uppercase',
      marginTop: Dimens.paddingSmall,
      // color: Colors.colorPrimary,
      fontSize: Dimens.textMenu,
      flex: 1,
      alignSelf: 'center',
    },
    label_alt: {
      fontFamily: MAIN_FONT_FAMILY,
      textAlign: 'center',
      textTransform: 'uppercase',
      color: Colors.colorPrimary,
      fontSize: Dimens.textMedium,
      minHeight: Dimens.textMedium * 2,
      flex: 1,
    },
    price: {
      fontFamily: MAIN_FONT_FAMILY,
      textAlign: 'center',
      marginTop: Dimens.paddingSmall,
      color: Colors.nominal,
      fontSize: Dimens.textLarge,
      flex: 1,
    },
  },
  button: {
    fontFamily: MAIN_FONT_FAMILY,
    borderRadius: Dimens.radiusMedium,  
  },
  buttonOnly: {
    borderRadius: Dimens.radiusMedium,
  },
  textOnly: {
    fontFamily: MAIN_FONT_FAMILY,
  },
  title: {
    fontWeight: 'bold',    
    // color: Colors.colorPrimary,
    fontFamily: MAIN_FONT_FAMILY,
    fontSize: Dimens.textMedium,
    paddingLeft: Dimens.paddingMedium,
    // paddingRight: Dimens.paddingMedium,
    // paddingTop: Dimens.paddingSmall,
    // paddingBottom: Dimens.paddingSmall,
  },
  subtitle: {
    fontSize: Dimens.textMedium,
    fontWeight: 'bold',
    fontFamily: MAIN_FONT_FAMILY,
    color: Colors.textBody,
    paddingLeft: Dimens.paddingSmall,
    paddingRight: Dimens.paddingSmall,
    paddingTop: Dimens.paddingSmall,
    paddingBottom: Dimens.paddingSmall,
  },
  sheetStyle: {
    container: {
      // justifyContent: 'center',
      // alignItems: 'center',
      borderTopLeftRadius: Dimens.radiusMedium,
      borderTopRightRadius: Dimens.radiusMedium,
    },
  },
  error: {
    fontFamily: MAIN_FONT_FAMILY,
    fontStyle: 'italic',
    color: 'red',
  },
  price: {
    fontFamily: MAIN_FONT_FAMILY,
    color: Colors.highlight,
    fontWeight: 'bold',
  },
  bannerPage: {
    height: Dimens.thumbLarge,
  },
  calculatePaddingByPosition: (position, grid_count, pad) => {
    let left = pad
    let right = pad
    if (position === 0) {
      left = 0
    }
    if (position >= grid_count - 1) {
      right = 0
    }
    return {
      paddingLeft: left,
      paddingRight: right,
    }
  },
}
