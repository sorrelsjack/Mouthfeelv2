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
import { SetSelectedFoodAction, AddOrRemoveFoodToTryAction } from '../../Redux/Actions';
import { useNavigation } from '@react-navigation/native';
import { LoadingSpinner, Tag } from '..';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StandardIconsDisplay } from '..';

interface FoodListProps {
    items: FoodDetails[],
}

// TODO: For each food, have "sub-foods" -- e.g., you can rate a specific recipe. The "parent food" will serve as a general page for that food
const FoodList = (props: FoodListProps) => {
    const { items } = props;

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const Cell = (props: { item: FoodDetails }) => {
        const { item } = props;
        const mostVoted = item.flavors.concat(item.textures).concat(item.miscellaneous).sort((a, b) => (a.votes ?? 0) - (b.votes ?? 0)).slice(0, 3);

        const handleItemPressed = () => {
            dispatch(SetSelectedFoodAction(item));
            navigation.navigate(Routes.FoodDetails);
        }

        return (
            <TouchableOpacity key={item.id} onPress={handleItemPressed}>
                <View style={styles.cellWrapper}>
                    <Image style={styles.image} source={{ uri: item.imageUrl }} />
                    <View style={styles.cellTextContainer}>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <Text style={styles.cellTitle}>
                                {FormatAsTitleCase(item.name)}
                            </Text>
                            <StandardIconsDisplay foodDetails={item} />
                        </View>
                        <Text style={{ fontSize: 16 }}>
                            {`Attributes:`}
                        </Text>
                        <View style={styles.cellAttributeList}>
                            {mostVoted.length
                                ? mostVoted.map(v => {
                                    return (
                                        <Text key={`${v.id}-${v.description}`} style={styles.cellAttribute}>
                                            {`${v.name} `}
                                        </Text>
                                    )
                                }) : <Text>N/A</Text>}
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
                keyExtractor={item => item.id.toString()} />
        </View>
    )
}

export default FoodList;

const styles = StyleSheet.create({
    cellWrapper: {
        backgroundColor: 'white',
        flexDirection: 'row',
        marginBottom: 10,
        padding: 20,
    },
    cellTextContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    cellTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    cellAttributeList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    cellAttribute: {
        fontSize: 16,
        marginRight: 10
    },
    image: {
        resizeMode: 'contain',
        height: 75,
        width: 75,
        marginRight: 20
    }
})