import React, { Component } from 'react';
import { useDispatch } from 'react-redux';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import { ThemeProp } from '../../Models';
import { FoodDetails } from '../../Redux/Models/FoodDetails';
import { FormatAsTitleCase, Routes } from '../../Common'
import { SetSelectedFoodAction } from '../../Redux/Actions';
import { useNavigation } from '@react-navigation/native';
import { LoadingSpinner, Tag } from '..';

interface FoodListProps {
    items: FoodDetails[],
}

// TODO: Text gets cut off here. However, if you remove the 20 padding, it stops being cut off
// TODO: For each food, have "sub-foods" -- e.g., you can rate a specific recipe. The "parent food" will serve as a general page for that food
const FoodList = (props: FoodListProps) => {
    const { items } = props;

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const Cell = (props: { item: FoodDetails }) => {
        const { item } = props;
        const mostVoted = item.flavors.concat(item.textures).concat(item.miscellaneous).sort((a, b) => a.votes - b.votes).slice(0, 3);

        const handleItemPressed = () => {
            dispatch(SetSelectedFoodAction(item.id));
            navigation.navigate(Routes.FoodDetails);
        }

        return (
            <TouchableOpacity onPress={handleItemPressed}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: 10, padding: 20 }}>
                    <Image style={styles.image} source={{ uri: item.imageUrl }} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
                            {FormatAsTitleCase(item.name)}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            {`Attributes:`}
                        </Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {mostVoted.map(v => {
                            return (
                                <Text style={{ fontSize: 16, marginRight: 10 }}>
                                    {`${v.name} `}
                                </Text>
                            )
                        })}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <FlatList
                data={items}
                renderItem={({ item }) => <Cell item={item} />}
                keyExtractor={item => item.name} />
        </View>
    )
}

export default FoodList;

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        height: 75,
        width: 75,
        marginRight: 20
    }
})