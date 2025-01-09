import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Provider } from 'react-redux';
import { Colors, Routes } from './Common';
import { GlobalFontName } from './Components/CustomText/CustomText';
import { Startup, navigationRef } from './Config';
import store from './Redux/ConfigureStore';
import {
  AppIntroScreen,
  ContactUsScreen,
  DislikedScreen,
  FoodDetailsScreen,
  HelpScreen,
  HomeScreen,
  LikedScreen,
  LoginScreen,
  SettingsScreen,
  SubmitFoodScreen,
  TagsScreen,
  ToTryScreen
} from './Screens';
import { NavigationParamList } from './Screens/NavigationParamList';

const Stack = createStackNavigator<NavigationParamList>();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const App = () => {

  return (
    <ThemeProvider theme={Colors}>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              cardStyleInterpolator: forFade,
              headerTintColor: Colors.primaryThemeTextColor,
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: Colors.primaryThemeColor },
              headerTitleStyle: {
                fontFamily: GlobalFontName
              }
            }}
            initialRouteName={Routes.Login}>
            <Stack.Screen name={Routes.AppIntro} component={AppIntroScreen} options={{ headerShown: false }} />
            <Stack.Screen name={Routes.Login} component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name={Routes.Home}
              component={HomeScreen}
              options={({ navigation }) =>
              ({
                headerLeft: () => (
                  <View style={{ padding: 10, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate(Routes.Settings)}>
                      <Icon name={'cog'} color={Colors.primaryThemeTextColor} size={20} />
                    </TouchableOpacity>
                  </View>
                ),
                headerRight: () => (
                  <View style={{ padding: 10, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate(Routes.Help)}>
                      <Icon name={'question'} color={Colors.primaryThemeTextColor} size={20} />
                    </TouchableOpacity>
                  </View>
                )
              })}
            />
            <Stack.Screen name={Routes.FoodDetails} component={FoodDetailsScreen} />
            <Stack.Screen name={Routes.Liked} component={LikedScreen} />
            <Stack.Screen name={Routes.Disliked} component={DislikedScreen} />
            <Stack.Screen name={Routes.ToTry} component={ToTryScreen} options={{ title: 'To Try' }} />
            <Stack.Screen name={Routes.SubmitFood} component={SubmitFoodScreen} options={{ title: 'Submit Food' }} />
            <Stack.Screen name={Routes.Settings} component={SettingsScreen} options={{ title: 'Settings' }} />
            <Stack.Screen name={Routes.Tags} component={TagsScreen} options={{ title: 'Tags' }} />
            <Stack.Screen name={Routes.ContactUs} component={ContactUsScreen} options={{ title: 'Contact Us' }} />
            <Stack.Screen name={Routes.Help} component={HelpScreen} options={{ title: 'Help' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

Startup();
