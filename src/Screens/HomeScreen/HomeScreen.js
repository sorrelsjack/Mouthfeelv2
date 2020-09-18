import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Colors, Routes } from './../../Common';
import { FoodList } from '../../Components';
import { HomeListItem } from './Components';

const HomeScreen = (props) => {
    const [searchQuery, setSearchQuery] = useState('');

    const updateSearch = search => setSearchQuery(search);


    const renderItemSeparator = () => {
        return (
            <View style={styles.itemSeparator} />
        )
    }

        const items = [
            { icon: 'heart', text: 'Liked' },
            { icon: 'heart-broken', text: 'Disliked' },
            { icon: 'location-arrow', text: 'Recommended' },
            { icon: 'list-ul', text: 'To Try' },
            { icon: 'plus-circle', text: 'Submit New Food', route: Routes.SubmitFood }
        ]

        return (
            <View style={styles.wrapper}>
                <View style={{ padding: 15 }}>
                    <SearchBar
                        platform={Platform.OS}
                        placeholder={'Food name, ingredient, or attribute'}
                        onChangeText={updateSearch}
                        value={searchQuery} />
                </View>
                <FlatList
                    data={items}
                    ItemSeparatorComponent={renderItemSeparator}
                    renderItem={({item}) => <HomeListItem item={item} onPress={() => props.navigation.navigate(item.route || Routes.FoodDetails)} />}
                    keyExtractor={item => item} />
            </View>
        )
}

export default HomeScreen;

const styles = StyleSheet.create({
    wrapper: {
        height: '100%'
    },
    itemSeparator: {
        height: 1,
        backgroundColor: Colors.homeScreenList.itemSeparator.backgroundColor
    }
})