import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
  } from 'react-native';

class IngredientsList extends Component {
    handlePress = () => {
        console.warn('Read more pressed');
    }

    render() {
        return(
            <View>
                <Text style={styles.title}>Ingredients</Text>
                <View>
                    <TouchableOpacity onPress={this.handlePress}>
                      <Text>READ MORE...</Text>
                    </TouchableOpacity>
                    <View>

                    </View>
                  </View>
            </View>
        )
    }
}

export default IngredientsList;

const styles = StyleSheet.create({
    title: {
        fontSize: 24
    }
})