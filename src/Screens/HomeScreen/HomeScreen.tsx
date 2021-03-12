import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { View, FlatList, StyleSheet, Platform } from 'react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Routes } from '../../Common';
import { FoodList, SearchInterface, LoadingSpinner } from '../../Components';
import { HomeListItem } from './Components';
import { withTheme } from 'react-native-elements';
import { ThemeProp } from '../../Models';
import { GlobalFontName } from '../../Config';
import { GetLikedFoodsAction, GetDislikedFoodsAction } from '../../Redux/Actions';
import { MouthfeelState, FoodDetails } from '../../Redux/Models';

interface HomeScreenProps {
    theme: ThemeProp,
    searchResults: {
        loading: boolean,
        data: FoodDetails[]
    },
    navigation: any // TODO: Fix
}

// TODO: Add some logic for there to be an empty view if the user does a search that yields 0 results
const HomeScreen = (props: HomeScreenProps) => {
    const { theme, searchResults } = props;

    const [searchIsActive, setSearchIsActive] = useState(false);

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
            <SearchInterface onSearchStateChange={setSearchIsActive} />
            { searchIsActive ? <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                {searchResults.loading ? <LoadingSpinner /> : < FoodList items={searchResults.data ? searchResults.data : []} />}
            </View> : <FlatList
                data={items}
                ItemSeparatorComponent={renderItemSeparator}
                renderItem={({ item }) => <HomeListItem item={item} onPress={() => props.navigation.navigate(item.route || Routes.FoodDetails)} />}
                keyExtractor={item => item.text} />}
        </View>
    )
}

export default withTheme(connect((state: MouthfeelState) => {
    return {
        searchResults: state.foods.searchResults
    }
})(HomeScreen));

const createStyles = (theme: ThemeProp) => StyleSheet.create({
    wrapper: {
        height: '100%'
    },
    itemSeparator: {
        height: 1,
        backgroundColor: theme.homeScreenList.itemSeparator.backgroundColor
    }
})