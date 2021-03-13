import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ScrollView
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
    numColumns?: number;
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
        numColumns,
        horizontal = true,
        contentContainerStyle = {},
        tagSize = 'regular',
        tagStyle = {},
        items,
    } = props;

    const navigation = useNavigation();

    const sortItems = (items: Item[]) =>
        items.sort((a, b) => ((a.votes ?? 0) < (b.votes ?? 0)) ? 1 : -1);

    return (
        <View style={styles.wrapper}>
            {title && <Text style={styles.text}>{title}</Text>}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.list}>
                {includeAddButton && <AttributeListAddButton onPress={() => navigation.navigate(Routes.Tags)} />}
                <FlatList
                    numColumns={numColumns}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={contentContainerStyle}
                    horizontal={horizontal}
                    data={sortItems(items)}
                    renderItem={({ item }) => <Tag style={tagStyle} size={tagSize} item={item} />}
                    keyExtractor={item => item.text} />
            </ScrollView>
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
        flexDirection: 'row', 
        marginRight: -20
    }
})

