import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import { ThemeProp } from '../../Models';

interface FoodListProps {

}

interface FoodListCellProps {
    item: {
        name: string,
        tags: string[],
        url: string
    }
}

// TODO: Finish this. Will be used on Liked, Disliked, Recommended, and To Try. Should include basic summary info. Picture, name, most rated attributes
// TODO: For each food, have "sub-foods" -- e.g., you can rate a specific recipe. The "parent food" will serve as a general page for that food
const FoodList = (props: FoodListProps) => {
    const test = [{ name: 'Testing Food', tags: ['tag', 'too', 'welp', 'salty'], url: 'https://publicdomainvectors.org/photos/1514958680.png' }, { name: 'Testing Food', tags: ['tag', 'too', 'welp', 'salty'], url: 'https://static8.depositphotos.com/1409882/1021/v/450/depositphotos_10213598-stock-illustration-broccoli.jpg' }]

    const Cell = (props: FoodListCellProps) => {
        return (
            <TouchableOpacity onPress={() => { console.log('Set selected food here. Then, navigate to Food Details screen, sending the id of the food with it') }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: 10, padding: 20 }}>
                    <Image style={styles.image} source={{ uri: props.item.url }} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {props.item.name}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                            {`Attributes: ${props.item.tags.join(', ')}`}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View>
            <FlatList
                data={test}
                renderItem={({ item }) => <Cell item={item} />}
                keyExtractor={test => test.name} />
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