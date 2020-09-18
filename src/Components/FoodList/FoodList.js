import React, { Component } from 'react';
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';

// TODO: Finish this. Will be used on Liked, Recommended, and To Try. Should include basic summary info. Picture, name, most rated attributes
// TODO: Maybe do a cool color picking thing where we use the majority color of the food for the theme color B)
const FoodList = (props) => {
    const test = [{ name: 'Testing Food', tags: ['tag', 'too', 'welp', 'salty'], url: 'https://publicdomainvectors.org/photos/1514958680.png' }, { name: 'Testing Food', tags: ['tag', 'too', 'welp', 'salty'], url: 'https://static8.depositphotos.com/1409882/1021/v/450/depositphotos_10213598-stock-illustration-broccoli.jpg' }]

    const Cell = props => {
        return (
            <TouchableOpacity>
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
                keyExtractor={test => test} />
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