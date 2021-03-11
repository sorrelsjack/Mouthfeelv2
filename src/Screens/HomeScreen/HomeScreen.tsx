import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Routes } from '../../Common';
import { FoodList, SearchInterface } from '../../Components';
import { HomeListItem } from './Components';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GlobalFontName } from '../../Config';
import { GetLikedFoodsAction, GetDislikedFoodsAction } from '../../Redux/Actions';

interface HomeScreenProps {
    theme: ThemeProp,
    navigation: any // TODO: Fix
}

// TODO: UI for search results... maybe the results completely replace the home screen items?
const HomeScreen = (props: HomeScreenProps) => {
    const { theme } = props;

    const styles = createStyles(theme);

    const renderItemSeparator = () => {
        return (
            <View style={styles.itemSeparator} />
        )
    }

    const items = [
        { icon: 'heart', text: 'Liked', route: Routes.Liked },
        { icon: 'heart-broken', text: 'Disliked', route: Routes.Disliked },
        { icon: 'location-arrow', text: 'Recommended', route: Routes.Recommended },
        { icon: 'list-ul', text: 'To Try', route: Routes.ToTry },
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