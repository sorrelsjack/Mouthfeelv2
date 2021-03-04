import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Routes } from '../../Common';
import { FoodList, SearchInterface } from '../../Components';
import { HomeListItem } from './Components';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GlobalFontName } from '../../Config';

interface HomeScreenProps {
    theme: ThemeProp,
    navigation: any // TODO: Fix
}

const HomeScreen = (props: HomeScreenProps) => {
    const { theme } = props;

    const styles = createStyles(theme);

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
            <SearchInterface />
            <FlatList
                data={items}
                ItemSeparatorComponent={renderItemSeparator}
                renderItem={({ item }) => <HomeListItem item={item} onPress={() => props.navigation.navigate(item.route || Routes.FoodDetails)} />}
                keyExtractor={item => item.text} />
        </View>
    )
}

export default withTheme(HomeScreen);

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        height: '100%'
    },
    itemSeparator: {
        height: 1,
        backgroundColor: theme.homeScreenList.itemSeparator.backgroundColor
    }
})