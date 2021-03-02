import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/ConfigureStore';
import {
  LoginScreen,
  HomeScreen,
  FoodDetailsScreen,
  SubmitFoodScreen,
  SettingsScreen,
  TagsScreen
} from './Screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { Routes, Urls, Colors } from './Common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity, View } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';
import { GlobalFontName } from './Config/SetTypography';
import axios from 'axios';

console.disableYellowBox = true;

const Stack = createStackNavigator();

// TODO: Need screens for Liked, Disliked, Recommended, To Try
// TODO: From list on Liked, etc. screens, go to Details screen

const App = () => {
  return (
    <ThemeProvider theme={Colors}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator 
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: GlobalFontName
            }
          }} 
          initialRouteName={Routes.Login}>
            <Stack.Screen name={Routes.Login} component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name={Routes.Home}
              component={HomeScreen}
              options={({ navigation }) =>
              ({
                headerRight: () => (
                  <View style={{ padding: 15 }}>
                    <TouchableOpacity onPress={() => navigation.navigate(Routes.Settings)}>
                      <Icon name={'cog'} size={20} />
                    </TouchableOpacity>
                  </View>
                )
              })}
            />
            <Stack.Screen name={Routes.FoodDetails} component={FoodDetailsScreen} />
            <Stack.Screen name={Routes.SubmitFood} component={SubmitFoodScreen} options={{ title: 'Submit Food' }} />
            <Stack.Screen name={Routes.Settings} component={SettingsScreen} options={{ title: 'Settings' }} />
            <Stack.Screen name={Routes.Tags} component={TagsScreen} options={{ title: 'Tags' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
