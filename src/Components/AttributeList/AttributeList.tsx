import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
} from 'react-native';
import { Tag } from '..';
import { AttributeListAddButton } from '..';
import { Routes } from '../../Common';
import { useNavigation } from '@react-navigation/native';

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
    tagSize?: 'small' | 'regular',
    tagStyle?: object,
    items: Item[],
}

const AttributeList = (props: AttributeListProps) => {
    const { 
        title, 
        includeAddButton = true, 
        horizontal = true, 
        contentContainerStyle = {},
        tagSize = 'regular',
        tagStyle = {}, 
        items,
    } = props;

    const navigation = useNavigation();

    const sortItems = (items: Item[]) => 
        items.sort((a, b) => ((a.votes ?? 0) < (b.votes ?? 0)) ? 1 : -1);

    // TODO: Is the add button here supposed to bring up TagsScreen?

    return (
        <View style={styles.wrapper}>
            {title && <Text style={styles.text}>{title}</Text>}
            <View style={{ flexDirection: 'row' }}>
                {includeAddButton && <AttributeListAddButton onPress={() => navigation.navigate(Routes.Tags)} />}
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={contentContainerStyle}
                    style={styles.list}
                    horizontal={horizontal}
                    data={sortItems(items)}
                    renderItem={({ item }) => <Tag style={tagStyle} size={tagSize} item={item} />}
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

