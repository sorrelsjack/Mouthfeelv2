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
import { VotableAttribute } from '../../Redux/Models';
import { AttributeType } from '../../Models';

interface AttributeListProps {
    title?: string,
    attributeType: AttributeType,
    includeAddButton?: boolean,
    numColumns?: number;
    horizontal?: boolean,
    contentContainerStyle?: object,
    tagSize?: 'small' | 'regular',
    tagStyle?: object,
    items: VotableAttribute[],
}

const AttributeList = (props: AttributeListProps) => {
    const {
        title,
        attributeType,
        includeAddButton = true,
        numColumns,
        horizontal = true,
        contentContainerStyle = {},
        tagSize = 'regular',
        tagStyle = {},
        items,
    } = props;

    const navigation = useNavigation();

    const sortItems = (items: VotableAttribute[]) =>
        items.sort((a, b) => ((a.votes ?? 0) < (b.votes ?? 0)) ? 1 : -1);

    return (
        <View style={styles.wrapper}>
            {title && <Text style={styles.text}>{title}</Text>}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.list}>
                {includeAddButton && <AttributeListAddButton onPress={() => navigation.navigate(Routes.Tags, { attributeType })} />}
                <FlatList
                    numColumns={numColumns}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={contentContainerStyle}
                    horizontal={horizontal}
                    data={sortItems(items)}
                    renderItem={({ item }) => <Tag style={tagStyle} size={tagSize} item={item} />}
                    keyExtractor={item => item.id.toString()} />
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

