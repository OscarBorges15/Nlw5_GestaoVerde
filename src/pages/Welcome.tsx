import React, {useState} from 'react';
import {SafeAreaView,
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions, 
} from 'react-native';

import wateringImg from '../assets/watering.png' ;
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core'

export function Welcome (){

  const navigation = useNavigation();

  function handleStart(){
    navigation.navigate('UserIndentification');

  }


  return(
    <SafeAreaView style={style.conteiner}>
      <View style={style.wrapper}>
      <Text style={style.tittle}> 
        Gerencie {'\n'}
        suas plantas de {'\n'}
         forma fácil 
      </Text>
          
      <Image 
      source={wateringImg} 
      style={style.image}
      resizeMode="contain"/>

      <Text style={style.subtittle}>
       Não esqueça mais de regar suas plantas.
       Nós cuidamos de lembrar você sempre que precisar.
      </Text>

      <TouchableOpacity 
        style={style.button} 
        activeOpacity={0.7}
        onPress={handleStart} >

         <Feather 
            name="chevron-right"
           style={style.buttonicon} /> 

      </TouchableOpacity>
     
      </View>
    </SafeAreaView>
     
  )
}

const style = StyleSheet.create({
  conteiner : {
    flex: 1,

  },
  wrapper:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal:20

  },
  tittle :{
    fontSize: 28,
    fontWeight: 'bold',
    textAlign:'center',
    color: colors.heading,
    paddingHorizontal:20,
    fontFamily: fonts.heading,
    lineHeight:38
    
  },
  subtittle:{
    textAlign:'center',
    fontSize: 18,
    paddingHorizontal:18,
    color: colors.heading,
    fontFamily: fonts.text,
  
  }, 
  image:{
    height: Dimensions.get('window').width*0.7,

  },
  buttonText:{
    color:colors.white,
    fontSize:18,

  },
  button:{
    backgroundColor: colors.green,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:16,
    marginBottom:10,
    height:52,
    width: 56
    
  },
  buttonicon:{
    fontSize:30,
    color: colors.white,
  
  }

  


})