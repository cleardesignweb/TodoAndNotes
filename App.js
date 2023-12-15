import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Feed from './screen/Feed';
import Login from './auth/Login';
import Signup from './auth/Signup';
import TaskDetails from './screen/TaskDetails';
import { AuthContextProvider } from './auth/AuthContext';
import NoteDetails from './screen/NoteDetails';
const Stack = createStackNavigator();

const App = () => {
  return (
     <AuthContextProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName='login'>
        
       <Stack.Screen name="Login" component={Login} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Feed" component={Feed} options={{
        headerShown: false
      }} />
      <Stack.Screen name="signup" component={Signup} options={{
        headerShown: false
      }} />
      <Stack.Screen name="TaskDetails" component={TaskDetails} options={{
        headerShown: false
      }} />
      <Stack.Screen name="NoteDetails" component={NoteDetails} options={{
        headerShown: false
      }} />
       
      </Stack.Navigator>
     </NavigationContainer>
     </AuthContextProvider>
  )
}

export default App

const styles = StyleSheet.create({})