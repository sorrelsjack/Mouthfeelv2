import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ScrollView,
    StyleProp,
    ViewStyle
} from 'react-native';
import { CustomText, Tag } from '..';
import { AttributeListAddButton } from '..';
import { Routes } from '../../Common';
import { useNavigation } from '@react-navigation/native';
import { VotableAttribute } from '../../Redux/Models';
import { AttributeType } from '../../Models';

type SortType = 'alphabetically' | 'byVotes' | 'custom';

interface AttributeListProps {
    title?: string,
    attributeType: AttributeType,
    includeAddButton?: boolean,
    numColumns?: number;
    horizontal?: boolean,
    contentContainerStyle?: object,
    tagSize?: 'small' | 'regular',
    tagStyle?: object,
    listStyle?: object,
    wrapperStyle?: object,
    columnWrapperStyle?: StyleProp<ViewStyle>,
    sortBy?: SortType,
    customSort?: (a: any, b: any) => any,
    onChange?: (ids: number[]) => any,
    items: VotableAttribute[],
    disabledItems?: number[]
}

const AttributeList = (props: AttributeListProps) => {
    const {
        title,
        attributeType,
        includeAddButton = true,
        numColumns = 0,
        horizontal = true,
        contentContainerStyle = {},
        tagSize = 'regular',
        tagStyle = {},
        listStyle = {},
        wrapperStyle = {},
        columnWrapperStyle = {},
        sortBy = 'byVotes',
        customSort,
        onChange,
        items,
        disabledItems
    } = props;

    const navigation = useNavigation();

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const sortItems = (items: VotableAttribute[]) => {
        if (sortBy === 'custom') return items.sort(customSort);
        return sortBy === 'byVotes' 
            ? items.sort((a, b) => {
                var diff = (a.votes ?? 0) - (b.votes ?? 0);
                if (diff === 0) return (a.name > b.name) ? 1 : -1;
                return (a.votes ?? 0) < (b.votes ?? 0) ? 1 : -1
            })
            : items.sort((a, b) => ((a.name > b.name) ? 1 : -1))
    }

    const handleTagPressed = (attributeId: number) => {
        const existing = selectedItems;
        let selected: number[] = [];

        if (existing.find(e => e === attributeId))
            selected = existing.filter(e => e !== attributeId)
        else
            selected = existing.concat(selected.concat(attributeId));

        setSelectedItems(selected);
        if (onChange) onChange(selected);
    }

    const extraProps = {
        [numColumns > 1 ? 'columnWrapperStyle' : '']: columnWrapperStyle
    }

    return (
        <View style={[styles.wrapper, wrapperStyle]}>
            {title && <CustomText style={styles.text}>{title}</CustomText>}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.list, listStyle]}>
                {includeAddButton && <AttributeListAddButton onPress={() => navigation.navigate(Routes.Tags, { attributeType, preselectedAttributes: items.filter(i => i.votes ?? 0 > 0).map(i => i.id) })} />}
                <FlatList
                    {...extraProps}
                    numColumns={numColumns}
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={contentContainerStyle}
                    horizontal={horizontal}
                    data={sortItems(items)}
                    renderItem={({ item }) => <Tag style={tagStyle} disabled={disabledItems?.some(i => i === item.id)} size={tagSize} item={item} attributeType={attributeType} onPress={handleTagPressed} />}
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

