import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen, HomeScreen, FoodDetailsScreen } from './src/Screens';

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: false
    }
  }
});

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: false
    }
  }
});

const FoodDetailsStack = createStackNavigator({
  FoodDetails: {
    screen: FoodDetailsScreen,
    navigationOptions: {
      header: false
    }
  }
})

const Navigator = createStackNavigator({
  Login: LoginStack,
  Home: HomeStack,
  FoodDetails: FoodDetailsStack
}, { headerMode: 'none' });

const AppContainer = createAppContainer(Navigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />        
    );
  }
};
