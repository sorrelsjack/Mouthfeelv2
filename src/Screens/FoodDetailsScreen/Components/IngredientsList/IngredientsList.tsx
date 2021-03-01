import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList
  } from 'react-native';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../../../Models';

interface IngredientsListProp {
    theme: ThemeProp,
    items: string[]
}

const IngredientsList = (props: IngredientsListProp) => {
    const { theme, items } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const styles = createStyles(theme);

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

export default withTheme(IngredientsList);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        width: '100%',
        padding: 20,
        backgroundColor: theme.section.backgroundColor
    },
    title: {
        paddingVertical: 10,
        fontSize: 24
    },
    readMoreText: {
        color: theme.primaryThemeColor
    },
    listContainer: {
        marginTop: -10
    },
    ingredientText: {
        fontSize: 16
    }
})