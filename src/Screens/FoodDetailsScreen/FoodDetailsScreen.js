import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';
import { IngredientsList, CommentsSection, AttributeList } from './Components';
import { Colors } from './../../Common';
import Icon from 'react-native-vector-icons/FontAwesome5';

// TODO: Make the heart not solid when it's unselected
class FoodDetailsScreen extends Component {
  render() {
    const test = ['hello', 'this', 'is', 'a', 'test', 'will', 'having', 'this', 'many', 'break?'];
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView style={styles.wrapper} contentInsetAdjustmentBehavior="automatic">
            <TouchableOpacity style={styles.heartContainer}>
              <Icon name={'heart'} solid size={20} color={Colors.heartIcon.heart.color} />
            </TouchableOpacity>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: 'https://publicdomainvectors.org/photos/1514958680.png' }} style={styles.image} />
              </View>
              <View style={styles.titleSection}>
                <Text style={styles.titleText}>{'Pizza'}</Text>
              </View>
              <IngredientsList />
              <AttributeList food={`pizza`} test={test} />
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'contain',
    height: 175,
    width: 175
  },
  heartContainer: {
    borderRadius: 50,
    margin: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: Colors.heartIcon.circleBackground.backgroundColor
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