import  React, {useState, useEffect} from 'react';
import {
  Image,
  View, 
  Text,   
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import userImg from '../assets/foto2.png'

export function Header(){
  const [userName,setUserName] = useState<string>();
  

  useEffect (()=> {
    async function LoadStorageUseName() {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '');
    }
    LoadStorageUseName();

  },[]);


  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.username}> 
         {userName}
        </Text>
      </View>

      <Image source={userImg} style={styles.image} />

    </View>

  )
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:15,
    marginTop:getStatusBarHeight(),
    
    

  },
  image:{
    width:70,
    height:70,
    borderRadius:40,
    
  },
  greeting:{
    fontSize:32,
    color:colors.heading,
    fontFamily:fonts.text

  },
  username:{
    fontSize:32,
    fontFamily:fonts.heading,
    color:colors.heading,
    lineHeight:40,

  },
  
  



})