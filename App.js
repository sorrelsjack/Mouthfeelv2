import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FoodDetailsScreen } from './src/Screens';

const Navigator = createStackNavigator({
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
