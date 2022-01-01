import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const FloatingActionButton = ({navigation, name, iconType, align="right"}) => {  
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={navigation} style={align == "right" ? styles.TouchableOpacityStyle : styles.TouchableOpacityStyleLeft} >
      {iconType == 'Ionicons' && <Ionicons
        name={name ? name : 'add'}
        size={30}
        color={'#fff'}
      />}
      {iconType == 'MaterialCommunityIcons' && <MaterialCommunityIcons
        name={name ? name : 'add'}
        size={30}
        color={'#fff'}
      />}
    </TouchableOpacity>
  );
}

export default FloatingActionButton

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Colors.buttonRed
  },
  floatinBtn: {
    width: 60,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: '#fff',                                    
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10, 
  },
  box: {
    width: 60,
    height: 60,
    backgroundColor: 'pink'
  },
  TouchableOpacityStyle:{
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    right: 10,
    bottom: 10,
    backgroundColor: '#692887',
    borderRadius: 40,
    elevation: 4
  },
  TouchableOpacityStyleLeft:{
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    left: 10,
    bottom: 10,
    backgroundColor: '#692887',
    borderRadius: 40,
    elevation: 4
  }
})
