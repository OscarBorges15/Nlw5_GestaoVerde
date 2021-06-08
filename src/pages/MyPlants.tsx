import React, {useState, useEffect} from 'react';
import {
  View, 
  Text,  
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native';

import {Header} from '../components/Header';
import {PlantProps, loadPlant, RemovePlant} from '../Libs/storage';
import {formatDistance} from 'date-fns';
import {pt} from 'date-fns/locale';
import {PlantCardSecundary} from '../components/PlantCardSecundary';
import {Load} from '../components/Load';



import colors from '../styles/colors';
import fonts from '../styles/fonts';
import waterdrop from '../assets/waterdrop.png';

export function MyPlants(){

  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [Loading, setLoading] = useState(true);
  const [nextWaterd, setNextwatered] = useState<string>();

  function handleRemove (plant: PlantProps){
    Alert.alert('Remover',`Deseja remover a  ${plant.name}? `,[
      {
        text:'Nao 🙏',
        style: 'cancel'
      },
      {
        text:'Sim 😥',
        onPress: async() => {
          try{
              await RemovePlant(plant.id)
              setMyPlants((oldData) => ( 
                oldData.filter((item) => item.id != plant.id)
              ));


            } catch(error){
              Alert.alert('Nao foi possivel remover! 😥')
            }
          }
        }
       ])
}

  useEffect(() => {
    async function LoadStorageDate() {
      const plantsStoraged = await loadPlant();

      const nextTime =  formatDistance (
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale :pt }

      );
      setNextwatered(
        `Nao esqueca de regar a ${plantsStoraged[0].name} a ${nextTime} horas`
      )
      setMyPlants(plantsStoraged);
      setLoading(false);
    }

    LoadStorageDate();

  },[])


  if(Loading)
      return < Load />

  

  return(
    <View style={styles.container}>
        <Header/>
        <View style={styles.spotLight}> 
        <Image
        source={waterdrop}
        style={styles.spotLightImage}
        />

        <Text style={styles.spotLighText}>
          {nextWaterd}
        </Text>
        </View>

        <View style={styles.plants}>
          <Text style={styles.title}> 
            Proximas reagadas
          </Text>

            <ScrollView
              showsVerticalScrollIndicator={false}>
           
              <FlatList
                data={myPlants}
                keyExtractor={(item) => String(item.id)}
                renderItem={({item}) => (
                  <PlantCardSecundary 
                  data = {item}
                  handleRemove={()=>{handleRemove(item)}} 
                  />
    
                )}
                contentContainerStyle={{flex : 1}}
                showsVerticalScrollIndicator={false}
                
              />

          </ScrollView>
        </View>
      
    </View>
  )

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:30,
    paddingTop:10,
    backgroundColor:colors.background

  },
  spotLight:{
    backgroundColor:colors.blue_light,
    paddingHorizontal:20,
    borderRadius:20,
    height:110,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

  },
  spotLightImage:{
    width:60,
    height:60,

  },
  spotLighText:{
    flex:1,
    color:colors.blue,
    paddingHorizontal:20,


  },
  plants:{
    flex:1,
   width:'100%'
   
  },
  title:{
    fontSize:24,
    fontFamily:fonts.heading,
    color:colors.heading,
    marginVertical:20,

  },

})