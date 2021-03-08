import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux/ConfigureStore';
import {
  LoginScreen,
  HomeScreen,
  FoodDetailsScreen,
  SubmitFoodScreen,
  SettingsScreen,
  TagsScreen,
  ContactUsScreen,
  LikedScreen,
  DislikedScreen,
  RecommendedScreen,
  ToTryScreen
} from './Screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { Routes, Urls, Colors } from './Common';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity, View } from 'react-native';
import { ThemeProvider, Button } from 'react-native-elements';
import { Startup, GlobalFontName } from './Config'

console.disableYellowBox = true;

const Stack = createStackNavigator();

// TODO: Need screens for Liked, Disliked, Recommended, To Try
// TODO: From list on Liked, etc. screens, go to Details screen
// TODO: Change font

export const App = () => {
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
            <Stack.Screen name={Routes.Liked} component={LikedScreen} />
            <Stack.Screen name={Routes.Disliked} component={DislikedScreen} />
            <Stack.Screen name={Routes.Recommended} component={RecommendedScreen} />
            <Stack.Screen name={Routes.ToTry} component={ToTryScreen} options={{ title: 'To Try' }} />
            <Stack.Screen name={Routes.SubmitFood} component={SubmitFoodScreen} options={{ title: 'Submit Food' }} />
            <Stack.Screen name={Routes.Settings} component={SettingsScreen} options={{ title: 'Settings' }} />
            <Stack.Screen name={Routes.Tags} component={TagsScreen} options={{ title: 'Tags' }} />
            <Stack.Screen name={Routes.ContactUs} component={ContactUsScreen} options={{ title: 'Contact Us' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

Startup();
