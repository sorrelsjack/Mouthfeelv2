import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Routes } from './../../Common';
import { FoodList } from '../../Components';
import { HomeListItem } from './Components';
import { withTheme } from 'react-native-elements';

const HomeScreen = (props) => {
    const { theme } = props;
    const [searchQuery, setSearchQuery] = useState('');

    const styles = createStyles(theme);

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
                    keyExtractor={item => item.text} />
            </View>
        )
}

export default withTheme(HomeScreen);

const createStyles = (theme) => StyleSheet.create({
    wrapper: {
        height: '100%'
    },
    itemSeparator: {
        height: 1,
        backgroundColor: theme.homeScreenList.itemSeparator.backgroundColor
    }
})