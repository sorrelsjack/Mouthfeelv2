import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Provider } from 'react-redux';
import { Colors, Routes } from './Common';
import { GlobalFontName } from './Components/CustomText/CustomText';
import { navigationRef, Startup } from './Config';
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

const forFade = ({ current }: StackCardInterpolationProps) => ({
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
            initialRouteName={"Login"}>
            <Stack.Screen name={"AppIntro"} component={AppIntroScreen} options={{ headerShown: false }} />
            <Stack.Screen name={"Login"} component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen
              name={"Home"}
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
            <Stack.Screen name={"FoodDetails"} component={FoodDetailsScreen} />
            <Stack.Screen name={"Liked"} component={LikedScreen} />
            <Stack.Screen name={"Disliked"} component={DislikedScreen} />
            <Stack.Screen name={"ToTry"} component={ToTryScreen} options={{ title: 'To Try' }} />
            <Stack.Screen name={"SubmitFood"} component={SubmitFoodScreen} options={{ title: 'Submit Food' }} />
            <Stack.Screen name={"Settings"} component={SettingsScreen} options={{ title: 'Settings' }} />
            <Stack.Screen name={"Tags"} component={TagsScreen} options={{ title: 'Tags' }} />
            <Stack.Screen name={"ContactUs"} component={ContactUsScreen} options={{ title: 'Contact Us' }} />
            <Stack.Screen name={"Help"} component={HelpScreen} options={{ title: 'Help' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ThemeProvider>
  );
};

Startup();
