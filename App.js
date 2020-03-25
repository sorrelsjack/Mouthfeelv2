import React, { Component } from 'react';
import { LoginScreen, HomeScreen, FoodDetailsScreen } from './src/Screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { Routes } from './src/Common';

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.Login}>
          <Stack.Screen name={Routes.Login} component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name={Routes.Home} component={HomeScreen} options={{ headerTitleAlign: 'center' }} />
          <Stack.Screen name={Routes.FoodDetails} component={FoodDetailsScreen} options={{ headerTitleAlign: 'center' }} />
        </Stack.Navigator>
      </NavigationContainer>     
    );
  }
};
