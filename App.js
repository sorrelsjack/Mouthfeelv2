import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen, HomeScreen, FoodDetailsScreen } from './src/Screens';

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  }
});

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  }
});

const FoodDetailsStack = createStackNavigator({
  FoodDetails: {
    screen: FoodDetailsScreen,
    navigationOptions: {
      header: null
    }
  }
})

const Navigator = createStackNavigator({
  Login: LoginStack,
  Home: HomeStack,
  FoodDetails: FoodDetailsScreen
}, { headerMode: 'none' });

const AppContainer = createAppContainer(Navigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />        
    );
  }
};
