import  React, {useState} from 'react';
import {
  SafeAreaView,
  View, 
  Text,   
  StyleSheet,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/core'

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {Button} from '../components/Button';

interface Params{
  title: string;
  subtitle: string;
  buttonTittle:string;
  icon: 'smile' | 'hug',
  nextScreen: string;

}

const emojis ={
  hug: '👀',
  smile:'😁'
}


export function Confirmation(){
  const navigation = useNavigation();
  const routes = useRoute();

  const {
    title,
    subtitle,
    buttonTittle,
    icon,
    nextScreen

  } = routes.params as Params


  function handleMoveOn(){
    navigation.navigate(nextScreen)

  }


  return(
    <SafeAreaView style={style.container}>
      <View style={style.content}>
        <Text style={style.emoji}>
          {emojis[icon]}
        </Text>
        <Text  style={style.tittle} >
          {title} 

        </Text>

        <Text style={style.subtittle} >
        {subtitle}
        </Text>

        <View style={style.footer}>
         
          <Button
          title={buttonTittle}
          onPress={handleMoveOn}
          />
          
        </View>

      </View>

      




    </SafeAreaView>

  )
}

const style = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',

  },
  tittle:{
    fontSize:22,
    fontFamily: fonts.heading,
    textAlign:'center',
    color:colors.heading,
    lineHeight:38,
    marginTop:15,

  },
  subtittle:{
    fontFamily: fonts.text,
    textAlign:'center',
    fontSize:17,
    paddingHorizontal:10,
    color:colors.heading,
  },

  content:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
    padding:30,

  },
  emoji:{
    fontSize: 78,

  },
  footer:{
    width:'100%',
    paddingHorizontal:50,
    marginTop:20,
  }
  

})