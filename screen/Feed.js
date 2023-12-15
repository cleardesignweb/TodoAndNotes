import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './HomeScreen';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import AddTask from './AddTask';
import Profile from './Profile';
import Note from './Note';
const Tab = createMaterialBottomTabNavigator();

const Feed = () => {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} 
    options={{
      tabBarLabel: 'Home',
      tabBarIcon: ({ color }) => (
        <Ionicons name="home" color={color} size={24} />
      ),
    }}
     />
     <Tab.Screen name="Tasks" component={AddTask} 
    options={{
      tabBarLabel: 'Tasks',
      tabBarIcon: ({ color }) => (
        <FontAwesome5 name="tasks" color={color} size={24} />
      ),
    }}
     />

  <Tab.Screen name="Notes" component={Note} 
    options={{
      tabBarLabel: 'Notes',
      tabBarIcon: ({ color }) => (
        <Ionicons name="book" color={color} size={24} />
      ),
    }}
     />

  <Tab.Screen name="Profile" component={Profile} 
    options={{
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color }) => (
        <Ionicons name="person" color={color} size={24} />
      ),
    }}
     />
   </Tab.Navigator>
  )
}

export default Feed

const styles = StyleSheet.create({})