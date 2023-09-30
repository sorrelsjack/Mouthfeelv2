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
import { CustomText } from '../../../../Components';

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
                <CustomText style={styles.title}>Ingredients</CustomText>
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                    <CustomText style={styles.readMoreText}>{isExpanded ? null : `READ MORE...`}</CustomText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                { isExpanded && <FlatList
                    style={styles.listContainer}
                    showsHorizontalScrollIndicator={false}
                    data={items}
                    renderItem={({ item }) => <CustomText style={styles.ingredientText}>{`• ${item}`}</CustomText>}
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
        color: theme.clickableTextColor
    },
    listContainer: {
        marginTop: -10
    },
    ingredientText: {
        fontSize: 16
    }
})