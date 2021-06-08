import  React, {useState} from 'react';
import {
  SafeAreaView,
  View, 
  Text,  
  StyleSheet,
  Alert,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {Button} from '../components/Button';

import DateTimePicker, {Event} from '@react-native-community/datetimepicker'
import {SvgFromUri} from 'react-native-svg';
import {getBottomSpace} from 'react-native-iphone-x-helper'
import {useRoute, useNavigation} from '@react-navigation/core';
import {isBefore, format} from 'date-fns';
import {PlantProps, savePlant,loadPlant} from '../Libs/storage'

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import waterdrop from '../assets/waterdrop.png'

interface Params{
      plant: PlantProps
}

export function PlantSave(){
  const [selectedDataTime, setSelectedDataTime ]= useState(new Date());
  const [showDatePicker, setShowDatePicker] =  useState(Platform.OS == 'ios');

  const route = useRoute();
  const {plant} = route.params as Params;

  const navigation = useNavigation();

  function handleChangeTime(event : Event, dateTime: Date | undefined){
    if(Platform.OS == 'android'){
      setShowDatePicker(oldState => !oldState);

    }
    if(dateTime && isBefore(dateTime, new Date())){
      setSelectedDataTime(new Date());
      return Alert.alert('Escolha uma hora no futuro! ⏰ ')
    }

    if(dateTime)
    setSelectedDataTime(dateTime);

  }
  function handleOpenDateTimePickerAndroid(){
    setShowDatePicker(oldState => !oldState);
    
  }



  async function handleSave(){
  
      try{
      await savePlant({
        ...plant,
        dateTimeNotification:selectedDataTime

      });

      navigation.navigate('Confirmation',{
        title:'Tudo certo',
        subtitle:'fique tranquilo que sempre iremos lembrar voce de cuidar da dua plantinha com muito cuidado  ',
        buttonTittle:'Muito Obrigado :D',
        icon:'hug',
        nextScreen:'MyPlants'
  
      });

    } catch{
        Alert.alert('Nao foi possivel salver 😥')
    }
  }

  return(
    <>
      <View style={styles.container}>
        <ScrollView>
            <View style={styles.plantaInfo}>
            <SvgFromUri
            uri={plant.photo}
            height={150}
            width={150}
            />

            <Text style={styles.plantName}>
              {plant.name}
            </Text>

            <Text style={styles.plantAbout}>
            {plant.about} 
            </Text>

          </View>
          <View style={styles.controllers}>
            <View style={styles.tipContainer}>
              <Image
              source={waterdrop}
              style={styles.tipImage}
              />

              <Text style={styles.tipText}>
              {plant.water_tips} 
                </Text>

            </View>
            <Text style={styles.alertLabel}>
              Escolha o melhor horario para ser Lembrado :

            </Text>

          
            { showDatePicker && (
              < DateTimePicker
              value={selectedDataTime}
              mode='time'
              display='spinner'
              onChange={handleChangeTime}
              />
            )}

            {
              Platform.OS == 'android' && (
                <TouchableOpacity  style={styles.dateTimePickerButton}
                onPress={handleOpenDateTimePickerAndroid}>
                  <Text style={styles.dateTimePickerText}>
                     {`Mudar ${format(selectedDataTime, 'HH:mm' )}`} 
                  </Text>
                </TouchableOpacity>
              )
            }

            <Button 
              title={"Cadastrar Planta"}
              onPress={handleSave}
            />
        </View>
       </ScrollView>
      </View>


    </>
  )

}

const styles = StyleSheet.create({ 
  container:{
    flex:1,
    justifyContent:'space-between',
    backgroundColor:colors.shape,

  },
  plantaInfo:{
    flex:1,
    paddingHorizontal:20,
    paddingVertical:40,
    alignItems:'center',
    backgroundColor:colors.shape,

  },
  plantName:{
    fontFamily:fonts.heading,
    fontSize:24,
    color:colors.heading,
    marginTop:15,

  },
  plantAbout:{
    textAlign:'center',
    fontFamily:fonts.text,
    color:colors.heading,
    fontSize:17,
    marginTop:10,

    

  },
  controllers:{
    
    backgroundColor:colors.white,
    paddingHorizontal:20,
    padding:20,
    paddingBottom: getBottomSpace() || 20


  },
  tipContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:colors.blue_light,
    padding:10,
    borderRadius:20,
    position:'relative',
    bottom:10,


  },
  tipImage:{

    width:56,
    height:56,
  },
  tipText:{
    flex:1,
    marginLeft:20,
    fontFamily:fonts.text,
    color:colors.blue,
    fontSize:15,
    textAlign:'justify',

  },
  alertLabel:{
    textAlign:'center',
    fontFamily:fonts.complement,
    color:colors.heading,
    fontSize:12,
    marginBottom:5,

  },
  dateTimePickerText:{
    color:colors.heading,
   fontSize:24,
   fontFamily:fonts.text,


  },
  dateTimePickerButton:{
    width:'100%',
    alignItems:'center',
    paddingVertical:40
,
  }







})