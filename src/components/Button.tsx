import React from 'react';
import {SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, TouchableOpacityProps } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps{
  title: string;
}


export function Button ({title, ...rest} : ButtonProps){
  return(
    <TouchableOpacity 
      style={styles.conteiner}
      {...rest}
      >
      <Text style={styles.text}>
        {title}
      </Text>
   </TouchableOpacity>   
  )
}

const styles = StyleSheet.create({
  text:{
    color:colors.white,
    fontSize:16,
    fontFamily:fonts.heading,
  },
  conteiner:{
    backgroundColor: colors.green,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:16,
    height:56,
    

  },


})