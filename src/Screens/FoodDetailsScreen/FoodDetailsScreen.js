import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import { 
  IngredientsList, 
  CommentsSection, 
  AttributeList
} from './Components';
import { Colors } from './../../Common';
import { CircleButton } from './../../Components';

class FoodDetailsScreen extends Component {
  render() {
    const food = 'pizza';
    const ingredients = ['yeast', 'water', 'flour', 'oil', 'salt', 'sugar'];
    const experience = ['cheesy', 'salty', 'firm', 'layered', 'crispy', 'chewy', 'savory'];
    const misc = ['vegetarian', 'boneless', 'toppings common'];

    return (
      <>
        <SafeAreaView>
          <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior="automatic">
            <CircleButton icon={'heart'} iconSelectedColor={Colors.circleButton.icon.selected.heart.color} />
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: 'https://publicdomainvectors.org/photos/1514958680.png' }} style={styles.image} />
              </View>
              <View style={styles.titleSection}>
                <Text style={styles.titleText}>{'Pizza'}</Text>
              </View>
              <IngredientsList items={ingredients} />
              <View style={styles.attributeListsContainer}>
                <AttributeList title={`What is eating ${food} like?`} items={experience} />
                <AttributeList title={`What makes ${food} unique?`} items={misc} />
              </View>
              <CommentsSection />
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    )
  }
}

export default FoodDetailsScreen;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    backgroundColor: Colors.page.backgroundColor
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20
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