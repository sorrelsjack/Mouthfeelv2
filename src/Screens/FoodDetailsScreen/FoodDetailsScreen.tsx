import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { GetFoodDetailsAction } from '../../Redux/Actions';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image
} from 'react-native';
import {
  IngredientsList,
  CommentsSection,
} from './Components';
import { FormatAsTitleCase } from '../../Common';
import { AttributeList, CircleButton, LoadingSpinner } from '../../Components';
import { getColorFromURL } from 'rn-dominant-color';
import LottieView from 'lottie-react-native';
import { withTheme, UpdateTheme } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { ThemeProp } from '../../Models';
import { VotableAttribute, MouthfeelState } from '../../Redux/Models';

interface FoodDetailsScreenProps {
    theme: ThemeProp,
    updateTheme: UpdateTheme,
    navigation: any, // TODO, fix
    selected: {
      loading: boolean,
      data: {
          id: number,
          name: string,
          textures: VotableAttribute[],
          flavors: VotableAttribute[],
          miscellaneous: VotableAttribute[]
      }
    }
}

const FoodDetailsScreen = (props: FoodDetailsScreenProps) => {
  const { theme, updateTheme, navigation } = props;
  const { loading } = props.selected;
  const { id, name, textures, flavors, miscellaneous } = props.selected.data ?? {}; // imageUrl
  const imageUrl = 'https://st.depositphotos.com/1003814/5052/i/450/depositphotos_50523105-stock-photo-pizza-with-tomatoes.jpg';

  const dispatch = useDispatch();
  const styles = createStyles(theme);

  navigation.setOptions({ title: FormatAsTitleCase(name), headerTintColor: theme.primaryThemeTextColor })

  // TODO: determine when text should be white and when it should be black
  // TODO: Change title to name of food, change color of header to primary color
  // TODO: On back clicked, revert the primary colors to the default
  useEffect(() => {
    //dispatch(GetFoodDetailsAction(1));
  }, [])

  useEffect(() => {
    if (!imageUrl) return;

    const GetThemeColor = async () => {
      const res = await getColorFromURL(imageUrl);
      updateTheme({ ...theme, primaryThemeColor: res.primary })
      navigation.setOptions({ headerStyle: { backgroundColor: res.primary } })
    }
    GetThemeColor();

  }, [imageUrl])

  // TODO: What if flavor and texture have the same values?
  // TODO: Show pizza loader instead of entire screen
  const ingredients = ['yeast', 'water', 'flour', 'oil', 'salt', 'sugar'];
  const experience = ['cheesy', 'salty', 'firm', 'layered', 'crispy', 'chewy', 'savory'].map(i => ({ text: i, votes: Math.floor(Math.random() * 101) }));;
  const misc = ['vegetarian', 'boneless', 'toppings common'].map(i => ({ text: i, votes: Math.floor(Math.random() * 101) }));;

  return (
    <>
      <SafeAreaView>
        <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
          <View style={styles.heartsContainer}>
            <CircleButton icon='heart' iconSelectedColor={theme.circleButton.icon.selected.heart.color} />
            <CircleButton icon='heart-broken' iconSelectedColor={theme.circleButton.icon.selected.heartBroken.color} />
          </View>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {loading && <LoadingSpinner />}
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
        </ScrollView>
      </SafeAreaView>
    </>
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