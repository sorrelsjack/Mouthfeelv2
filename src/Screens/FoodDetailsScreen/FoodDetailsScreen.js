import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { IngredientsList, CommentsSection, AttributeList } from './Components';

class FoodDetailsScreen extends Component {
    render() {
        const test = ['hello', 'this', 'is', 'a', 'test', 'will', 'having', 'this', 'many','break?'];
        return (
            <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.wrapper}>
              <View>
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
      paddingHorizontal: 20
    }
  });