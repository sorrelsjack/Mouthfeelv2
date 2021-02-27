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
  AttributeList,
} from './Components';
import { SetPrimaryThemeColor, GetColor, FormatAsTitleCase } from './../../Common';
import { CircleButton } from '../../Components';
import { getColorFromURL } from 'rn-dominant-color';
import LottieView from 'lottie-react-native';

const FoodDetailsScreen = (props) => {
  const { loading } = props.selected;
  const { id, name, imageUrl, textures, flavors, miscellaneous } = props.selected.data;

  const [themeColor, setThemeColor] = useState('white');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetFoodDetailsAction(1));
  }, [])

  useEffect(() => {
    if (!imageUrl) return;

    // TODO: Propogate theme color to the state
    const GetThemeColor = async () => {
      res = await getColorFromURL(imageUrl);
      console.log(res)
      SetPrimaryThemeColor(res.primary);
      console.log(GetColor())
      //setThemeColor(res.primary);
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
            <CircleButton icon='heart' iconSelectedColor={GetColor().circleButton.icon.selected.heart.color} />
            <CircleButton icon='heart-broken' iconSelectedColor={GetColor().circleButton.icon.selected.heartBroken.color} />
          </View>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {loading && <LottieView source={require('../../Assets/loading_pizza.json')} autoPlay />}
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

export default connect(state => {
  return {
    selected: state.foods.selected
  }

})(FoodDetailsScreen);

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: GetColor().page.backgroundColor
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
    backgroundColor: GetColor().section.backgroundColor,
    marginVertical: 30
  },
  titleText: {
    fontSize: 28
  }
});