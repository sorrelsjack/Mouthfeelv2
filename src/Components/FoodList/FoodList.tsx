import React, { Component, useEffect } from 'react';
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
import { FoodSummary } from '../../Redux/Models';

interface FoodListProps {
    items: FoodSummary[],
}

const FoodList = (props: FoodListProps) => {
    const { items } = props;

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const Cell = (props: { item: FoodSummary }) => {
        const { item } = props;
        const mostVoted = item.topThree;

        const handleItemPressed = () => {
            dispatch(SetSelectedFoodAction(item));
            navigation.navigate(Routes.FoodDetails);
        }

        return (
            <TouchableOpacity key={item.id} onPress={handleItemPressed}>
                <View style={styles.cellWrapper}>
                    <Image style={[styles.image, !item.images[0]?.image ? { opacity: .3 } : {}]} source={item.images[0]?.image ? { uri: `data:image/png;base64,${item.images[0]?.image}` } : require('../../Assets/plate.png')} />
                    <View style={styles.cellTextContainer}>
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                            <Text style={styles.cellTitle}>
                                {FormatAsTitleCase(item.name)}
                            </Text>
                            <StandardIconsDisplay foodSummary={item} />
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
                                }) : <Text>None yet!</Text>}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.wrapper}>
            <FlatList
                data={items}
                renderItem={({ item }) => <Cell item={item} />}
                keyExtractor={item => item.id.toString()} />
        </View>
    )
}

export default FoodList;

const styles = StyleSheet.create({
    wrapper: {
        width: '100%', 
        height: '100%'
    },
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