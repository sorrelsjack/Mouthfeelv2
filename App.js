import React, { Component } from 'react';
import { 
  LoginScreen, 
  HomeScreen, 
  FoodDetailsScreen, 
  SubmitFoodScreen, 
  SettingsScreen, 
  TagsScreen 
} from './src/Screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { Routes } from './src/Common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity, View } from 'react-native';

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routes.Login}>
          <Stack.Screen name={Routes.Login} component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen
            name={Routes.Home}
            component={HomeScreen}
            options={({ navigation }) =>
              ({
                headerTitleAlign: 'center',
                headerRight: () => (
                  <View style={{ padding: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate(Routes.Settings)}>
                      <Icon name={'cog'} size={20} />
                    </TouchableOpacity>
                  </View>
                )
              })}
          />
          <Stack.Screen name={Routes.FoodDetails} component={FoodDetailsScreen} options={{ headerTitleAlign: 'center' }} />
          <Stack.Screen name={Routes.SubmitFood} component={SubmitFoodScreen} options={{ headerTitleAlign: 'center', title: 'Submit Food' }} />
          <Stack.Screen name={Routes.Settings} component={SettingsScreen} options={{ headerTitleAlign: 'center', title: 'Settings' }} />
          <Stack.Screen name={Routes.Tags} component={TagsScreen} options={{ headerTitleAlign: 'center', title: 'Tags' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};
