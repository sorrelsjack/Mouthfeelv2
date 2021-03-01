import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native';
import { Tag } from '..';
import { AttributeListAddButton } from '..';

interface Item {
    text: string,
    votes?: number,
    tooltipText: string
}

interface AttributeListProps {
    title?: string,
    includeAddButton?: boolean,
    horizontal?: boolean,
    contentContainerStyle?: object,
    tagStyle?: object,
    items: Item[]
}

const AttributeList = (props: AttributeListProps) => {
    const { 
        title, 
        includeAddButton = true, 
        horizontal = true, 
        contentContainerStyle = {}, 
        tagStyle = {}, 
        items 
    } = props;

    const sortItems = (items: Item[]) => items.sort((a, b) => ((a.votes ?? 0) < (b.votes ?? 0)) ? 1 : -1);

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
                    keyExtractor={item => item.text} />
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

