import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
  } from 'react-native';

import { Colors } from './../../../../Common';

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
                      <Text style={styles.readMoreText}>READ MORE...</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default IngredientsList;

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        padding: 20,
        backgroundColor: Colors.section.backgroundColor
    },
    title: {
        paddingVertical: 10,
        fontSize: 24
    },
    readMoreText: {
        color: Colors.section.clickableText.textColor
    }
})