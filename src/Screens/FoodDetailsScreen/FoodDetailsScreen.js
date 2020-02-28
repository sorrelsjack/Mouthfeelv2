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

class FoodDetailsScreen extends Component {
  render() {
    const test = ['hello', 'this', 'is', 'a', 'test', 'will', 'having', 'this', 'many', 'break?'];
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView style={styles.wrapper} contentInsetAdjustmentBehavior="automatic">
            <TouchableOpacity style={styles.heartContainer}>
              <Icon name={'heart'} size={20} />
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
    height: 150,
    width: 150
  },
  heartContainer: {
    borderRadius: 50,
    width: 40,
    height: 40,
    backgroundColor: 'red'
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