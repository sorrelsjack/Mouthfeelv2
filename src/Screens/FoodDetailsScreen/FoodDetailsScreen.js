import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';
import { Tag } from './../../Components';
import { IngredientsList, CommentsSection } from './Components';

class FoodDetailsScreen extends Component {
    render() {
        const test = ['hello', 'this', 'is', 'a', 'test'];
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
              <View>
                <Text>{`What is eating ${this.props.food} like?`}</Text>
                <FlatList
                  horizontal={true}
                  data={test}
                  renderItem={({ item }) => <Tag text={item}/>}
                  keyExtractor={item => item}/>
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
      paddingHorizontal: 20
    }
  });