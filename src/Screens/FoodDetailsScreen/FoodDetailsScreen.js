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
import { Colors } from './../../Common';
import { CircleButton } from '../../Components';
import { getColorFromURL } from 'rn-dominant-color';

const FoodDetailsScreen = (props) => {
  const { food, textures, flavors } = props;
  const [themeColor, setThemeColor] = useState('white');
  const dispatch = useDispatch();

  useEffect(() => {
    const GetThemeColor = async () => {
      res = await getColorFromURL('https://publicdomainvectors.org/photos/1514958680.png');
      setThemeColor(res.primary);
    }
    GetThemeColor();
    dispatch(GetFoodDetailsAction(1));
  })

  //const food = 'pizza';
  const ingredients = ['yeast', 'water', 'flour', 'oil', 'salt', 'sugar'];
  const experience = ['cheesy', 'salty', 'firm', 'layered', 'crispy', 'chewy', 'savory'].map(i => ({ text: i, votes: Math.floor(Math.random() * 101) }));;
  const misc = ['vegetarian', 'boneless', 'toppings common'].map(i => ({ text: i, votes: Math.floor(Math.random() * 101) }));;

  return (
    <>
      <SafeAreaView>
        <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
          <View style={styles.heartsContainer}>
            <CircleButton icon='heart' iconSelectedColor={Colors.circleButton.icon.selected.heart.color} />
            <CircleButton icon='heart-broken' iconSelectedColor={Colors.circleButton.icon.selected.heartBroken.color} />
          </View>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: 'https://publicdomainvectors.org/photos/1514958680.png' }} style={styles.image} />
            </View>
            <View style={styles.titleSection}>
              <Text style={styles.titleText}>{food?.name}</Text>
            </View>
            <IngredientsList items={ingredients} />
            <View style={styles.attributeListsContainer}>
              <AttributeList title={`What is eating ${food?.name} like?`} items={experience} />
              <AttributeList title={`What makes ${food?.name} unique?`} items={misc} />
            </View>
            <CommentsSection />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default connect(state => {
  const { food, flavors, textures, misc } = state.foods.selected;

  return {
    food,
    flavors,
    textures,
    misc
  }

})(FoodDetailsScreen);

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: Colors.page.backgroundColor
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
    width: 175
  },
  titleSection: {
    padding: 20,
    backgroundColor: Colors.section.backgroundColor,
    marginVertical: 30
  },
  titleText: {
    fontSize: 28
  }
});