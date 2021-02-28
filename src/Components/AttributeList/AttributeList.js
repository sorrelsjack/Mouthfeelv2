import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native';
import { Tag } from '..';
import { AttributeListAddButton } from '..';

const AttributeList = (props) => {
    const { 
        title, 
        includeAddButton = true, 
        horizontal = true, 
        contentContainerStyle = {}, 
        tagStyle = {}, 
        items 
    } = props;

    sortItems = (items) => items.sort((a, b) => (a.votes < b.votes) ? 1 : -1);

    // TODO: Is the add button here supposed to bring up TagsScreen?

    return (
        <View style={styles.wrapper}>
            {title && <Text style={styles.text}>{title}</Text>}
            <View style={{ flexDirection: 'row' }}>
                {includeAddButton && <AttributeListAddButton />}
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={contentContainerStyle}
                    style={styles.list}
                    horizontal={horizontal}
                    data={sortItems(items)}
                    renderItem={({ item }) => <Tag style={tagStyle} item={item} />}
                    keyExtractor={item => item} />
            </View>
        </View>
    )
}

export default AttributeList;

const styles = StyleSheet.create({
    wrapper: {
        paddingBottom: 15
    },
    text: {
        paddingBottom: 15,
        paddingHorizontal: 20,
        fontSize: 16
    },
    list: {
        marginRight: -20,
    }
})

