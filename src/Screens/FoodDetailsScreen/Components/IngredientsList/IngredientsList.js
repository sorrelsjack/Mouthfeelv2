import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList
  } from 'react-native';

import { GetColor } from './../../../../Common';

const IngredientsList = (props) => {
    const { items } = props;
    const [isExpanded, setIsExpanded] = useState(false);

        return(
            <View style={styles.wrapper}>
                <Text style={styles.title}>Ingredients</Text>
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                    <Text style={styles.readMoreText}>{isExpanded ? null : `READ MORE...`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                { isExpanded && <FlatList
                    style={styles.listContainer}
                    showsHorizontalScrollIndicator={false}
                    data={items}
                    renderItem={({ item }) => <Text style={styles.ingredientText}>{`• ${item}`}</Text>}
                    keyExtractor={item => item} /> }
                </TouchableOpacity>
            </View>
        )
}

export default IngredientsList;

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        padding: 20,
        backgroundColor: GetColor().section.backgroundColor
    },
    title: {
        paddingVertical: 10,
        fontSize: 24
    },
    readMoreText: {
        color: GetColor().section.clickableText.textColor
    },
    listContainer: {
        marginTop: -10
    },
    ingredientText: {
        fontSize: 16
    }
})