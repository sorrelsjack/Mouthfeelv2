import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList
  } from 'react-native';

import { Colors } from './../../../../Common';

class IngredientsList extends Component {
    state = {
        expanded: false
    }

    render() {
        return(
            <View style={styles.wrapper}>
                <Text style={styles.title}>Ingredients</Text>
                <TouchableOpacity onPress={() => this.setState({ expanded: !this.state.expanded })}>
                    <Text style={styles.readMoreText}>{this.state.expanded ? `` : `READ MORE...`}</Text>
                </TouchableOpacity>
                { this.state.expanded && <FlatList
                    style={styles.listContainer}
                    showsHorizontalScrollIndicator={false}
                    data={this.props.items}
                    renderItem={({ item }) => <Text style={styles.ingredientText}>{`• ${item}`}</Text>}
                    keyExtractor={item => item} /> }
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
    },
    listContainer: {
        marginTop: -10
    },
    ingredientText: {
        fontSize: 16
    }
})