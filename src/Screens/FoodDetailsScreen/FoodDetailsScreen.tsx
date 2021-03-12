import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { GetFoodDetailsAction, AddOrRemoveFoodToTryAction } from '../../Redux/Actions';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import {
  IngredientsList,
  CommentsSection,
} from './Components';
import { FormatAsTitleCase, DetermineColorBrightness, GetTextColorBasedOnBrightness, InvertColor } from '../../Common';
import { AttributeList, CircleButton, LoadingSpinner } from '../../Components';
import { getColorFromURL } from 'rn-dominant-color';
import { withTheme, UpdateTheme } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { ThemeProp } from '../../Models';
import { FoodDetails, VotableAttribute, MouthfeelState } from '../../Redux/Models';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';

interface FoodDetailsScreenProps {
  theme: ThemeProp,
  updateTheme: UpdateTheme,
  navigation: any, // TODO, fix
  selected: {
    loading: boolean,
    data: FoodDetails
  }
}

const FoodDetailsScreen = (props: FoodDetailsScreenProps) => {
  const { theme, updateTheme, navigation } = props;
  const { loading } = props.selected || {};
  const { id, name, toTry, textures, flavors, miscellaneous } = props.selected?.data ?? {}; // imageUrl
  const imageUrl = 'https://st.depositphotos.com/1003814/5052/i/450/depositphotos_50523105-stock-photo-pizza-with-tomatoes.jpg'; // TODO: Remove this

  const [markedToTry, setMarkedToTry] = useState(toTry);

  const dispatch = useDispatch();
  const styles = createStyles(theme);

  const handleToTryButtonPressed = () => {
    const initialMarkedToTry = markedToTry;
    setMarkedToTry(!markedToTry);
    Toast.show(`'${FormatAsTitleCase(name)}' ${!initialMarkedToTry ? 'added to' : 'removed from'} list of foods to try!`);
    dispatch(AddOrRemoveFoodToTryAction());
  }

  // TODO: On back clicked, revert the primary colors to the default
  // TODO: For the hearts, determine how close the theme color is to the default color. if its close, then change the heart color
  // Do the same for the arrows

  useLayoutEffect(() => {
    navigation.setOptions({ 
      title: FormatAsTitleCase(name), 
      headerTintColor: theme.primaryThemeTextColor,
      headerRight: () => (
        <TouchableOpacity onPress={handleToTryButtonPressed}>
          <Icon
            style={{ padding: 15}}
            solid={markedToTry}
            size={20}
            name='bookmark' 
            color={theme.primaryThemeTextColor} />
        </TouchableOpacity>
      )
    });
  }, [navigation, theme, markedToTry])

  useEffect(() => {
    dispatch(GetFoodDetailsAction(id));
  }, [props.selected.data.id])

  useEffect(() => {
    if (!imageUrl) return;

    const GetThemeColor = async () => {
      const res = await getColorFromURL(imageUrl);
      updateTheme({ 
        ...theme, 
        primaryThemeColor: res.primary, 
        primaryThemeTextColor: GetTextColorBasedOnBrightness(res.primary),
        clickableTextColor: DetermineColorBrightness(res.primary) === 'light' ? InvertColor(res.primary) : res.primary
      })
      navigation.setOptions({ headerStyle: { backgroundColor: res.primary } })
    }
    GetThemeColor();

  }, [imageUrl])

  // TODO: Show pizza loader instead of entire screen
  const ingredients = ['yeast', 'water', 'flour', 'oil', 'salt', 'sugar'];
  const experience = ['cheesy', 'salty', 'firm', 'layered', 'crispy', 'chewy', 'savory'].map(i => ({ text: i, votes: Math.floor(Math.random() * 101) }));;
  const misc = ['vegetarian', 'boneless', 'toppings common'].map(i => ({ text: i, votes: Math.floor(Math.random() * 101) }));;

  return (
    <SafeAreaView>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        {loading ? <LoadingSpinner fullScreen /> :
          <>
            <View style={styles.heartsContainer}>
              <CircleButton icon='heart' iconSelectedColor={theme.heartSelectedColor} />
              <CircleButton icon='heart-broken' iconSelectedColor={theme.heartBrokenSelectedColor} />
            </View>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
              </View>
              <View style={styles.titleSection}>
                <Text style={styles.titleText}>{FormatAsTitleCase(name)}</Text>
              </View>
              <IngredientsList items={ingredients} />
              <View style={styles.attributeListsContainer}>
                <AttributeList title={`What textures does ${name} have?`} items={textures ? textures.map(i => ({ text: i.name, votes: i.votes, tooltipText: i.description })) : []} />
                <AttributeList title={`What flavors does ${name} have?`} items={flavors ? flavors.map(i => ({ text: i.name, votes: i.votes, tooltipText: i.description })) : []} />
                <AttributeList title={`What makes ${name} unique?`} items={miscellaneous ? miscellaneous.map(i => ({ text: i.name, votes: i.votes, tooltipText: i.description })) : []} />
              </View>
              <CommentsSection />
            </View>
          </>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default withNavigation(withTheme(connect((state: MouthfeelState) => {

  return {
    selected: state.foods.selected
  }

})(FoodDetailsScreen)));

const createStyles = (theme: ThemeProp) => StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: theme.page.backgroundColor
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  heartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  attributeListsContainer: {
    paddingTop: 15,
    paddingBottom: 5
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'contain',
    height: 175,
    width: '80%'
  },
  titleSection: {
    padding: 20,
    backgroundColor: theme.section.backgroundColor,
    marginVertical: 30
  },
  titleText: {
    fontSize: 28
  }
});