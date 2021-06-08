import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; 
import colors from '../styles/colors'

import {MaterialIcons} from '@expo/vector-icons'

import {PlantSelect} from '../pages/PlantSelect'
import {MyPlants} from '../pages/MyPlants'

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
    tabBarOptions={{
      activeTintColor:colors.green,
      inactiveTintColor:colors.heading,
      labelPosition:'beside-icon',
      style:{
        paddingVertical:10,
        height:60
      },
    }}>

      <AppTab.Screen
        name="Nova Planta"
        component={PlantSelect}
        options={{
          tabBarIcon: (({size, color }) => (
            <MaterialIcons
            name="add-circle-outline"
            size={size}
            color={color}
            />
          ))
        }}
      />

<AppTab.Screen
        name="Minha Plantas"
        component={MyPlants}
        options={{
          tabBarIcon: (({size, color }) => (
            <MaterialIcons
            name="format-list-bulleted"
            size={size}
            color={color}
            />
          ))
        }}
      />

      </AppTab.Navigator>

  )
}

export default AuthRoutes;