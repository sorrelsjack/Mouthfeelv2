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
            <View style={styles.wrapper}>
                <Text style={styles.title}>Ingredients</Text>
                <View>
                    <TouchableOpacity onPress={this.handlePress}>
                      <Text>READ MORE...</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default IngredientsList;

const styles = StyleSheet.create({
    wrapper: {
        padding: 20
    },
    title: {
        fontSize: 24
    }
})