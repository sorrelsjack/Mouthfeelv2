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
import { IngredientsList, CommentsSection, AttributeList } from './Components';
import { Colors } from './../../Common';

class FoodDetailsScreen extends Component {
    render() {
        const test = ['hello', 'this', 'is', 'a', 'test', 'will', 'having', 'this', 'many','break?'];
        return (
            <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView style={styles.wrapper} contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
              <View style={styles.titleSection}>
                <Text>{this.props.food}</Text>
              </View>
              <IngredientsList />
              <AttributeList food={`Pizza`} test={test} />
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
    },
    titleSection: {
      backgroundColor: Colors.section.backgroundColor,
      marginVertical: 30
    }
  });